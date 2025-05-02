Loopinance Veri Gizliliği ve Güvenlik Politikası
Bu doküman, Loopinance kişisel finans yönetimi uygulamasında kullanıcı verilerinin korunmasını ve yasal uyumluluğu sağlamak için gerekli politikaları ve stratejileri tanımlar. Veri gizliliği ve güvenliği, kullanıcı güvenini ve projenin başarısını doğrudan etkileyen kritik bir unsurdur.
1. Giriş
1.1. Amaç
Bu doküman, Loopinance projesinde kullanıcı verilerinin gizliliğini ve güvenliğini sağlamak için uygulanacak politikaları, stratejileri ve prosedürleri tanımlamayı amaçlar. Kullanıcı verilerinin korunması, yasal uyumluluk (örneğin, GDPR) ve kullanıcı güveninin kazanılması hedeflenir.
1.2. Kapsam
Doküman, Loopinance’ın ilk sürümünde işlenen tüm kullanıcı verilerini kapsar: hesap bilgileri, işlem verileri, bütçe kalemleri, kategori/alt kategori bilgileri ve kullanıcı profili verileri. Veri şifreleme, erişim kontrolleri, güvenlik denetimleri ve yasal uyumluluk gereksinimleri ele alınır. KOBİ odaklı özellikler ve banka API entegrasyonları bu aşamada kapsam dışıdır.
1.3. Hedef Kitle

Ürün Sahibi (PO): Politikaların onaylanması.
Yazılım Mimarı: Güvenlik stratejilerinin tasarımı.
Geliştiriciler: Güvenlik protokollerinin uygulanması.
QA Ekibi: Güvenlik testlerinin yürütülmesi.
Son Kullanıcılar: Veri gizliliği politikası hakkında bilgilendirme.

1.4. Güncelleme Süreci

Doküman, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde versiyon kontrollü şekilde yönetilir.
Her değişiklik, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında Ürün Sahibi tarafından gözden geçirilir.

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
2. Veri Gizliliği İlkeleri
Loopinance, aşağıdaki temel veri gizliliği ilkelerine bağlıdır:

Şeffaflık: Kullanıcılar, verilerinin nasıl işlendiği konusunda açıkça bilgilendirilir.
Veri Minimizasyonu: Yalnızca gerekli veriler toplanır ve işlenir.
Amaç Sınırlaması: Veriler, yalnızca toplandıkları amaç için kullanılır.
Güvenlik: Veriler, şifreleme ve erişim kontrolleriyle korunur.
Kullanıcı Kontrolü: Kullanıcılar, verilerine erişebilir, düzeltebilir ve silebilir.

3. Güvenlik Stratejileri
3.1. Veri Şifreleme

Tanım: Tüm kullanıcı verileri (hesap bilgileri, işlemler, bütçeler) şifrelenerek saklanır ve iletilir.
Uygulama:
Veritabanında (Supabase): AES-256 şifreleme kullanılır.
İletişimde: HTTPS ve TLS 1.3 ile veri iletimi korunur.
Hassas veriler (örneğin, kullanıcı şifreleri): Hashing (bcrypt) ile saklanır.


Sorumlu: Yazılım mimarı ve geliştiriciler.

3.2. Erişim Kontrolleri

Tanım: Verilere yalnızca yetkili kullanıcılar erişebilir.
Uygulama:
Kullanıcı kimlik doğrulama: Supabase Authentication ile oturum yönetimi.
Rol tabanlı erişim: Kullanıcılar yalnızca kendi verilerine erişebilir; admin erişimi için ek doğrulama (örneğin, iki faktörlü kimlik doğrulama).
API erişim kontrolleri: Her API isteği için yetkilendirme token’ı kontrol edilir.


Sorumlu: Geliştiriciler ve QA ekibi.

3.3. Güvenlik Denetimleri

Tanım: Sistem, düzenli güvenlik denetimlerinden geçirilir.
Uygulama:
Sprint sonlarında güvenlik testleri yapılır (örneğin, SQL enjeksiyon, XSS testleri).
Supabase güvenlik raporları izlenir.
Üçüncü taraf güvenlik araçları (örneğin, OWASP ZAP) ile tarama yapılır.


Sorumlu: QA ekibi ve yazılım mimarı.

3.4. Veri Saklama ve Silme

Tanım: Kullanıcı verileri yalnızca gerekli süre saklanır ve kullanıcı talebiyle silinir.
Uygulama:
Veriler, yalnızca aktif kullanım süresi boyunca saklanır (örneğin, arşivlenen ekstreler 5 yıl saklanır).
Kullanıcı, Ayarlar sayfasından verilerini silebilir (04-06, 3.6.3).
Silinen veriler, 30 gün içinde kalıcı olarak kaldırılır.


Sorumlu: Geliştiriciler ve proje yöneticisi.

4. Yasal Uyumluluk
Loopinance, aşağıdaki düzenlemelere uyum sağlayacaktır:

GDPR (Genel Veri Koruma Tüzüğü):
Kullanıcı onayı: Veri işleme için açık rıza alınır.
Veri erişimi: Kullanıcılar, verilerine erişme ve düzeltme hakkına sahiptir.
Veri taşınabilirliği: Kullanıcılar, verilerini CSV formatında dışa aktarabilir (04-06, 3.6.3).


Diğer Düzenlemeler: Türkiye KVKK (Kişisel Verilerin Korunması Kanunu) gereklilikleri takip edilir.

5. Risk Azaltma ve Acil Durum Planları
Risk yönetim planında (03-risk-yonetim-plani.md) veri gizliliği ve güvenliği yüksek etkili bir risk olarak tanımlanmıştır. Aşağıdaki stratejiler uygulanacaktır:

Risk Azaltma:
Erken güvenlik politikası tanımlama: Bu doküman, projenin başlarında tamamlanmıştır.
Güvenlik eğitimleri: Geliştiricilere veri gizliliği ve güvenlik konusunda eğitim verilecek.
Düzenli denetimler: Güvenlik açıkları sprintlerde test edilecek.


Acil Durum Planı:
Veri ihlali tespiti durumunda:
Sistem çevrimdışı alınacak.
Güvenlik yamaları uygulanacak.
Kullanıcılar şeffaf bir şekilde bilgilendirilecek (örneğin, e-posta ile bildirim).
Yasal mercilere bildirim yapılacak (örneğin, KVKK’ya 72 saat içinde raporlama).




Sorumlu: Proje yöneticisi ve yazılım mimarı.

6. İzleme ve Raporlama

Denetim Süreci: Güvenlik denetimleri her sprint sonunda yapılacak; sonuçlar GitHub Wiki’ye yüklenecek.
Kullanıcı Bildirimi: Veri gizliliği politikası, Ayarlar sayfasında (04-06) erişilebilir olacak.
Raporlama: Güvenlik ihlali veya risk durumunda PO’ya anında bildirim yapılacak.

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
