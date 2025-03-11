
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
      throw new Error(`Edge function failed: ${JSON.stringify(errorData)}`);
    }
    
    const result = await response.json();
    
    console.log('Cron job completed successfully');
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Cron job completed successfully', 
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Cron job failed:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
