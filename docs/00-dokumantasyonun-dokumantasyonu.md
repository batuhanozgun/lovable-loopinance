Loopinance Dokümantasyonun Dokümantasyonu
1. Giriş
1.1. Amaç
Bu doküman, Loopinance kişisel finans yönetimi uygulamasının geliştirme süreci için gerekli tüm dokümantasyon yapısını tanımlamayı amaçlar. Her dokümanın amacı, kapsamı, hedef kitlesi ve diğer dokümanlarla ilişkisi açıklanarak, paydaşların projenin dokümantasyon ihtiyaçlarını anlaması sağlanır. Modüler bir yaklaşımla, dokümanların hazırlanma sırası ve güncelleme süreci tanımlanır.
1.2. Kapsam
Doküman, Loopinance’ın vizyonundan teslimine kadar tüm geliştirme sürecini destekleyen dokümanları kapsar. Odak, bireysel kullanıcıların ihtiyaçlarına yönelik ilk sürüm özelliklerdir: çoklu döviz desteği (TRY, USD, EUR), ekstre bazlı hesap yönetimi, bütçe ve gerçekleşen veri entegrasyonu, kategori/alt kategori yönetimi, modüler hesap yönetimi (nakit, kredi kartı, yatırım). KOBİ odaklı özellikler kapsam dışıdır.
1.3. Hedef Kitle

Ürün Sahibi (PO): Dokümanların önceliklendirilmesi ve onaylanması.
Yazılım Mimarı: Teknik tasarım ve mimari kararlar.
Geliştiriciler: Kod geliştirme ve uygulama.
UX/UI Tasarımcıları: Kullanıcı arayüzü ve deneyimi tasarımı.
QA Ekibi: Test senaryoları ve kalite güvence.

1.4. Güncelleme Süreci

Dokümanlar, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde versiyon kontrollü şekilde yönetilir.
Her değişiklik, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında Ürün Sahibi tarafından gözden geçirilir.

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
2. Dokümantasyon Yapısı
Loopinance’ın geliştirme süreci için aşağıdaki dokümanlar tanımlanmıştır. Her dokümanın amacı, kapsamı, durumu ve diğer dokümanlarla ilişkisi açıklanmıştır. Modüler bir yaklaşımla, dokümanlar bağımsız ancak birbiriyle bağlantılıdır. Dosya isimleri, yönetim kolaylığı için numaralandırılmıştır.
2.1. Vizyon ve Kapsam Dokümanı (01-vizyon-ve-kapsam-dokumani.md)

Amaç: Projenin vizyonunu, misyonunu ve temel hedeflerini tanımlamak; paydaşlar için ortak bir referans oluşturmak.
Kapsam: Uygulamanın çözdüğü problemler, ilk sürüm özellikleri (çoklu döviz, ekstre yönetimi, bütçe entegrasyonu, kategori yönetimi, modüler hesap yönetimi), kapsam dışı unsurlar, başarı kriterleri.
Hedef Kitle: Tüm paydaşlar.
İlişkiler: Tüm dokümanlar için temel referans.
Durum: Tamamlandı.

2.2. Proje Yönetim Planı (02-proje-yonetim-plani.md)

Amaç: Geliştirme sürecinin aşamalarını, kilometre taşlarını ve görev sıralarını tanımlamak; adım adım ilerlemeyi sağlamak.
Kapsam: Proje aşamaları, kilometre taşları, görev dağılımları, risk analizi, sprintlerin genel çerçevesi.
Hedef Kitle: PO, proje yöneticisi, geliştiriciler.
İlişkiler: Vizyon dokümanına dayanır, diğer dokümanların hazırlanmasını koordine eder.
Durum: Tamamlandı.

2.3. Risk Yönetim Planı (03-risk-yonetim-plani.md)

