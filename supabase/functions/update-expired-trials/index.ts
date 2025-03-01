
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

  console.log("Trial süresi kontrolü başlatılıyor...");

  try {
    // Supabase Client başlatma
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Gerekli ortam değişkenleri bulunamadı: SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabaseClient = createClient(
      supabaseUrl,
      supabaseServiceKey,
      { auth: { persistSession: false } }
    );

    console.log("Supabase istemcisi başlatıldı");

    // 1. SQL fonksiyonunu çağır - süresi dolmuş abonelikleri güncelle
    console.log("update_expired_trials() fonksiyonu çağrılıyor...");
    const { data: updateResult, error: updateError } = await supabaseClient.rpc('update_expired_trials');

    if (updateError) {
      console.error('Süresi dolmuş abonelikleri güncelleme hatası:', updateError);
      throw updateError;
    }

    console.log("Süresi dolmuş abonelikler güncellendi");

    // 2. Süresi dolmuş ve bildirim gönderilmemiş abonelikleri getir
    const { data: expiredSubscriptions, error: queryError } = await supabaseClient
      .from('subscriptions')
      .select('id, user_id, type, trial_ends_at, updated_at, last_notification_date, notification_count')
      .eq('status', 'expired')
      .is('is_trial_notified', false)
      .lt('trial_ends_at', new Date().toISOString());

    if (queryError) {
      console.error('Süresi dolmuş abonelikleri alma hatası:', queryError);
      throw queryError;
    }

    console.log(`${expiredSubscriptions?.length || 0} adet süresi dolmuş abonelik bulundu`);

    // 3. Yaklaşan bitiş tarihleri için bildirim gerekenleri getir
    const { data: upcomingExpirations, error: upcomingError } = await supabaseClient
      .from('subscriptions')
      .select('id, user_id, type, trial_ends_at, updated_at')
      .eq('status', 'active')
      .eq('type', 'trial')
      .gt('trial_ends_at', new Date().toISOString())
      .lt('trial_ends_at', new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()); // 14 gün içinde bitecekler

    if (upcomingError) {
      console.error('Yaklaşan süresi dolacak abonelikleri alma hatası:', upcomingError);
      throw upcomingError;
    }

    console.log(`${upcomingExpirations?.length || 0} adet yakında süresi dolacak abonelik bulundu`);

    // 4. Bildirim gönderildiğini işaretle
    if (expiredSubscriptions && expiredSubscriptions.length > 0) {
      const updatePromises = expiredSubscriptions.map(subscription => 
        supabaseClient
          .from('subscriptions')
          .update({ 
            is_trial_notified: true,
            last_notification_date: new Date().toISOString(),
            notification_count: (subscription.notification_count || 0) + 1
          })
          .eq('id', subscription.id)
      );
      
      console.log("Bildirim gönderildi işaretleniyor...");
      await Promise.all(updatePromises);
      console.log("Bildirim işaretlemeleri tamamlandı");
    }

    // 5. Yaklaşan bitiş tarihleri için next_notification_date güncelle
    if (upcomingExpirations && upcomingExpirations.length > 0) {
      for (const subscription of upcomingExpirations) {
        const trialEndDate = new Date(subscription.trial_ends_at);
        const now = new Date();
        const daysUntilExpiration = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        // Kalan süreye göre bir sonraki bildirim tarihini belirle
        let nextNotificationDate: Date | null = null;
        
        if (daysUntilExpiration <= 3) {
          // Son 3 gün: Günlük bildirim
          nextNotificationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 gün sonra
        } else if (daysUntilExpiration <= 7) {
          // 4-7 gün: 2 günde bir bildirim
          nextNotificationDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 gün sonra
        } else if (daysUntilExpiration <= 14) {
          // 8-14 gün: 3 günde bir bildirim
          nextNotificationDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 gün sonra
        }

        if (nextNotificationDate) {
          await supabaseClient
            .from('subscriptions')
            .update({ 
              next_notification_date: nextNotificationDate.toISOString() 
            })
            .eq('id', subscription.id);
        }
      }
      console.log("Yaklaşan bitiş tarihleri için bildirim planlaması güncellendi");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Süresi dolmuş abonelikler güncellendi',
        expired_count: expiredSubscriptions?.length || 0,
        upcoming_count: upcomingExpirations?.length || 0
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
