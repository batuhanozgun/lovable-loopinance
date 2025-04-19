Loopinance Dokümantasyonun Dokümantasyonu
1. Giriş
1.1. Amaç
Bu doküman, Loopinance kişisel finans yönetimi uygulamasının geliştirme süreci için gerekli tüm dokümantasyon yapısını tanımlamayı amaçlar. Her dokümanın amacı, kapsamı, hedef kitlesi ve diğer dokümanlarla ilişkisi açıklanarak, paydaşların projenin dokümantasyon ihtiyaçlarını anlaması sağlanır. Modüler bir yaklaşımla, dokümanların hazırlanma sırası ve güncelleme süreci tanımlanır.
1.2. Kapsam
Doküman, Loopinance’ın vizyonundan teslimine kadar tüm geliştirme sürecini destekleyen dokümanları kapsar. Odak, bireysel kullanıcıların ihtiyaçlarına yönelik ilk sürüm özelliklerdir (çoklu döviz desteği, ekstre bazlı hesap yönetimi, bütçe ve gerçekleşen veri entegrasyonu). KOBİ odaklı özellikler bu aşamada kapsam dışıdır.
1.3. Hedef Kitle

Ürün Sahibi (PO): Dokümanların önceliklendirilmesi ve onaylanması.
Yazılım Mimarı: Teknik tasarım ve mimari kararlar.
Geliştiriciler: Kod geliştirme ve uygulama.
UX/UI Tasarımcıları: Kullanıcı arayüzü ve deneyimi tasarımı.
QA Ekibi: Test senaryoları ve kalite güvence.

1.4. Güncelleme Süreci

Dokümanlar, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde versiyon kontrollü şekilde yönetilecektir.
Her değişiklik, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında Ürün Sahibi tarafından gözden geçirilir.

Son Güncelleme: 19 Nisan 2025, Sorumlu: [Kullanıcı Adı]
2. Dokümantasyon Yapısı
Loopinance’ın geliştirme süreci için aşağıdaki dokümanlar tanımlanmıştır. Her dokümanın amacı, kapsamı ve diğer dokümanlarla ilişkisi açıklanmıştır. Modüler bir yaklaşımla, dokümanlar bağımsız ancak birbiriyle bağlantılıdır. Dosya isimleri, yönetim kolaylığı için numaralandırılmıştır.
2.1. Vizyon ve Kapsam Dokümanı (01-vizyon-ve-kapsam-dokumani.md)

Amaç: Projenin vizyonunu, misyonunu ve temel hedeflerini tanımlamak; paydaşlar için ortak bir referans oluşturmak.
Kapsam: Uygulamanın çözdüğü problemler, ilk sürüm özellikleri, kapsam dışı unsurlar, başarı kriterleri.
Hedef Kitle: Tüm paydaşlar.
İlişkiler: Tüm dokümanlar için temel referans.
Durum: Tamamlandı.

2.2. Proje Yönetim Planı (02-proje-yonetim-plani.md)

Amaç: Geliştirme sürecinin aşamalarını, kilometre taşlarını ve görev sıralarını tanımlamak; adım adım ilerlemeyi sağlamak.
Kapsam: Proje aşamaları, kilometre taşları, görev dağılımları, risk analizi.
Hedef Kitle: PO, proje yöneticisi, geliştiriciler.
İlişkiler: Vizyon dokümanına dayanır, diğer dokümanların hazırlanmasını koordine eder.
Durum: Henüz hazırlanmadı; fonksiyonel gereksinimlerle paralel geliştirilebilir.

2.3. Risk Yönetim Planı (03-risk-yonetim-plani.md)

Amaç: Projedeki potansiyel riskleri tanımlamak ve azaltma stratejileri geliştirmek.
Kapsam: Risk tanımları, olasılık ve etki analizleri, azaltma planları, acil durum senaryoları (örneğin, banka API entegrasyon sorunları).
Hedef Kitle: PO, proje yöneticisi, geliştiriciler.
İlişkiler: Proje yönetim planına dayanır, vizyon dokümanındaki hedefleri destekler.
Durum: Henüz hazırlanmadı; proje yönetim planından sonra önerilir.

