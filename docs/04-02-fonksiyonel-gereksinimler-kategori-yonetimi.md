Loopinance Fonksiyonel Gereksinimler: Kategori Yönetimi
Bu doküman, Loopinance uygulamasının kategori ve alt kategori yönetimi işlevlerine ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
0. Genel Bakış
Kategori yönetimi modülü, kullanıcıların finansal işlemlerini ve bütçe planlarını organize etmek için kategori ve alt kategori yapıları oluşturmasını sağlar. Kullanıcılar, adminin yönettiği kategori kütüphanesinden kategorileri içe aktarabilir veya sıfırdan özelleştirilmiş yapılar oluşturabilir. Kategoriler, hem gelir hem gider işlemleri için kullanılabilir ve nakit hesap işlemleri (04-03) ile bütçe planlama (04-04) modülleriyle entegredir.
1. Kapsam
Bu doküman, kategori/alt kategori oluşturma, düzenleme, silme ve kategori kütüphanesi yönetimini kapsar. UX/UI detayları 06-ux-ui-tasarim-dokumani.md, teknik detaylar 07-teknik-tasarim-dokumani.md, performans riskleri 03-risk-yonetim-plani.md adreslenir.
2. Fonksiyonel Gereksinimler
3.4. Kategori ve Alt Kategori Yönetimi
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, adminin veri tabanında yönettiği kategori kütüphanesinden kategorileri içe aktarabilmeliyim ve sıfırdan özelleştirilmiş kategori/alt kategori yapıları oluşturabilmeliyim ki finansal işlemlerimi ve bütçe planlarımı hızlıca organize edeyim.
Kabul Kriterleri:

Kullanıcı, “Kategoriler” sayfasında “Yeni Kategori Ekle” veya “Kategori Kütüphanesini Görüntüle” CTA’larıyla kategori yönetim ekranına ulaşır.
Kategori Oluşturma (Sıfırdan):
Form Alanları:
Kategori Adı: 40 karaktere kadar serbest metin, zorunlu (örneğin, “Market”).
Alt Kategoriler: “Alt Kategori Ekle” CTA’sıyla istenildiği kadar alt kategori eklenebilir:
Alt Kategori Adı: 40 karaktere kadar serbest metin, zorunlu (örneğin, “Gıda”).


Açıklama: 400 karaktere kadar serbest metin, isteğe bağlı.


Kaydetme:
“Kategoriyi Kaydet” butonuyla Supabase’e kaydedilir.
Çakışma kontrolü: Aynı isimde kategori varsa, “Bu isimde bir kategori zaten var. Farklı bir isim kullanın.” toast mesajı.
Alt kategorilerde çakışma kontrolü: Aynı kategoride aynı isimde alt kategori varsa, “Bu isimde bir alt kategori zaten var. Farklı bir isim kullanın.” toast mesajı.


Kategori, kullanıcının kategori listesinde en üst seviyede görünür.


Kategori Kütüphanesi:
Kullanıcı, “Kategori Kütüphanesini Görüntüle” CTA’sıyla adminin veri tabanında yönettiği kategorileri görür.
Kütüphane Yapısı:
Kategoriler, kartlar şeklinde gösterilir (örneğin, “Market”, “Ev”).
Her kartta:
Kategori adı.
Akordeon tarzında alt kategoriler (örneğin, “Market” için “Gıda”, “Temizlik”).
Kartın üstünde “İçe Aktar” CTA’sı.




Örnek kategoriler (admin tarafından tanımlı):
“Market”: Gıda, Temizlik, Kişisel Bakım.
“Ev”: Faturalar, Kira, Dekorasyon.
“Ulaşım”: Toplu Taşıma, Yakıt.


İçe Aktarma Süreci:
Kullanıcı, karttaki “İçe Aktar” CTA’sına basar.
Özelleştirme ekranı açılır:
Kategori adı düzenlenebilir (örneğin, “Market” → “Süpermarket”).
Alt kategoriler düzenlenebilir, silinebilir veya yeni alt kategori eklenebilir (isim ve açıklama).
Çakışma kontrolü: Mevcut kategorilerle aynı isim varsa, “Aynı isimde kategori var. Üzerine yaz? [Evet/Hayır]” modal’i.


Kullanıcı, “Aktar” butonuna basar, yapı kullanıcının kategori listesine eklenir (<1 saniye).




Düzenleme:
Kategori veya alt kategori satırında “Düzenle” ikonu, mevcut bilgilerle dolu formu açar.
Düzenlenebilir alanlar: Kategori/alt kategori adı, açıklama.
Çakışma kontrolü: Yeni isim, mevcut kategorilerle/alt kategorilerle çakışırsa, “Bu isimde bir kategori/alt kategori zaten var. Farklı bir isim kullanın.” toast mesajı.
Değişiklik sonrası, bağlı işlemler ve bütçe kalemleri otomatik güncellenir (<1 saniye/hesap).


