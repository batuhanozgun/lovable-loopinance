
// Statement processing edge function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { 
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
      }
    );
    
    console.log('statement-process: Starting statement processing');
    
    const requestBody = await req.json();
    const accountId = requestBody.accountId;
    const source = requestBody.source || 'manual'; // 'manual', 'cron', 'client'
    
    console.log(`statement-process: Processing account ${accountId || 'all'} from source ${source}`);
    
    // 1. Update future statements to open if their start date has arrived
    try {
      const { data: futureResult, error: futureError } = await supabaseClient.rpc(
        'update_future_statements',
        accountId ? { p_account_id: accountId } : {}
      );
      
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
      
      console.log(`statement-process: Future statements updated:`, futureResult);
      
      // 2. Close expired statements and create new ones
      const { data: expiredResult, error: expiredError } = await supabaseClient.rpc(
        'close_expired_statements',
        accountId ? { p_account_id: accountId } : {}
      );
      
      if (expiredError) {
        console.error(`statement-process: Error closing expired statements: ${expiredError.message}`);
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Future statements updated, but failed to close expired statements',
            future: futureResult,
            expired: { error: expiredError.message }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log(`statement-process: Expired statements processed:`, expiredResult);
      
      // 3. Determine accounts needing future statements
      const accountsNeedingFuture = [];
      
      if (futureResult?.accounts_needing_statements) {
        accountsNeedingFuture.push(...futureResult.accounts_needing_statements);
      }
      
      if (expiredResult?.accounts_needing_future) {
        accountsNeedingFuture.push(...expiredResult.accounts_needing_future);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Statement processing completed successfully', 
          future: futureResult,
          expired: expiredResult,
          accounts_needing_future: accountsNeedingFuture,
          source,
          timestamp: new Date().toISOString(),
          accountId: accountId || null
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
