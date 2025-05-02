Loopinance Test Planı
Bu doküman, Loopinance kişisel finans yönetimi uygulamasının kalitesini doğrulamak için test stratejisini, senaryolarını ve kalite güvence süreçlerini tanımlar. Nakit hesaplar özelinde hazırlanmış olup, ileride diğer hesap türleri (örneğin, kredi kartı hesapları, yatırım hesapları) için güncellenecektir.
1. Giriş
1.1. Amaç
Bu doküman, Loopinance projesinin fonksiyonel, entegrasyon, kullanıcı kabul ve performans testlerini planlamak ve yürütmek için bir rehber sağlar. Testler, uygulamanın fonksiyonel gereksinimlere (04), teknik tasarıma (07) ve risk yönetim planına (03) uygunluğunu doğrulamayı amaçlar.
1.2. Kapsam
Test planı, Loopinance’ın nakit hesaplar modülünü kapsar: hesap oluşturma, işlem girişi, ekstre yönetimi, bütçe entegrasyonu ve bildirimler. Diğer modüller (örneğin, kategori yönetimi, profil yönetimi) için testler de entegre edilecektir. Güvenlik testleri, veri gizliliği politikasına (05) uygun olarak yürütülür.
1.3. Hedef Kitle

QA Ekibi: Test senaryolarının yürütülmesi.
Geliştiriciler: Test sonuçlarının analizi ve hata düzeltme.
Ürün Sahibi (PO): Test sonuçlarının gözden geçirilmesi ve onayı.

1.4. Güncelleme Süreci

Doküman, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde versiyon kontrollü şekilde yönetilir.
Her değişiklik, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında Ürün Sahibi tarafından gözden geçirilir.

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
2. Test Stratejisi
Testler, aşağıdaki kategorilerde yürütülecektir:

Fonksiyonel Testler: Her özelliğin (örneğin, hesap oluşturma, işlem girişi) doğru çalıştığını doğrular.
Entegrasyon Testleri: Modüller arası etkileşimleri (örneğin, nakit hesaplar ve bütçe planlama) test eder.
Kullanıcı Kabul Testleri (UAT): Gerçek kullanıcı senaryolarını simüle eder.
Performans Testleri: Sistem yük altında nasıl davrandığını ölçer.
Güvenlik Testleri: Veri gizliliği ve güvenlik politikasına (05) uyumu doğrular.

3. Test Senaryoları
3.1. Fonksiyonel Testler

Hesap Oluşturma (04-03, 3.5.1):
Yeni bir nakit hesap oluşturulduğunda, doğru bilgilerle veritabanına kaydedilir.
Hatalı girişler (örneğin, negatif bakiye) toast mesajı ile engellenir.


İşlem Girişi (04-03, 3.5.5):
Para yatırma ve çekme işlemleri doğru şekilde kaydedilir.
Bütçe eşleştirme önerisi doğru kalemle eşleşir.


Ekstre Yönetimi (04-03, 3.5.3):
Ekstreler doğru tarih aralıklarında oluşturulur ve statüleri (açık, kapalı, gelecek) doğru yönetilir.


Bildirimler (04-08):
Ekstre kapanışı ve bütçe aşımı bildirimleri doğru zamanda tetiklenir.



3.2. Entegrasyon Testleri

Nakit Hesaplar ve Bütçe Planlama Entegrasyonu:
İşlem girişinde bütçe kalemi doğru şekilde eşleşir.
Bütçe kalemleri, ekstrelerde doğru şekilde yansır.


Kategori Yönetimi ve İşlem Girişi:
Kategori/alt kategori dropdown’ları işlem formunda doğru yüklenir.



3.3. Kullanıcı Kabul Testleri (UAT)

Gerçek Kullanıcı Senaryoları:
Bir kullanıcı, hesap oluşturur, işlem girer, ekstreleri görüntüler ve bütçe planlamasını kontrol eder.
Bildirimler, kullanıcıya zamanında ulaşır.


Kullanıcı Geri Bildirimi: Test sırasında kullanıcı deneyimi ve arayüz tutarlılığı değerlendirilir.

3.4. Performans Testleri

Yük Testi: 5.000 eşzamanlı kullanıcıyla sistemin yanıt süresi ölçülür.
Stres Testi: Maksimum kapasiteyi aşan senaryolarla sistemin kırılma noktası belirlenir.
Veritabanı Performansı: Supabase sorgularının optimize edildiği doğrulanır.

3.5. Güvenlik Testleri

Veri Şifreleme: Hassas verilerin (örneğin, kullanıcı şifreleri) doğru şekilde şifrelendiği test edilir.
Erişim Kontrolleri: Yetkisiz kullanıcıların veri erişimi engellenir.
Güvenlik Açıkları: SQL enjeksiyon, XSS gibi yaygın güvenlik açıkları test edilir.

4. Test Ortamı ve Araçları

Test Ortamı: Supabase’in test veritabanı ve Lovable ile geliştirilen test sürümü kullanılacak.
Araçlar:
Fonksiyonel Testler: Jest veya Cypress ile otomatik testler.
Performans Testleri: JMeter veya Locust ile yük testleri.
Güvenlik Testleri: OWASP ZAP veya Burp Suite ile güvenlik taramaları.


Test Verileri: Gerçekçi kullanıcı senaryolarını simüle eden sahte veriler kullanılacak.

5. Test Programı

Sprint Başlangıcı: Fonksiyonel ve entegrasyon testleri için senaryolar hazırlanır.
Sprint Ortası: Testler yürütülür, hatalar raporlanır.
Sprint Sonu: Kullanıcı kabul testleri ve performans testleri yapılır.
Sorumlular:
QA Ekibi: Test senaryolarının yürütülmesi.
Geliştiriciler: Hata düzeltme ve yeniden test.
PO: Test sonuçlarının onayı.



6. Risk Azaltma
Risk yönetim planında (03-risk-yonetim-plani.md) tanımlanan risklere yönelik testler önceliklendirilecektir:

Modüler Yapı Testleri: Modüller arası entegrasyon testleri.
Performans Testleri: Yük ve stres testleri.
Güvenlik Testleri: Veri gizliliği ve erişim kontrolleri.

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
