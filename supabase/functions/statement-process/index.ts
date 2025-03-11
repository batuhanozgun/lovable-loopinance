
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
      const { data: expiredResult, error: expiredError } = await supabaseClient.rpc('close_expired_statements');
      
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
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Statement processing completed', 
          future: futureResult,
          expired: expiredResult
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (processError) {
      console.error(`statement-process: Unexpected error in processing: ${processError.message}`);
      return new Response(
        JSON.stringify({ success: false, message: 'Unexpected error in processing', error: processError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error(`statement-process: Unexpected error: ${error.message}`);
    return new Response(
      JSON.stringify({ success: false, message: 'Unexpected error', error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
