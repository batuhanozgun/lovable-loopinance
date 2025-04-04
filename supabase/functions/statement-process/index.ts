
// Bu dosya periodically future statement'ları check edip güncelleyecek

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
    
    console.log('statement-process: Starting statement processing');
    
    // Request body'yi incele
    const requestBody = await req.json();
    const accountId = requestBody.accountId; // Spesifik bir hesap için işlem yapılıyor mu?
    
    // 1. Future statüsündeki ekstreleri kontrol et ve güncelle
    try {
      const { data: futureResult, error: futureError } = await supabaseClient.rpc('update_future_statements');
      
      if (futureError) {
        console.error(`statement-process: Error updating future statements: ${futureError.message}`);
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Error updating future statements', 
            error: futureError.message 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log(`statement-process: Future statements updated: ${JSON.stringify(futureResult)}`);
      
      // 2. Süresi dolmuş ekstreleri kapat ve yeni ekstreler oluştur
      let expiredResult;
      let expiredError;
      
      if (accountId) {
        // Belirli bir hesap için süresi dolmuş ekstreleri kapat
        console.log(`statement-process: Processing specific account ID: ${accountId}`);
        // TODO: Bu fonksiyon parametrik bir şekilde güncellenmeli
        ({ data: expiredResult, error: expiredError } = await supabaseClient.rpc('close_expired_statements'));
      } else {
        // Tüm hesaplar için süresi dolmuş ekstreleri kapat
        ({ data: expiredResult, error: expiredError } = await supabaseClient.rpc('close_expired_statements'));
      }
      
      if (expiredError) {
        console.error(`statement-process: Error closing expired statements: ${expiredError.message}`);
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Future statements updated but error closing expired statements', 
            future: futureResult,
            expired: { error: expiredError.message }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log(`statement-process: Expired statements closed: ${JSON.stringify(expiredResult)}`);
      
      // 3. Hesaplar için eksik gelecek ekstreler varsa işlem sonucuna ekle
      let accountsNeedingFuture = [];
      
      // Future statements güncellenirken hesaplar için future statement ihtiyacı kontrol edildi mi?
      if (futureResult && futureResult.accounts_needing_statements) {
        accountsNeedingFuture = accountsNeedingFuture.concat(futureResult.accounts_needing_statements);
      }
      
      // Kapatılan statementların hesapları için future statement ihtiyacı var mı?
      if (expiredResult && expiredResult.accounts_needing_future) {
        accountsNeedingFuture = accountsNeedingFuture.concat(expiredResult.accounts_needing_future);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Statement processing completed', 
          future: futureResult,
          expired: expiredResult,
          accounts_needing_future: accountsNeedingFuture,
          timestamp: new Date().toISOString(),
          accountId: accountId || null // İşlem yapılan hesap ID'si varsa dön
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (processError) {
      console.error(`statement-process: Unexpected error in processing: ${processError.message}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Unexpected error in processing', 
          error: processError.message,
          timestamp: new Date().toISOString()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error(`statement-process: Unexpected error: ${error.message}`);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Unexpected error', 
        error: error.message,
        timestamp: new Date().toISOString() 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