Silme ve Taşıma:
Kategori veya alt kategori satırında “Sil” ikonu, onay modal’ini açar: “Kategori/alt kategori silinecek, bağlı işlemler ve bütçe kalemleri etkilenecek. Ne yapmak istiyorsunuz?”
Seçenekler:
Sil: Kategori/alt kategori ve bağlı işlemler ile bütçe kalemleri tamamen silinir.
Taşı: Kullanıcı, bağlı alt kategorileri, işlemleri ve bütçe kalemlerini başka bir kategoriye/alt kategoriye toplu olarak taşır:
Kategori Silme: Her alt kategori için ayrı bir hedef kategori ve alt kategori seçilir (örneğin, “Gıda” → “Süpermarket/Gıda”, “Temizlik” → “Ev/Temizlik”). Tüm işlemler ve bütçe kalemleri, seçilen hedefe toplu taşınır.
Alt Kategori Silme: Sadece seçilen alt kategori için hedef kategori/alt kategori seçilir; işlemler ve bütçe kalemleri toplu taşınır.
Dropdown veya liste ile hedef seçilir; taşınan işlemler ve bütçe kalemlerinin kategori/alt kategori bilgileri güncellenir.




Silme Kuralları:
Kategoriye bağlı alt kategori varsa ve silme seçilirse: “Önce alt kategorileri silmelisiniz veya taşıyın.” toast mesajı.
Ekstreler zincirleme güncellenir (<1 saniye/hesap).




Sıralama ve Görselleştirme:
Kullanıcının kategori listesi, hiyerarşik akordeon yapısında gösterilir.
Kullanıcı, drag-and-drop veya ok tuşlarıyla kategori ve alt kategori sıralamasını değiştirebilir (görselleştirme için, dropdown’lar alfabetik kalır).
04-04, 3.6.6’daki görselleştirmelerde:
Pasta grafiğinde kategoriler ve alt kategoriler ayrı ayrı gösterilir.
Loading bar’lar alt kategori bazında analiz edilir.
Zaman grafiği, alt kategori trendlerini içerir.




Entegrasyon:
04-03, 3.5.5 İşlem Girişi:
İşlem giriş formunda, kategori dropdown’ında kullanıcıya özel kategoriler alfabetik sıralı listelenir.
Kategori seçildikten sonra, alt kategori dropdown’ı otomatik olarak ilgili alt kategorileri alfabetik sıralı yükler.


04-04, 3.6.2 Bütçe Kalemi Ekleme:
Bütçe kalemi formunda, kategori ve alt kategori dropdown’ları aynı mantıkla çalışır (alfabetik sıralı).


04-04, 3.6.6 Görselleştirme:
Kategoriler ve alt kategoriler, pasta grafiğinde ve loading bar’larda ayrı ayrı analiz edilir.


Not: Kategori ve alt kategori seçimi, işlem girişi (04-03) ve bütçe kalemi eklemede (04-04) zorunludur.
Not: Aynı kategori/alt kategori, birden fazla bütçe kalemi için kullanılabilir; eşleşmeler tarih aralığına göre belirlenir (04-04, 3.6.2).


Hata Senaryoları:
Aynı isimde kategori/alt kategori: “Bu isimde bir kategori/alt kategori zaten var. Farklı bir isim kullanın.”
Zorunlu alan eksik: “Kategori/alt kategori adı zorunlu.”
Silme engeli: “Kategoriye bağlı alt kategoriler veya işlemler var. Silmek veya taşımak için bir seçenek seçin.”
Kütüphane yüklenemedi: “Kategori kütüphanesi verileri yüklenemedi, lütfen tekrar deneyin.”


Mobil Uyumluluk:
Kategori kütüphanesi ve kullanıcı listesi, mobilde tek sütun, akordeon tarzı.
Kütüphane kartları, kompakt: Yalnızca kategori adı ve “İçe Aktar” CTA’sı görünür; alt kategoriler akordeonla açılır.
Drag-and-drop yerine ok tuşları veya kaydırma ile sıralama.
Formlar ve dropdown’lar, mobil klavye uyumlu.
Animasyonlar: Akordeon açılma 0.3 saniye, liste güncelleme 0.5 saniye (04-04 ile uyumlu).


Performans:
Kategori oluşturma, düzenleme, silme, kütüphane içe aktarma <1 saniye/hesap.
100 kategori/alt kategori için optimize edilir (03-risk-yonetim-plani.md).
Veriler, istemci tarafında önbelleğe alınır; batch API kullanılır.


Modülerlik:
Kod, kategori yönetimi için ayrı bir klasörde (örneğin, /categories) yazılır, nakit hesaplar ve bütçe planlamadan bağımsız.
Lovable.dev talimatları: Kod, mimari yoruma izin vermeden yazılır.
Dosya yapısı: /categories/manage.ts.


Tasarım Tutarlılığı:
Formlar, CTA’lar, akordeon ve kartlar, merkezi tasarım sisteminden çekilir (06-ux-ui-tasarim-dokumani.md).
Renk paleti: Kategoriler için mavi/yeşil tonlar, hatalar için kırmızı, nötr için gri (04-04, 3.6.6 ile uyumlu).



Bağlantılar

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.5 İşlem Girişi için kategori seçimi
04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.2 Bütçe Kalemi Ekleme ve 3.6.6 Görselleştirme için kategori entegrasyonu
06-ux-ui-tasarim-dokumani.md için form, kart, akordeon tasarımı
07-teknik-tasarim-dokumani.md için veri tabanı yapısı
03-risk-yonetim-plani.md için performans riskleri

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
