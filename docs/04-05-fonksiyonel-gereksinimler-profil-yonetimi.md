Loopinance Fonksiyonel Gereksinimler: Profil Yönetimi
Bu doküman, Loopinance uygulamasının profil yönetimi modülüne ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
0. Genel Bakış
Profil yönetimi modülü, kullanıcıların kişisel bilgilerini (ad, e-posta, avatar), özelleştirmelerini (temalar, bildirim ayarları) ve hesap bağlantılarını yönetmesini sağlar. Hesaplardan bağımsız çalışır ve kullanıcı dostu bir deneyim sunar.
1. Kapsam
Bu doküman, profil bilgisi düzenleme, özelleştirme seçenekleri ve hesap bağlantı yönetimini kapsar. UX/UI detayları 06-ux-ui-tasarim-dokumani.md, teknik detaylar 07-teknik-tasarim-dokumani.md, performans riskleri 03-risk-yonetim-plani.md adreslenir.
2. Fonksiyonel Gereksinimler
3.5. Profil Yönetimi
3.5.1 Profil Bilgisi Düzenleme
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, profil bilgimi (ad, e-posta, avatar) güncelleyebilmeliyim ki kişisel bilgilerim her zaman güncel kalsın.
Kabul Kriterleri:

Kullanıcı, “Profil” sekmesinden düzenleme formuna ulaşır.
Form Alanları:
Ad: 50 karaktere kadar serbest metin, zorunlu.
E-posta: Geçerli format, zorunlu, Supabase ile doğrulama.
Avatar: Dosya yükleme (PNG/JPG, max 5MB) veya URL ile ekleme.


Güncelleme, “Kaydet” butonuyla Supabase’e kaydedilir (<1 saniye).
Hata senaryoları: Geçersiz e-posta (“Geçersiz format”), dosya boyutu aşımı (“Maksimum 5MB”).

3.5.2 Özelleştirme Seçenekleri
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, temalar ve bildirim ayarlarını özelleştirebilmeliyim ki uygulamayı kendi zevkime göre kullanayım.
Kabul Kriterleri:

Tema Seçimi:
Açık/Koyu mod: Toggle ile geçiş.
Renk şeması: 3 seçenek (mavi, yeşil, gri).


Bildirim Ayarları:
Bütçe aşımı: Açık/Kapalı.
Ekstre kapanışı: Açık/Kapalı.
Genel hatırlatmalar: Açık/Kapalı.


Değişiklikler, “Uygula” butonuyla kaydedilir (<1 saniye).
Varsayılan ayarlar: Açık mod, tüm bildirimler açık.

3.5.3 Hesap Bağlantıları
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, Google/Apple ile bağlantılı hesaplarımı yönetebilmeliyim ki giriş yöntemlerimi kontrol edeyim.
Kabul Kriterleri:

Bağlı hesaplar listelenir (Google, Apple).
“Bağlantıyı Kes” butonu, onay modal’iyle bağlantıyı kaldırır.
Yeni bağlantı: Google/Apple butonlarıyla ekleme (<2 saniye).
Hata senaryosu: Bağlantı hatası (“Bağlantı başarısız, tekrar deneyin”).

3.5.4 Mobil Uyumluluk
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, profil yönetimini mobilde de kullanabilmeliyim ki her zaman erişim sağlayayım.
Kabul Kriterleri:

Formlar tek sütun, kaydırılabilir.
Toggle ve butonlar dokunmatik dostu.
Animasyonlar: Yükleme 0.5 saniye, geçiş 0.3 saniye.

3.5.5 Performans ve Modülerlik
Kabul Kriterleri:

Güncelleme, yükleme <1 saniye.
10 alan/ayar için optimize edilir (03-risk-yonetim-plani.md).
Kod, ayrı bir klasörde (/profile) yazılır, diğer modüllerden bağımsız.
Lovable.dev talimatları: Mimari yoruma izin verilmeden yazılır.
Dosya yapısı: /profile/manage.ts.

3.5.6 Tasarım Tutarlılığı
Kabul Kriterleri:

Formlar, toggle’lar ve butonlar, merkezi tasarım sisteminden çekilir (06-ux-ui-tasarim-dokumani.md).
Renk paleti: Tema seçenekleri (mavi, yeşil, gri), hata (kırmızı).

Bağlantılar

04-01-fonksiyonel-gereksinimler-ana-sayfa-ve-kayit.md, 3.4.4 Profil Kısa Bilgi
04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.7 Ekstre Kapanışı
04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.6 Görselleştirme
06-ux-ui-tasarim-dokumani.md için form ve toggle tasarımı
07-teknik-tasarim-dokumani.md için Supabase entegrasyonu
03-risk-yonetim-plani.md için performans riskleri

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