2.4. Fonksiyonel Gereksinimler Dokümanı (04-fonksiyonel-gereksinimler-dokumani.md)

Amaç: Uygulamanın kullanıcı odaklı işlevlerini tanımlamak; geliştirme ve test için rehber sağlamak.
Kapsam: Kullanıcı rolleri (bireysel kullanıcılar), kullanıcı hikayeleri, fonksiyonel gereksinimler, kullanım senaryoları, kısıtlamalar. Teknik detaylar hariç.
Hedef Kitle: PO, geliştiriciler, UX/UI tasarımcıları, QA.
İlişkiler: Vizyon dokümanına dayanır, teknik tasarım ve UX/UI için temel oluşturur.
Durum: İlk taslak (kullanıcı hikayeleri) hazırlandı, geri bildirim bekleniyor.

2.5. Veri Gizliliği ve Güvenlik Politikası (05-veri-gizliligi-ve-guvenlik-politikasi.md)

Amaç: Kullanıcı verilerinin korunmasını ve yasal uyumluluğu (örneğin, GDPR) sağlamak.
Kapsam: Veri şifreleme, erişim kontrolleri, uyumluluk gereksinimleri, güvenlik denetimleri.
Hedef Kitle: Yazılım mimarı, geliştiriciler, QA, PO.
İlişkiler: Fonksiyonel gereksinimlere dayanır, teknik tasarıma rehber olur.
Durum: Henüz hazırlanmadı; fonksiyonel gereksinimlerden sonra önerilir.

2.6. UX/UI Tasarım Dokümanı (06-ux-ui-tasarim-dokumani.md)

Amaç: Kullanıcı arayüzü ve deneyimini tanımlamak; tasarımcılar ve geliştiriciler için rehber sağlamak.
Kapsam: Wireframe’ler, mockup’lar, kullanıcı akışları, tasarım ilkeleri.
Hedef Kitle: UX/UI tasarımcıları, geliştiriciler, PO.
İlişkiler: Fonksiyonel gereksinimlere dayanır, teknik tasarımla uyumlu olmalıdır.
Durum: Henüz hazırlanmadı; fonksiyonel gereksinimlerle paralel geliştirilebilir.

2.7. Teknik Tasarım Dokümanı (07-teknik-tasarim-dokumani.md)

Amaç: Uygulamanın teknik uygulamasını tanımlamak; geliştirme ekibi için rehber sağlamak.
Kapsam: Sistem mimarisi, API entegrasyonları, veri akışları, güvenlik protokolleri.
Hedef Kitle: Yazılım mimarı, geliştiriciler, QA.
İlişkiler: Fonksiyonel gereksinimlere, UX/UI’ye ve veri gizliliği politikasına dayanır.
Durum: Henüz hazırlanmadı; fonksiyonel gereksinimler ve veri gizliliği tamamlandıktan sonra önerilir.

2.8. Performans ve Ölçeklenebilirlik Planı (08-performans-ve-olceklenebilirlik-plani.md)

Amaç: Uygulamanın performans hedeflerini ve ölçeklenebilirlik stratejilerini tanımlamak.
Kapsam: Performans kriterleri, yük testi senaryoları, altyapı ölçeklendirme planları (örneğin, 1.000 kullanıcı hedefi).
Hedef Kitle: Yazılım mimarı, geliştiriciler, QA.
İlişkiler: Teknik tasarıma dayanır, vizyon dokümanındaki kullanıcı hedeflerini destekler.
Durum: Henüz hazırlanmadı; teknik tasarımdan sonra önerilir.

2.9. Test Planı Dokümanı (09-test-plani-dokumani.md)

Amaç: Uygulamanın kalitesini doğrulamak için test stratejisini ve senaryolarını tanımlamak.
Kapsam: Fonksiyonel, entegrasyon, kullanıcı kabul ve performans testleri.
Hedef Kitle: QA ekibi, geliştiriciler, PO.
İlişkiler: Fonksiyonel gereksinimlere, teknik tasarıma ve performans planına dayanır.
Durum: Henüz hazırlanmadı; teknik tasarım ve performans planı tamamlandıktan sonra hazırlanır.

