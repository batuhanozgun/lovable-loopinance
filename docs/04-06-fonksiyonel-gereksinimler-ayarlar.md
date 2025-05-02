Loopinance Fonksiyonel Gereksinimler: Ayarlar
Bu doküman, Loopinance uygulamasının ayarlar modülüne ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
0. Genel Bakış
Ayarlar modülü, kullanıcıların uygulama genelinde tercihlerini (dil, para birimi, veri gizliliği, veri yönetimi) özelleştirmesini sağlar. Hesaplardan bağımsız çalışır ve kullanıcı dostu bir deneyim sunmayı hedefler.
1. Kapsam
Bu doküman, dil seçimi, para birimi ayarları, veri gizliliği tercihleri ve veri yönetimini (temizleme, dışa aktarma) kapsar. UX/UI detayları 06-ux-ui-tasarim-dokumani.md, teknik detaylar 07-teknik-tasarim-dokumani.md, performans riskleri 03-risk-yonetim-plani.md adreslenir.
2. Fonksiyonel Gereksinimler
3.6. Ayarlar
3.6.1 Dil ve Para Birimi Seçimi
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, uygulamayı kendi dilimde ve tercih ettiğim para biriminde kullanabilmeliyim ki deneyimim daha rahat olsun.
Kabul Kriterleri:

Dil Seçimi:
Dropdown: Türkçe, İngilizce, Almanca.
Varsayılan: Kullanıcı cihaz diline göre otomatik (örneğin, Türkçe cihaz için Türkçe).


Para Birimi Seçimi:
Dropdown: TRY, USD, EUR (04-03 ile uyumlu).
Varsayılan: TRY.


Değişiklik, “Kaydet” butonuyla uygulanır (<1 saniye).
Para birimi değişimi, mevcut verileri dönüştürmez, yalnızca yeni işlemlerde geçerli olur.

3.6.2 Veri Gizliliği Tercihleri
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, veri gizliliği ayarlarımı yönetebilmeliyim ki bilgilerimin nasıl kullanıldığını kontrol edeyim.
Kabul Kriterleri:

Veri Kullanımı:
Analiz için veri paylaşımı: Açık/Kapalı (varsayılan: Kapalı).
Üçüncü taraf paylaşımı: Açık/Kapalı (varsayılan: Kapalı).


Gizlilik Politikası Bağlantısı:
“Gizlilik Politikasını Oku” bağlantısı, politikaya yönlendirir.


Değişiklikler, “Uygula” butonuyla kaydedilir (<1 saniye).

3.6.3 Veri Yönetimi
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, verilerimi temizleyebilmeli veya dışa aktarabilmeliyim ki kontrolüm altında tutayım.
Kabul Kriterleri:

Veri Temizleme:
Seçenekler: İşlemler, Bütçeler, Tüm Veriler.
Onay modal’i: “Seçilen veriler silinecek, emin misiniz?”
Temizleme işlemi <2 saniye.


Veri Dışa Aktarma:
Tüm veriler (hesaplar, işlemler, bütçeler) CSV formatında dışa aktarılır.
“Dışa Aktar” butonu, onay modal’iyle çalışır: “Veriler dışa aktarılacak, emin misiniz?”
İşlem <2 saniye, dosya boyutu bilgisi (örneğin, “50 KB”).


Hata: “Dışa aktarma başarısız, tekrar deneyin.”

3.6.4 Mobil Uyumluluk
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ayarlar ekranını mobilde de kullanabilmeliyim ki her zaman erişim sağlayayım.
Kabul Kriterleri:

Dropdown’lar ve butonlar tek sütun, kaydırılabilir.
Modal’lar dokunmatik dostu.
Animasyonlar: Yükleme 0.5 saniye, geçiş 0.3 saniye.

3.6.5 Performans ve Modülerlik
Kabul Kriterleri:

Ayar güncelleme, veri temizleme/dışa aktarma <2 saniye.
Kod, ayrı bir klasörde (/settings) yazılır, diğer modüllerden bağımsız.
Lovable.dev talimatları: Mimari yoruma izin verilmeden yazılır.
Dosya yapısı: /settings/manage.ts.

3.6.6 Tasarım Tutarlılığı
Kabul Kriterleri:

Dropdown’lar, butonlar ve modal’lar, merkezi tasarım sisteminden çekilir (06-ux-ui-tasarim-dokumani.md).
Renk paleti: Tercihler (mavi), hata (kırmızı), nötr (gri).

Bağlantılar

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.1 Hesap Oluşturma (para birimi)
04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.2 Bütçe Kalemleri
05-veri-gizliligi-ve-guvenlik-politikasi.md için gizlilik bağlantısı
06-ux-ui-tasarim-dokumani.md için tasarım detayları
07-teknik-tasarim-dokumani.md için Supabase entegrasyonu
03-risk-yonetim-plani.md için performans riskleri

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
