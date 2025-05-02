Loopinance Proje Yönetim Planı
Bu doküman, Loopinance kişisel finans yönetimi uygulamasının geliştirme sürecini koordine etmek için bir proje yönetim planı sunar. Proje aşamaları, kilometre taşları, görev dağılımları ve risk analizi tanımlanarak, vizyon dokümanındaki hedeflere ulaşmak için metodolojik bir çerçeve sağlanır.
1. Giriş
1.1. Amaç
Bu doküman, Loopinance projesinin geliştirme sürecini yönetmek, aşamalarını ve kilometre taşlarını belirlemek, görevleri dağıtmak ve riskleri analiz etmek için hazırlanmıştır. Vizyon dokümanındaki hedeflere ulaşmak için metodolojik bir çerçeve sağlar.
1.2. Kapsam
Doküman, Loopinance’ın ilk sürümünün geliştirilmesini kapsar. Odak, bireysel kullanıcıların ihtiyaçlarına yönelik özelliklerdir:

Çoklu döviz desteği.
Ekstre bazlı hesap yönetimi.
Planlanan ve gerçekleşen bütçe entegrasyonu.
Kategori/alt kategori yönetimi.
Modüler hesap yönetimi (her hesabın bağımsız modül olarak çalışması).
Ön yüzde obje yönetimini kolaylaştıracak bir yapı (örneğin, komponent kütüphanesi).

Kapsam Dışı Unsurlar: Banka API entegrasyonları, KOBİ odaklı özellikler.
1.3. Hedef Kitle

Ürün Sahibi (PO): Proje önceliklerini ve ilerlemeyi denetler.
Proje Yöneticisi: Görev koordinasyonunu sağlar.
Yazılım Mimarı: Teknik mimariyi yönetir.
Geliştiriciler: Teknik görevleri uygular.
UX/UI Tasarımcıları: Kullanıcı deneyimi tasarlar.
QA Ekibi: Kalite kontrolünü gerçekleştirir.

1.4. Güncelleme Süreci

Doküman, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde yönetilir.
Her değişiklik, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında Ürün Sahibi tarafından gözden geçirilir.

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
2. Proje Genel Bakış
2.1. Proje Hedefleri
Vizyon dokümanına dayalı olarak:

İlk Sürüm (0 Ay): Çoklu döviz desteği, ekstre bazlı hesap yönetimi, bütçe entegrasyonu, kategori/alt kategori yönetimi ve modüler hesap yönetimi içeren bir MVP teslim etmek.
Sonraki Sürümler: Kullanıcı geri bildirimlerine göre yeni özellikler eklemek (örneğin, gelişmiş analiz araçları).

2.2. Başarı Kriterleri

İlk sürüm özelliklerinin eksiksiz ve hatasız teslim edilmesi.
Her hesabın bağımsız modül olarak sorunsuz çalışması.
Kullanıcı geri bildirimlerine göre %80 memnuniyet oranı.

3. Proje Aşamaları
3.1. Analiz Aşaması

Amaç: Proje kapsamını netleştirmek, gereksinimleri tanımlamak.
Görevler:
Vizyon dokümanını paydaşlarla gözden geçirme.
Fonksiyonel gereksinimler dokümanını hazırlama (04-fonksiyonel-gereksinimler-dokumani.md).
Modüler hesap yönetiminin sınırlarını tanımlama.
Risk yönetim planını taslak olarak oluşturma (03-risk-yonetim-plani.md).


Sorumlular: PO, proje yöneticisi.
Çıktılar: Fonksiyonel gereksinimler taslağı, modül sınırları taslağı, risk yönetim planı taslağı.

3.2. Tasarım Aşaması

Amaç: Kullanıcı deneyimini ve teknik altyapıyı tasarlamak.
Görevler:
UX/UI tasarım dokümanını hazırlama (06-ux-ui-tasarim-dokumani.md).
Ön yüzde obje yönetimini kolaylaştıracak bir yapı tasarlama (örneğin, Storybook).
Veri gizliliği ve güvenlik politikasını tanımlama (05-veri-gizliligi-ve-guvenlik-politikasi.md).
Teknik tasarım dokümanını taslak olarak oluşturma (07-teknik-tasarim-dokumani.md).


Sorumlular: UX/UI tasarımcıları, yazılım mimarı, PO.
Çıktılar: Wireframe’ler, komponent kütüphanesi taslağı, güvenlik politikası, teknik tasarım taslağı.

3.3. Geliştirme Aşaması

Amaç: Uygulamanın ilk sürümünü kodlamak ve entegre etmek.
Görevler:
Çoklu döviz desteği geliştirme.
Ekstre bazlı hesap yönetimi modülünü kodlama.
Bütçe entegrasyonu özelliğini uygulama.
Kategori/alt kategori yönetimi geliştirme.
Ön yüzde komponent kütüphanesi veya playground geliştirme.
Performans ve ölçeklenebilirlik planını taslak olarak oluşturma (08-performans-ve-olceklenebilirlik-plani.md).


