
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // CORS için OPTIONS isteğini işle
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Supabase bağlantısını kur
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    console.log('Checking for expired trials...')

    // Veritabanında update_expired_trials() fonksiyonunu çağır
    const { error: dbError } = await supabaseClient.rpc('update_expired_trials')

    if (dbError) {
      console.error('Database function error:', dbError)
      throw new Error(`Database function error: ${dbError.message}`)
    }

    // Bildirim gönderilmesi gereken abonelikleri al
    const { data: pendingNotifications, error: queryError } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('type', 'trial')
      .eq('status', 'active')
      .is('is_trial_notified', false)
      .lte('next_notification_date', new Date().toISOString())

    if (queryError) {
      console.error('Error fetching pending notifications:', queryError)
      throw new Error(`Query error: ${queryError.message}`)
    }

    console.log(`Found ${pendingNotifications?.length || 0} subscriptions that need notifications`)

    // Her bir bildirim gerektiren aboneliği işle
    if (pendingNotifications && pendingNotifications.length > 0) {
      for (const subscription of pendingNotifications) {
        // Kalan gün hesapla
        const trialEndsAt = new Date(subscription.trial_ends_at)
        const now = new Date()
        const remainingDays = Math.ceil((trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        
        console.log(`Processing subscription ${subscription.id}, days remaining: ${remainingDays}`)

        // Kullanıcının notification_settings'ine göre bildirim tercihleri kontrolü
        const sendNotification = subscription.notification_settings?.trialEndWarning !== false
        
        // Bildirim gönderildi olarak işaretle
        if (sendNotification) {
          const { error: updateError } = await supabaseClient
            .from('subscriptions')
            .update({
              is_trial_notified: true,
              last_notification_date: new Date().toISOString(),
              notification_count: (subscription.notification_count || 0) + 1,
              // Bir sonraki bildirim tarihini güncelle
              next_notification_date: remainingDays <= 3 
                ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 1 gün sonra
                : remainingDays <= 7 
                  ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 gün sonra 
                  : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 gün sonra
            })
            .eq('id', subscription.id)

          if (updateError) {
            console.error(`Error updating subscription ${subscription.id}:`, updateError)
          } else {
            console.log(`Successfully updated notification status for subscription ${subscription.id}`)
          }
        } else {
          console.log(`Skipping notification for subscription ${subscription.id} based on user preferences`)
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Trial status check completed',
        processed: pendingNotifications?.length || 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in update-expired-trials function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
