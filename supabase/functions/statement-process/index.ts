
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

// CORS başlıkları
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Supabase istemcisini oluştur
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const processStatements = async () => {
  console.log('Ekstre işleme görevi başlatıldı');
  
  try {
    // 1. Dönem sonu gelmiş ekstreleri kapat
    console.log('Süresi dolmuş ekstreleri kapatma');
    
    // Bitiş tarihi geçmiş açık ekstreleri bul
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatında bugünün tarihi
    
    const { data: expiredStatements, error: findError } = await supabaseClient
      .from('account_statements')
      .select('*, cash_accounts(*)')
      .eq('status', 'open')
      .lt('end_date', today);
    
    if (findError) {
      throw new Error(`Süresi geçmiş ekstreleri bulurken hata: ${findError.message}`);
    }
    
    console.log(`${expiredStatements?.length || 0} adet süresi dolmuş ekstre bulundu`);
    
    // Her bir süresi geçmiş ekstre için işlem yap
    if (expiredStatements && expiredStatements.length > 0) {
      for (const statement of expiredStatements) {
        console.log(`Ekstre kapatılıyor: ${statement.id}, Hesap: ${statement.account_id}`);
        
        // Ekstre bakiyesini güncelle
        const { data: transactions, error: txError } = await supabaseClient
          .from('account_transactions')
          .select('amount, transaction_type')
          .eq('statement_id', statement.id);
        
        if (txError) {
          console.error(`İşlemleri alırken hata: ${txError.message}`);
          continue;
        }
        
        // Gelir ve gider toplamlarını hesapla
        let totalIncome = 0;
        let totalExpenses = 0;
        
        transactions?.forEach(tx => {
          if (tx.transaction_type === 'income') {
            totalIncome += Number(tx.amount);
          } else if (tx.transaction_type === 'expense') {
            totalExpenses += Number(tx.amount);
          }
        });
        
        // Bitiş bakiyesini hesapla
        const endBalance = Number(statement.start_balance) + totalIncome - totalExpenses;
        
        // Ekstre bakiyelerini güncelle
        const { error: updateError } = await supabaseClient
          .from('account_statements')
          .update({
            income: totalIncome,
            expenses: totalExpenses,
            end_balance: endBalance,
            status: 'closed',
            updated_at: new Date().toISOString()
          })
          .eq('id', statement.id);
        
        if (updateError) {
          console.error(`Ekstre güncellenirken hata: ${updateError.message}`);
          continue;
        }
        
        console.log(`Ekstre kapatıldı: ${statement.id}, Bitiş bakiyesi: ${endBalance}`);
        
        // Yeni dönem için ekstre oluştur
        if (statement.cash_accounts) {
          await createNextStatement(statement.cash_accounts, endBalance);
        }
      }
    }
    
    // 2. Ekstre kontrolü ve gereken hesaplar için yeni ekstre oluşturma
    console.log('Tüm hesaplar için ekstre kontrol ediliyor');
    
    const { data: accounts, error: accountsError } = await supabaseClient
      .from('cash_accounts')
      .select('*')
      .eq('is_active', true);
    
    if (accountsError) {
      throw new Error(`Hesapları getirirken hata: ${accountsError.message}`);
    }
    
    console.log(`${accounts?.length || 0} adet aktif hesap bulundu`);
    
    if (accounts && accounts.length > 0) {
      for (const account of accounts) {
        // Hesabın aktif dönemi için ekstre var mı kontrol et
        await checkAndCreateStatementIfNeeded(account);
      }
    }
    
    return { success: true, message: 'Ekstre işlemleri tamamlandı' };
  } catch (error) {
    console.error('Ekstre işleme görevinde hata:', error);
    return { success: false, error: error.message };
  }
};

// Dönem hesaplama yardımcı fonksiyonları
const calculateNextPeriod = (account, currentDate = new Date()) => {
  // Bu fonksiyon, bir sonraki dönemin başlangıç ve bitiş tarihlerini hesaplar
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Mevcut ayın son günü
  const currentMonthEndDate = new Date(currentYear, currentMonth + 1, 0);
  
  // Bir sonraki ay
  const nextMonth = new Date(currentYear, currentMonth + 1, 1);
  const nextMonthEndDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  
  // Dönem bitiş tarihi hesaplama
  let closingDate;
  
  switch (account.closing_day_type) {
    case 'LAST_DAY':
      closingDate = currentMonthEndDate;
      break;
      
    case 'LAST_BUSINESS_DAY':
      closingDate = getLastBusinessDay(currentMonthEndDate);
      break;
      
    case 'SPECIFIC_DAY':
      if (!account.closing_day_value) {
        throw new Error('Belirli bir gün seçildi ancak değer belirtilmedi');
      }
      
      closingDate = getSpecificDayDate(currentYear, currentMonth, account.closing_day_value);
      break;
      
    default:
      closingDate = currentMonthEndDate;
      break;
  }
  
  // Eğer mevcut tarih dönem bitiş tarihini geçmişse, bir sonraki ayın dönem hesaplamalarını yap
  if (currentDate > closingDate) {
    return calculateNextPeriod(account, nextMonth);
  }
  
  // Dönem başlangıç tarihi, bir önceki dönemin bitiş tarihinin ertesi günü
  // veya ilk dönem için bugün
  const previousPeriodEndDate = calculatePreviousPeriodEndDate(account, currentDate);
  const startDate = new Date(previousPeriodEndDate);
  startDate.setDate(previousPeriodEndDate.getDate() + 1);
  
  return {
    startDate,
    endDate: closingDate
  };
};

