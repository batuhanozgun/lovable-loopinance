
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

serve(async (req) => {
  // CORS ön kontrol isteği
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log('cron-statements: Starting cron job execution at', new Date().toISOString());
    
    // statement-process edge function'ı çağır
    const response = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/statement-process`, 
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source: 'cron-job' })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`cron-statements: Edge function failed with status ${response.status}: ${JSON.stringify(errorData)}`);
      throw new Error(`Edge function failed: ${JSON.stringify(errorData)}`);
    }
    
    const result = await response.json();
    
    console.log('cron-statements: Job completed successfully:', JSON.stringify(result));
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Cron job completed successfully', 
      result,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('cron-statements: Job failed:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
