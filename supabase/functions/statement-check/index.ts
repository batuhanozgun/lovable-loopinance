
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

/**
 * Belirli bir hesap için ekstre durumunu kontrol eder
 */
const checkAccountStatements = async (accountId: string) => {
  console.log(`${accountId} ID'li hesap için ekstre kontrolü başlatıldı`);
  
  try {
    // Hesap bilgilerini getir
    const { data: account, error: accountError } = await supabaseClient
      .from('cash_accounts')
      .select('*')
      .eq('id', accountId)
      .eq('is_active', true)
      .single();
    
    if (accountError) {
      throw new Error(`Hesap bilgileri alınamadı: ${accountError.message}`);
    }
    
    if (!account) {
      return {
        success: false,
        message: 'Aktif hesap bulunamadı'
      };
    }
    
    // Ekstre işlemi için statement-process edge function'ı çağır
    const response = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/statement-process`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          source: 'manual-check',
          accountId: account.id
        })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Edge function hatası: ${JSON.stringify(errorData)}`);
    }
    
    const result = await response.json();
    
    return {
      success: true,
      message: `${account.name} hesabı için ekstre kontrolü tamamlandı`,
      result
    };
  } catch (error) {
    console.error(`Hesap ekstre kontrolünde hata: ${error.message}`);
    return {
      success: false,
      message: `Ekstre kontrolünde hata: ${error.message}`
    };
  }
};

serve(async (req) => {
  // CORS ön kontrol isteği
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  if (req.method === 'POST') {
    try {
      // İstek gövdesini oku
      const reqJson = await req.json();
      const { accountId } = reqJson;
      
      if (!accountId) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Hesap ID (accountId) parametresi gerekli' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        });
      }
      
      const result = await checkAccountStatements(accountId);
      
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: result.success ? 200 : 500
      });
    } catch (error) {
      console.error('Edge function hatası:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }
  } else {
    return new Response(JSON.stringify({ 
      error: 'POST metodu bekleniyor' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405
    });
  }
});