const calculatePreviousPeriodEndDate = (account, currentDate) => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Bir önceki ay
  const previousMonth = new Date(currentYear, currentMonth - 1, 1);
  const previousMonthYear = previousMonth.getFullYear();
  const previousMonthMonth = previousMonth.getMonth();
  
  // Önceki ayın son günü
  const previousMonthEndDate = new Date(previousMonthYear, previousMonthMonth + 1, 0);
  
  // Dönem bitiş tarihi hesaplama
  let closingDate;
  
  switch (account.closing_day_type) {
    case 'LAST_DAY':
      closingDate = previousMonthEndDate;
      break;
      
    case 'LAST_BUSINESS_DAY':
      closingDate = getLastBusinessDay(previousMonthEndDate);
      break;
      
    case 'SPECIFIC_DAY':
      if (!account.closing_day_value) {
        throw new Error('Belirli bir gün seçildi ancak değer belirtilmedi');
      }
      
      closingDate = getSpecificDayDate(previousMonthYear, previousMonthMonth, account.closing_day_value);
      break;
      
    default:
      closingDate = previousMonthEndDate;
      break;
  }
  
  return closingDate;
};

const getSpecificDayDate = (year, month, day) => {
  // Ayın gün sayısını hesapla
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const specificDay = Math.min(day, daysInMonth);
  return new Date(year, month, specificDay);
};

const getLastBusinessDay = (lastDayOfMonth) => {
  let lastBusinessDay = new Date(lastDayOfMonth);
  
  // Eğer son gün hafta sonuysa (6: Cumartesi, 0: Pazar), önceki iş gününü bul
  while (lastBusinessDay.getDay() === 0 || lastBusinessDay.getDay() === 6) {
    lastBusinessDay.setDate(lastBusinessDay.getDate() - 1);
  }
  
  return lastBusinessDay;
};

const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const createNextStatement = async (account, previousEndBalance) => {
  try {
    // Bir sonraki dönemi hesapla
    const nextPeriod = calculateNextPeriod(account);
    
    // Yeni dönem için ekstre oluştur
    const { data: newStatement, error } = await supabaseClient
      .from('account_statements')
      .insert({
        account_id: account.id,
        start_date: formatDate(nextPeriod.startDate),
        end_date: formatDate(nextPeriod.endDate),
        start_balance: previousEndBalance,
        end_balance: previousEndBalance,
        income: 0,
        expenses: 0,
        status: 'open'
      })
      .select()
      .single();
    
    if (error) {
      console.error(`Yeni ekstre oluşturulurken hata: ${error.message}`);
      return null;
    }
    
    console.log(`Yeni ekstre oluşturuldu: ${newStatement.id}, Dönem: ${newStatement.start_date} - ${newStatement.end_date}`);
    return newStatement;
  } catch (error) {
    console.error(`Yeni ekstre oluşturulurken hata: ${error.message}`);
    return null;
  }
};

const checkAndCreateStatementIfNeeded = async (account) => {
  try {
    // Mevcut tarihi al
    const now = new Date();
    
    // Hesap için mevcut dönemi hesapla
    const currentPeriod = calculateNextPeriod(account, now);
    
    // Mevcut dönem için ekstre var mı kontrol et
    const { data: existingStatements, error: queryError } = await supabaseClient
      .from('account_statements')
      .select('*')
      .eq('account_id', account.id)
      .gte('start_date', formatDate(currentPeriod.startDate))
      .lte('end_date', formatDate(currentPeriod.endDate))
      .order('created_at', { ascending: false });
    
    if (queryError) {
      console.error(`Mevcut ekstreleri kontrol ederken hata: ${queryError.message}`);
      return false;
    }
    
    // Eğer mevcut dönem için ekstre yoksa, yeni ekstre oluştur
    if (!existingStatements || existingStatements.length === 0) {
      // En son ekstre var mı diye kontrol et
      const { data: lastStatement, error: lastStatementError } = await supabaseClient
        .from('account_statements')
        .select('*')
        .eq('account_id', account.id)
        .order('end_date', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (lastStatementError) {
        console.error(`Son ekstre kontrolünde hata: ${lastStatementError.message}`);
        return false;
      }
      
      // Başlangıç bakiyesini belirle
      let startBalance = account.initial_balance;
      if (lastStatement) {
        startBalance = lastStatement.end_balance;
      }
      
      // Ekstre oluştur
      const newStatement = await createNextStatement(account, startBalance);
      return newStatement !== null;
    }
    
    console.log(`Hesap ${account.id} için mevcut dönemde ekstre bulundu: ${existingStatements[0].id}`);
    return true;
  } catch (error) {
    console.error(`Hesap ${account.id} için ekstre kontrolü sırasında hata: ${error.message}`);
    return false;
  }
};

serve(async (req) => {
  // CORS ön kontrol isteği
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  if (req.method === 'POST') {
    try {
      const result = await processStatements();
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: result.success ? 200 : 500
      });
    } catch (error) {
      console.error('Edge function hatası:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }
  } else {
    return new Response(JSON.stringify({ error: 'POST metodu bekleniyor' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405
    });
  }
});