Sorumlular: Geliştiriciler, yazılım mimarı.
Çıktılar: Çalışan MVP, komponent kütüphanesi, performans planı taslağı.

3.4. Test Aşaması

Amaç: Uygulamanın kalitesini doğrulamak.
Görevler:
Test planı dokümanını hazırlama (09-test-plani-dokumani.md).
Fonksiyonel, entegrasyon ve performans testlerini yürütme.
Kullanıcı kabul testlerini gerçekleştirme.


Sorumlular: QA ekibi, geliştiriciler.
Çıktılar: Test raporları, onaylanmış MVP.

3.5. Teslim ve Lansman Aşaması

Amaç: Uygulamayı kullanıcılara sunmak ve ilk geri bildirimleri toplamak.
Görevler:
Kullanıcı kılavuzunu hazırlama (12-kullanici-kilavuzu.md).
Uygulamayı üretim ortamına dağıtma.
Kullanıcı geri bildirimlerini toplama ve analiz etme.


Sorumlular: PO, geliştiriciler, QA.
Çıktılar: Canlı uygulama, kullanıcı kılavuzu, geri bildirim raporu.

4. Kilometre Taşları

Kilometre Taşı 1: Analiz tamamlandı, fonksiyonel gereksinimler taslağı, modül sınırları taslağı ve risk yönetim planı taslağı onaylandı.
Kilometre Taşı 2: Tasarım tamamlandı, UX/UI wireframe’leri, komponent kütüphanesi taslağı ve teknik tasarım taslağı onaylandı.
Kilometre Taşı 3: MVP geliştirildi, temel özellikler ve komponent kütüphanesi çalışır durumda.
Kilometre Taşı 4: Testler tamamlandı, MVP kullanıcı kabul testlerini geçti.
Kilometre Taşı 5: Uygulama lansmanı yapıldı, geri bildirim toplama başladı.

5. Görev Dağılımları

Ürün Sahibi: Vizyonun uygulanmasını denetler, gereksinimleri önceliklendirir.
Proje Yöneticisi: Sprintleri koordine eder, ilerlemeyi izler.
Yazılım Mimarı: Teknik tasarımı yönlendirir, modüler yapıyı denetler.
Geliştiriciler: Kod geliştirir, hata düzeltmeleri yapar.
UX/UI Tasarımcıları: Kullanıcı arayüzü ve akışları hazırlar.
QA Ekibi: Test senaryolarını hazırlar, kalite kontrolünü gerçekleştirir.

6. Risk Analizi

Risk 1: Modüler Yapının Karmaşıklaşması
Olasılık: Orta
Etkisi: Yüksek
Azaltma: Modül sınırlarının analiz aşamasında net tanımlanması (07-teknik-tasarim-dokumani.md).


Risk 2: Ön Yüzde Obje Yönetimi Zorlukları
Olasılık: Orta
Etkisi: Orta
Azaltma: Komponent kütüphanesi prototiplemesi (06-ux-ui-tasarim-dokumani.md).


Risk 3: Kullanıcı Verilerinin Güvenliği
Olasılık: Düşük
Etkisi: Çok Yüksek
Azaltma: Veri gizliliği ve güvenlik politikasını erken tanımlama (05-veri-gizliligi-ve-guvenlik-politikasi.md).


Risk 4: Geliştirme Gecikmeleri
Olasılık: Orta
Etkisi: Orta
Azaltma: Agile sprintlerle sık ilerleme kontrolü.



7. İletişim Planı

Sprint Toplantıları: İki haftada bir, tüm paydaşlarla ilerleme gözden geçirme.
Durum Raporları: Haftalık, proje yöneticisi tarafından hazırlanır, GitHub Wiki’ye yüklenir.
Geri Bildirim Kanalı: PO ve paydaşlar için Slack veya e-posta üzerinden açık iletişim.

8. Öneriler

Öneri 1: Analiz aşamasında, modül sınırlarını netleştirmek için bir modül haritası hazırlanmalı (07-teknik-tasarim-dokumani.md).
Öneri 2: Tasarım aşamasında, komponent kütüphanesi için bir prototip (örneğin, Storybook) geliştirilmeli (06-ux-ui-tasarim-dokumani.md).
Öneri 3: Geliştirme aşamasında, her modülün bağımsız çalıştığını doğrulamak için birim testleri önceliklendirilmeli.
Öneri 4: Risk analizi, risk yönetim planı dokümanıyla detaylandırılmalı (03-risk-yonetim-plani.md).

9. Sonraki Adımlar

Bu Dokümanın Onayı: Ürün Sahibi’nin yorumları ve onayı bekleniyor.
Risk Yönetim Planı: Bir sonraki doküman olarak hazırlanacak (03-risk-yonetim-plani.md).
Sprint Planlama: Dokümantasyon tamamlandıktan sonra, sprint içerikleri bir sprint backlog’unda (örneğin, sprint-backlog.md veya GitHub Issues) hazırlanacak ve sprint planlama toplantılarıyla yönetilecek.
GitHub Yükleme: Doküman, Ürün Sahibi tarafından https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresine yüklenecek.

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
