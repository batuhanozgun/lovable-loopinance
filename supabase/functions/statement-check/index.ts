
// Mevcut supabase/functions/statement-check/index.ts dosyasının içeriğini güncelleyeceğim
// Bu edge function Future statüsündeki ekstreleri güncelleme işlemini de ekleyecek

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORS için OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Supabase client oluştur
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { 
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
      }
    );
    
    // Request body'den accountId'yi al
    const { accountId } = await req.json();
    
    // Log
    console.log(`statement-check: Checking statements for account: ${accountId || 'all accounts'}`);
    
    let result;
    
    // Eğer accountId varsa, o hesap için ekstre kontrol et
    if (accountId) {
      // Hesap bilgisini getir
      const { data: account, error: accountError } = await supabaseClient
        .from('cash_accounts')
        .select('*')
        .eq('id', accountId)
        .single();
      
      if (accountError) {
        console.error(`statement-check: Error fetching account: ${accountError.message}`);
        return new Response(
          JSON.stringify({ success: false, message: 'Account not found', error: accountError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Hesap için ekstre kontrolü yap
      const { data, error } = await supabaseClient.rpc('check_account_statement', { p_account_id: accountId });
      
      if (error) {
        console.error(`statement-check: Error checking statement: ${error.message}`);
        return new Response(
          JSON.stringify({ success: false, message: 'Error checking statement', error: error.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      result = data;
      console.log(`statement-check: Statement check completed for account ${accountId}`);
      
      // Future statement kontrolü ve ihtiyaç durumunu kontrol et
      const { data: futureStatus, error: futureStatusError } = await supabaseClient.rpc(
        'check_account_future_statements', 
        { p_account_id: accountId }
      );
      
      if (futureStatusError) {
        console.error(`statement-check: Error checking future statements status: ${futureStatusError.message}`);
      } else {
        console.log(`statement-check: Future statements status: ${JSON.stringify(futureStatus)}`);
        // Future statement ihtiyacını sonuca ekle
        result = {
          ...result,
          futureStatus
        };
      }
    } else {
      // Tüm hesaplar için ekstre kontrolü yap
      const { data, error } = await supabaseClient.rpc('check_accounts_statements');
      
      if (error) {
        console.error(`statement-check: Error checking all statements: ${error.message}`);
        return new Response(
          JSON.stringify({ success: false, message: 'Error checking all statements', error: error.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      result = data;
      console.log(`statement-check: Statement check completed for all accounts`);
    }
    
    // Future statüsündeki ekstreleri kontrol et ve güncelle
    try {
      const { data: futureResult, error: futureError } = await supabaseClient.rpc('update_future_statements');
      
      if (futureError) {
        console.error(`statement-check: Error updating future statements: ${futureError.message}`);
      } else {
        console.log(`statement-check: Future statements updated: ${JSON.stringify(futureResult)}`);
        // Future statement güncellemelerini sonuca ekle
        result = {
          ...result,
          futureUpdated: futureResult.updated,
          accountsNeedingFutureStatements: futureResult.accounts_needing_statements
        };
      }
    } catch (futureCheckError) {
      console.error(`statement-check: Unexpected error updating future statements: ${futureCheckError.message}`);
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Statement check completed', result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`statement-check: Unexpected error: ${error.message}`);
    return new Response(
      JSON.stringify({ success: false, message: 'Unexpected error', error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