2.10. Kullanıcı Kılavuzu (10-kullanici-kilavuzu.md)

Amaç: Son kullanıcıların uygulamayı nasıl kullanacağını açıklamak.
Kapsam: Özelliklerin kullanımı, sıkça sorulan sorular, sorun giderme rehberi.
Hedef Kitle: Bireysel kullanıcılar.
İlişkiler: Fonksiyonel gereksinimlere ve UX/UI’ye dayanır.
Durum: Henüz hazırlanmadı; uygulama teslimine yakın hazırlanır.

3. Dokümantasyon Süreci
3.1. Hazırlanma Sırası
Dokümanlar, içerik bağımlılıklarına ve karar alma sürecine göre aşağıdaki sırayla hazırlanır:

Vizyon ve Kapsam Dokümanı: Projenin hedeflerini ve kapsamını tanımlar, tüm kararlar için temel.
Proje Yönetim Planı: Geliştirme sürecini koordine eder, görev sıralarını belirler.
Risk Yönetim Planı: Riskleri erken tanımlamak için proje planından sonra gelir.
Fonksiyonel Gereksinimler Dokümanı: Kullanıcı ihtiyaçlarını detaylandırır, tasarım ve test için temel oluşturur.
Veri Gizliliği ve Güvenlik Politikası: Veri korumasını tanımlar, teknik tasarımdan önce gelir.
UX/UI Tasarım Dokümanı: Kullanıcı deneyimini şekillendirir, fonksiyonel gereksinimlerle paralel hazırlanır.
Teknik Tasarım Dokümanı: Sistem uygulamasını detaylandırır, fonksiyonel gereksinimlere, UX/UI’ye ve güvenlik politikasına dayanır.
Performans ve Ölçeklenebilirlik Planı: Performans ve ölçeklenebilirlik ihtiyaçlarını tanımlar, teknik tasarımdan sonra gelir.
Test Planı Dokümanı: Gereksinimleri ve tasarımı doğrular, diğer dokümanlar tamamlandıktan sonra hazırlanır.
Kullanıcı Kılavuzu: Son kullanıcıya yöneliktir, uygulama teslimine yakın hazırlanır.

3.2. Güncelleme ve Versiyon Kontrolü

Dokümanlar, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde yönetilir.
Her değişiklik, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında Ürün Sahibi, dokümanların güncelliğini kontrol eder.

3.3. Modüler Yaklaşım

Her doküman, belirli bir amaca odaklanır ve bağımsızdır, ancak birbiriyle bağlantılıdır.
Teknik detaylar, fonksiyonel gereksinimler dokümanından ayrı bir teknik tasarım dokümanında ele alınır.
Modüler yapı, dokümanların yönetilmesini ve paydaşlar tarafından anlaşılmasını kolaylaştırır.

4. Öneriler

Öneri 1: Proje yönetim planı ve risk yönetim planı, fonksiyonel gereksinimlerle paralel hazırlanarak erken aşamada riskler ve süreç koordine edilmelidir.
Öneri 2: Veri gizliliği ve güvenlik politikası, fonksiyonel gereksinimlerden hemen sonra tamamlanarak teknik tasarım için sağlam bir temel oluşturulmalıdır.
Öneri 3: Dokümanlar, docs klasöründe numaralandırılmış isimlerle (örneğin, 01-vizyon-ve-kapsam-dokumani.md) düzenlenmelidir.

5. Sonraki Adımlar

Bu Dokümanın Onayı: Ürün Sahibi’nin yorumları ve onayı bekleniyor. Onay alındıktan sonra fonksiyonel gereksinimler dokümanına devam edilecek.
Fonksiyonel Gereksinimler Dokümanı: Kullanıcı hikayeleri taslağı (19 Nisan 2025) hazır, bu doküman finalize edildikten sonra geri bildirim alınacak.
GitHub Yükleme: Dokümanlar, Ürün Sahibi tarafından https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresine numaralandırılmış isimlerle yüklenecek.

Son Güncelleme: 19 Nisan 2025, Sorumlu: [Kullanıcı Adı]
