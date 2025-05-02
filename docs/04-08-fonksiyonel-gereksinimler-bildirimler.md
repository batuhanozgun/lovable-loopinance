Loopinance Fonksiyonel Gereksinimler: Bildirimler
Bu doküman, Loopinance uygulamasının bildirim modülüne ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
0. Genel Bakış
Bildirimler modülü, kullanıcılara önemli finansal olayları (ekstre kapanışı, bütçe aşımı, hatırlatmalar) bildiren bir sistem sunar. Modül, nakit hesaplar (04-03), bütçe planlama (04-04) ve ayarlar (04-06) ile entegre çalışır, ancak hesaplardan bağımsızdır.
1. Kapsam
Bu doküman, bildirim türleri (uygulama içi, e-posta), bildirim yönetimi ve kullanıcı tercihlerini kapsar. UX/UI detayları 06-ux-ui-tasarim-dokumani.md, teknik detaylar 07-teknik-tasarim-dokumani.md, performans riskleri 03-risk-yonetim-plani.md adreslenir.
2. Fonksiyonel Gereksinimler
3.8. Bildirimler
3.8.1 Bildirim Türleri ve Gösterimi
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, finansal durumumla ilgili önemli bildirimleri uygulama içinde ve e-posta ile alabilmeliyim ki gelişmelerden haberdar olayım.
Kabul Kriterleri:

Bildirim Türleri:
Ekstre Kapanışı (04-03, 3.5.7):
1 hafta önce: “Ekstreniz 7 gün sonra kapanacak.”
Kapanış günü: “Ekstreniz bu gece kapanacak, işlemleri girin.”
Kapanış sonrası: “Ekstreniz kapandı, yeni dönem [tarih aralığı] açıldı.”


Bütçe Aşımı (04-04, 3.6.6): “Gıda’da %20 aşım, 40 TL fazla!”
Genel Hatırlatma: “Bütçe kalemi ekle!” (haftalık, özelleştirilebilir).
Çift Açık Ekstre (04-03, 3.5.8): “Hesapta fazladan açık ekstre var, lütfen eski ekstreyi kapatın.”


Gösterim:
Uygulama içi: Zil ikonunda son 5 bildirim, “Hepsini Gör” ile bildirim sayfasına yönlendirme.
E-posta: Kullanıcı tercihine bağlı (04-06, 3.6.2), Supabase e-posta servisiyle gönderilir.


Bildirimler, tıklanabilir; ilgili modüle yönlendirir (örneğin, ekstre kapanışı → 04-03, 3.5.3).

3.8.2 Bildirim Yönetimi
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, bildirimlerimi görebilmeli, okuyabilmeli ve temizleyebilmeliyim ki düzenli kalsın.
Kabul Kriterleri:

Bildirim sayfası: Tüm bildirimler kronolojik sıralı (en yeni üstte).
Okundu İşareti: Bildirim tıklandığında “okundu” olarak işaretlenir.
Temizleme:
“Tümünü Temizle” butonu, tüm bildirimleri siler.
Tek tek silme: Her bildirimde “Sil” ikonu.


Temizleme işlemi <1 saniye.

3.8.3 Bildirim Tercihleri
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, hangi bildirimleri alacağımı özelleştirebilmeliyim ki sadece ilgilendiğim bildirimleri göreyim.
Kabul Kriterleri:

Ayarlar modülünden (04-06, 3.6.2) yönetilir:
Ekstre Kapanışı: Açık/Kapalı.
Bütçe Aşımı: Açık/Kapalı.
Genel Hatırlatmalar: Açık/Kapalı.
Çift Açık Ekstre: Açık/Kapalı.


Varsayılan: Tüm bildirimler açık.
Değişiklikler, “Uygula” butonuyla kaydedilir (<1 saniye).

3.8.4 Mobil Uyumluluk
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, bildirimleri mobilde de görebilmeliyim ki her zaman haberdar olayım.
Kabul Kriterleri:

Bildirim paneli tek sütun, kaydırılabilir.
Zil ikonu badge ile (örneğin, “3 yeni bildirim”).
Animasyonlar: Panel açılma 0.3 saniye, bildirim güncelleme 0.5 saniye.

3.8.5 Performans ve Modülerlik
Kabul Kriterleri:

Bildirim gönderimi, görüntüleme, temizleme <1 saniye.
50 bildirim için optimize edilir (03-risk-yonetim-plani.md).
Kod, ayrı bir klasörde (/notifications) yazılır, diğer modüllerden bağımsız.
Lovable.dev talimatları: Mimari yoruma izin verilmeden yazılır.
Dosya yapısı: /notifications/manage.ts.

3.8.6 Tasarım Tutarlılığı
Kabul Kriterleri:

Bildirim paneli ve ikonlar, merkezi tasarım sisteminden çekilir (06-ux-ui-tasarim-dokumani.md).
Renk paleti: Bildirim (mavi), uyarı (kırmızı), nötr (gri).

Bağlantılar

04-01-fonksiyonel-gereksinimler-ana-sayfa-ve-kayit.md, 3.4.3 Bildirimler
04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.7 Ekstre Kapanışı, 3.5.8 Kapalı Ekstre Açma
04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.6 Görselleştirme
04-06-fonksiyonel-gereksinimler-ayarlar.md, 3.6.2 Veri Gizliliği Tercihleri
06-ux-ui-tasarim-dokumani.md için panel tasarımı
07-teknik-tasarim-dokumani.md için Supabase entegrasyonu
03-risk-yonetim-plani.md için performans riskleri

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
