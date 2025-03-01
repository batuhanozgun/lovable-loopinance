
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.10.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Supabase Client başlatma
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // SQL fonksiyonunu çağır
    const { data, error } = await supabaseClient.rpc('update_expired_trials');

    if (error) {
      console.error('Sureleri dolmus abonelikleri guncelleme hatasi:', error);
      throw error;
    }

    // Süresi dolmuş abonelikleri getir
    const { data: expiredSubscriptions, error: queryError } = await supabaseClient
      .from('subscriptions')
      .select('id, user_id, type, trial_ends_at, updated_at')
      .eq('status', 'expired')
      .is('is_trial_notified', false)
      .lt('trial_ends_at', new Date().toISOString());

    if (queryError) {
      console.error('Suresi dolmus abonelikleri alma hatasi:', queryError);
      throw queryError;
    }

    // Bildirim gönderildiğini işaretle
    if (expiredSubscriptions && expiredSubscriptions.length > 0) {
      console.log(`${expiredSubscriptions.length} süresi dolmuş abonelik bulundu`);
      
      const updatePromises = expiredSubscriptions.map(subscription => 
        supabaseClient
          .from('subscriptions')
          .update({ is_trial_notified: true })
          .eq('id', subscription.id)
      );
      
      await Promise.all(updatePromises);
      
      // Burada e-posta bildirim lojiği eklenebilir
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Süresi dolmuş abonelikler güncellendi',
        updated_count: expiredSubscriptions?.length || 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Function error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Bilinmeyen bir hata oluştu'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