Amaç: Projedeki potansiyel riskleri tanımlamak ve azaltma stratejileri geliştirmek.
Kapsam: Risk tanımları, olasılık ve etki analizleri, azaltma planları, acil durum senaryoları (örneğin, modüler yapının karmaşıklaşması, Lovable.dev’in yanlış dosyalarda değişiklik yapması).
Hedef Kitle: PO, proje yöneticisi, geliştiriciler.
İlişkiler: Proje yönetim planına dayanır, vizyon dokümanındaki hedefleri destekler.
Durum: Henüz hazırlanmadı; bir sonraki doküman olarak önerilir.

2.4. Fonksiyonel Gereksinimler Dokümanı (04-fonksiyonel-gereksinimler-dokumani.md)

Amaç: Uygulamanın kullanıcı odaklı işlevlerini tanımlamak; geliştirme ve test için rehber sağlamak.
Kapsam: Kullanıcı rolleri (bireysel kullanıcılar), kullanıcı hikayeleri, fonksiyonel gereksinimler, kullanım senaryoları, kısıtlamalar. Teknik detaylar hariç.
Hedef Kitle: PO, geliştiriciler, UX/UI tasarımcıları, QA.
İlişkiler: Vizyon dokümanına dayanır, teknik tasarım ve UX/UI için temel oluşturur.
Durum: İlk taslak (kullanıcı hikayeleri) hazırlandı, geri bildirim bekleniyor.
Alt Modüller:
Kategori Yönetimi (04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md):
Amaç: Kategori ve alt kategori işlevlerini tanımlamak.
Durum: Tamamlandı, GitHub’a yüklendi.


Nakit Hesaplar (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md):
Amaç: Nakit hesap yönetimi işlevlerini tanımlamak (hesap oluşturma, ekstre yönetimi, işlem girişi).
Durum: Bütçe eşleştirme (3.5.5) hariç finalize olmaya hazır; revizyon bekleniyor.


Bütçe Planlama (04-04-fonksiyonel-gereksinimler-butce-planlama.md):
Amaç: Bütçe planlama ve takip işlevlerini tanımlamak.
Durum: Tamamlandı, GitHub’a yüklendi.


Bildirimler (04-05-fonksiyonel-gereksinimler-bildirimler.md):
Amaç: Bildirim işlevlerini tanımlamak (ekstre kapanışı, hatırlatmalar).
Durum: Henüz hazırlanmadı, planlanıyor.


Kredi Kartı Hesapları (04-06-fonksiyonel-gereksinimler-kredi-karti-hesaplari.md):
Amaç: Kredi kartı hesabı işlevlerini tanımlamak.
Durum: Henüz hazırlanmadı, planlanıyor.


Yatırım Hesapları (04-07-fonksiyonel-gereksinimler-yatirim-hesaplari.md):
Amaç: Yatırım hesabı işlevlerini tanımlamak.
Durum: Henüz hazırlanmadı, planlanıyor.





2.5. Veri Gizliliği ve Güvenlik Politikası (05-veri-gizliligi-ve-guvenlik-politikasi.md)

Amaç: Kullanıcı verilerinin korunmasını ve yasal uyumluluğu (örneğin, GDPR) sağlamak.
Kapsam: Veri şifreleme, erişim kontrolleri, uyumluluk gereksinimleri, güvenlik denetimleri.
Hedef Kitle: Yazılım mimarı, geliştiriciler, QA, PO.
İlişkiler: Fonksiyonel gereksinimlere dayanır, teknik tasarıma rehber olur.
Durum: Henüz hazırlanmadı; fonksiyonel gereksinimlerden sonra önerilir.

2.6. UX/UI Tasarım Dokümanı (06-ux-ui-tasarim-dokumani.md)

Amaç: Kullanıcı arayüzü ve deneyimini tanımlamak; tasarımcılar ve geliştiriciler için rehber sağlamak.
Kapsam: Wireframe’ler, mockup’lar, kullanıcı akışları, tasarım ilkeleri, ön yüzde obje yönetimi (örneğin, komponent kütüphanesi).
Hedef Kitle: UX/UI tasarımcıları, geliştiriciler, PO.
İlişkiler: Fonksiyonel gereksinimlere dayanır, teknik tasarımla uyumlu olmalıdır.
Durum: Henüz hazırlanmadı; fonksiyonel gereksinimlerle paralel geliştirilebilir.

2.7. Teknik Tasarım Dokümanı (07-teknik-tasarim-dokumani.md)

Amaç: Uygulamanın teknik uygulamasını tanımlamak; geliştirme ekibi için rehber sağlamak.
Kapsam: Sistem mimarisi, API entegrasyonları, veri akışları, güvenlik protokolleri, modüler hesap yönetimi yapısı (örneğin, account/{accountId}/).
Hedef Kitle: Yazılım mimarı, geliştiriciler, QA.
İlişkiler: Fonksiyonel gereksinimlere, UX/UI’ye ve veri gizliliği politikasına dayanır.
Durum: Henüz hazırlanmadı; fonksiyonel gereksinimler ve veri gizliliği tamamlandıktan sonra önerilir.

2.8. Performans ve Ölçeklenebilirlik Planı (08-performans-ve-olceklenebilirlik-plani.md)

Amaç: Uygulamanın performans hedeflerini ve ölçeklenebilirlik stratejilerini tanımlamak.
Kapsam: Performans kriterleri, yük testi senaryoları, altyapı ölçeklendirme planları (örneğin, 5.000 kullanıcı hedefi).
Hedef Kitle: Yazılım mimarı, geliştiriciler, QA.
İlişkiler: Teknik tasarıma dayanır, vizyon dokümanındaki kullanıcı hedeflerini destekler.
Durum: Henüz hazırlanmadı; teknik tasarımdan sonra önerilir.

2.9. Test Planı Dokümanı (09-test-plani-dokumani.md)

Amaç: Uygulamanın kalitesini doğrulamak için test stratejisini ve senaryolarını tanımlamak.
Kapsam: Fonksiyonel, entegrasyon, kullanıcı kabul ve performans testleri.
Hedef Kitle: QA ekibi, geliştiriciler, PO.
İlişkiler: Fonksiyonel gereksinimlere, teknik tasarıma ve performans planına dayanır.
Durum: Henüz hazırlanmadı; teknik tasarım ve performans planı tamamlandıktan sonra hazırlanır.

2.10. Sprint Planı Dokümanı (11-sprint-plani-dokumani.md)

Amaç: Geliştirme sürecinde iki haftalık sprintlerin içeriklerini (backlog, görevler, öncelikler) ve planlama sürecini tanımlamak; Lovable.dev gibi araçlarla çalışırken net görev yönlendirmeleri sağlamak, tüm dokümanların tamamlanmasından sonra geliştirme için kılavuz oluşturmak.
Kapsam: Sprint backlog’u, kullanıcı hikayelerinin sprintlere atanması, sprint planlama toplantılarının yapısı, görevlerin fonksiyonel gereksinimlere, teknik tasarıma ve UX/UI’ye bağlantıları, risk azaltma stratejilerinin sprintlere entegrasyonu.
Hedef Kitle: PO, proje yöneticisi, geliştiriciler, yazılım mimarı.
İlişkiler: Proje yönetim planındaki sprint çerçevesine, fonksiyonel gereksinimlere (04), teknik tasarıma (07), UX/UI’ye (06) ve risk yönetim planına (03) dayanır.
Durum: Henüz hazırlanmadı; tüm dokümanlar tamamlandıktan sonra hazırlanması önerilir.

2.11. Kullanıcı Kılavuzu (12-kullanici-kilavuzu.md)

Amaç: Son kullanıcıların uygulamayı nasıl kullanacağını açıklamak.
Kapsam: Özelliklerin kullanımı, sıkça sorulan sorular, sorun giderme rehberi.
Hedef Kitle: Bireysel kullanıcılar.
İlişkiler: Fonksiyonel gereksinimlere ve UX/UI’ye dayanır.
Durum: Henüz hazırlanmadı; uygulama teslimine yakın hazırlanır.

3. Dokümantasyon Süreci
3.1. Hazırlanma Sırası
Dokümanlar, içerik bağımlılıklarına ve karar alma sürecine göre aşağıdaki sırayla hazırlanır:

Vizyon ve Kapsam Dokümanı: Tamamlandı, tüm kararlar için temel.
Proje Yönetim Planı: Tamamlandı, süreci koordine eder.
Risk Yönetim Planı: Erken risk tanımları için bir sonraki adım.
Fonksiyonel Gereksinimler Dokümanı:
Ana doküman: İlk taslak hazır, geri bildirimle finalize edilecek.
Alt modüller: Kategori (04-02) ve bütçe (04-04) tamamlandı; nakit hesaplar (04-03) bütçe eşleştirme netleştirmesi bekliyor; bildirimler (04-05), kredi kartı (04-06), yatırım hesapları (04-07) planlanıyor.


Veri Gizliliği ve Güvenlik Politikası: Fonksiyonel gereksinimlerden sonra.
UX/UI Tasarım Dokümanı: Fonksiyonel gereksinimlerle paralel.
Teknik Tasarım Dokümanı: Fonksiyonel gereksinimler, veri gizliliği ve UX/UI tamamlandıktan sonra.
Performans ve Ölçeklenebilirlik Planı: Teknik tasarımdan sonra.
Test Planı Dokümanı: Gereksinimler ve tasarımlar tamamlandıktan sonra.
Sprint Planı Dokümanı: Tüm dokümanlar tamamlandıktan sonra.
Kullanıcı Kılavuzu: Uygulama teslimine yakın.

3.2. Güncelleme ve Versiyon Kontrolü

Dokümanlar, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde yönetilir.
Her değişiklik, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında Ürün Sahibi, dokümanların güncelliğini kontrol eder.

3.3. Modüler Yaklaşım

Her doküman, belirli bir amaca odaklanır ve bağımsızdır, ancak birbiriyle bağlantılıdır.
Fonksiyonel gereksinimler, alt modüllere (04-02, 04-03, vb.) ayrılarak yönetilir.
Teknik detaylar, fonksiyonel gereksinimlerden ayrı bir teknik tasarım dokümanında (07) ele alınır.

4. Öneriler

Risk Yönetim Planını Hemen Başlat:
Erken risk tanımları, fonksiyonel gereksinimlerin finalize edilmesini ve teknik tasarımı destekler.
Örnek riskler: Modüler yapının karmaşıklaşması, performans sorunları, bütçe eşleştirme mantık hataları.


Fonksiyonel Gereksinimleri Finalize Et:
04 ana dokümanı geri bildirimlerle tamamlanmalı.
04-03’teki bütçe eşleştirme netleştirilmeli.
04-05 (bildirimler) taslağı bir sonraki adım olarak önerilir.


UX/UI Tasarımına Paralel Başla:
04-02, 04-03, 04-04’teki formlar, kartlar ve görselleştirmeler için wireframe’ler geliştirme öncesi netlik sağlar.


Diğer Hesap Türlerini Planla:
Kredi kartı (04-06) ve yatırım hesapları (04-07) için öncelik sırası belirlenmeli.



5. Sonraki Adımlar

Kısa Vadeli (Mayıs 2025):
Bu dokümanın onayı: Ürün Sahibi’nin yorumları ve onayı.
03-risk-yonetim-plani.md: Taslak hazırlanacak.
04-fonksiyonel-gereksinimler-dokumani.md: Geri bildirimlerle finalize edilecek.
04-03: Bütçe eşleştirme netleştirilip GitHub’a yüklenecek.
04-05: Bildirim modülü taslağı başlatılabilir (isteğe bağlı).


Orta Vadeli (Haziran 2025):
05-veri-gizliligi-ve-guvenlik-politikasi.md: Veri koruma tanımları.
06-ux-ui-tasarim-dokumani.md: Wireframe ve mockup’lar.
04-06, 04-07: Kredi kartı ve yatırım hesapları taslakları.


Uzun Vadeli (Temmuz 2025 ve sonrası):
07-teknik-tasarim-dokumani.md: Sistem mimarisi ve API’ler.
08, 09, 11, 12: Bağımlılıklar tamamlandıkça hazırlanacak.



GitHub Yükleme: Dokümanlar, Ürün Sahibi tarafından https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresine numaralandırılmış isimlerle yüklenecek.
Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
