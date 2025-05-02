Loopinance Proje Yönetim Planı

1. Giriş

1.1. Amaç
Bu doküman, Loopinance kişisel finans yönetimi uygulamasının geliştirme sürecini koordine etmek için bir proje yönetim planı sunar. Proje aşamaları, kilometre taşları, görev dağılımları ve risk analizi tanımlanarak, vizyon dokümanındaki hedeflere ulaşmak için metodolojik bir çerçeve sağlanır.

1.2. Kapsam
Doküman, Loopinance’ın ilk sürümünün geliştirilmesini kapsar. Odak, bireysel kullanıcıların ihtiyaçlarına yönelik özelliklerdir:

Çoklu döviz desteği.
Ekstre bazlı hesap yönetimi.
Planlanan ve gerçekleşen bütçe entegrasyonu.
Kategori/alt kategori yönetimi.
Modüler hesap yönetimi (her hesabın bağımsız modül olarak çalışması).
Ön yüzde obje yönetimini kolaylaştıracak bir yapı (örneğin, komponent kütüphanesi veya playground).Kapsam dışı unsurlar: banka API entegrasyonları, KOBİ odaklı özellikler, belirli kullanıcı sayısı hedefleri.

1.3. Hedef Kitle

Ürün Sahibi (PO): Proje önceliklerini ve ilerlemeyi denetler.
Proje Yöneticisi: Görev koordinasyonunu sağlar.
Geliştiriciler: Teknik görevleri uygular.
UX/UI Tasarımcıları: Kullanıcı deneyimi tasarlar.
QA Ekibi: Kalite kontrolünü gerçekleştirir.

1.4. Güncelleme Süreci

Doküman, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde yönetilir.
Değişiklikler, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında Ürün Sahibi tarafından gözden geçirilir.

Son Güncelleme: 19 Nisan 2025, Sorumlu: batuhanozgun

2. Proje Genel Bakış

2.1. Proje Hedefleri
Vizyon dokümanına dayalı olarak:

İlk Sürüm (0 Ay): Çoklu döviz desteği, ekstre bazlı hesap yönetimi, bütçe entegrasyonu, kategori/alt kategori yönetimi ve modüler hesap yönetimi içeren bir MVP teslim etmek; ön yüzde obje yönetimini kolaylaştıracak bir komponent kütüphanesi veya playground oluşturmak.
Sonraki Sürümler: Kullanıcı geri bildirimlerine göre yeni özellikler eklemek (örneğin, gelişmiş analiz araçları).

2.2. Başarı Kriterleri

İlk sürüm özelliklerinin eksiksiz ve hatasız teslim edilmesi.
Her hesabın bağımsız modül olarak sorunsuz çalışması.
Ön yüzde obje yönetiminin (komponentler, stiller) merkezi bir kütüphane veya playground ile kolaylaştırılması.
Kullanıcı geri bildirimlerine göre %80 memnuniyet oranı.

3. Proje Aşamaları

3.1. Analiz Aşaması

Amaç: Proje kapsamını netleştirmek, gereksinimleri tanımlamak.
Görevler:
Vizyon dokümanını paydaşlarla gözden geçirme.
Fonksiyonel gereksinimler dokümanını hazırlama (04-fonksiyonel-gereksinimler-dokumani.md).
Modüler hesap yönetiminin sınırlarını tanımlama (her hesabın bağımsız modül yapısı, 07-teknik-tasarim-dokumani.md’de detaylandırılacak).
Risk yönetim planını taslak olarak oluşturma (03-risk-yonetim-plani.md).


Sorumlular: PO, proje yöneticisi.
Süreç: Sprint planlamasıyla paralel, yinelemeli geri bildirim döngüleri.
Çıktılar:
Fonksiyonel gereksinimler taslağı: Kullanıcı hikayeleri ve kullanım senaryolarının üst düzey tanımları (04-fonksiyonel-gereksinimler-dokumani.md’de detaylandırılacak, örneğin, “Kullanıcı, hazır kategori şablonlarını içe aktarabilmeli”).
Modül sınırları taslağı: Her hesabın bağımsız modül olarak nasıl çalışacağına dair üst düzey tanım (07-teknik-tasarim-dokumani.md’de veri modelleri ve dosya yapısı olarak detaylandırılacak, kısmen 04-fonksiyonel-gereksinimler-dokumani.md’ye fonksiyonel yönleriyle yansıyacak).
Risk yönetim planı taslağı: Proje risklerinin üst düzey tanımları (03-risk-yonetim-plani.md’de olasılık, etki ve azaltma stratejileriyle detaylandırılacak).



3.2. Tasarım Aşaması

Amaç: Kullanıcı deneyimini ve teknik altyapıyı tasarlamak.
Görevler:
UX/UI tasarım dokümanını hazırlama (06-ux-ui-tasarim-dokumani.md, örneğin, özet ekran wireframe’leri, kategori seçme akışı).
Ön yüzde obje yönetimini kolaylaştıracak bir yapı tasarlama (örneğin, Storybook benzeri bir komponent kütüphanesi veya playground, 06-ux-ui-tasarim-dokumani.md ve 07-teknik-tasarim-dokumani.md’de detaylandırılacak).
Veri gizliliği ve güvenlik politikasını tanımlama.
Teknik tasarım dokümanını taslak olarak oluşturma (modüler hesap yapıları, kategori kütüphanesi, 07-teknik-tasarim-dokumani.md).


Sorumlular: UX/UI tasarımcıları, yazılım mimarı, PO.
Süreç: Paralel tasarım sprintleri, prototip testleri.
Çıktılar: Wireframe’ler, komponent kütüphanesi taslağı, güvenlik politikası, teknik tasarım taslağı.

3.3. Geliştirme Aşaması

Amaç: Uygulamanın ilk sürümünü kodlamak ve entegre etmek.
Görevler:
Çoklu döviz desteği geliştirme.
Ekstre bazlı hesap yönetimi modülünü kodlama (her hesabın bağımsız modül olarak çalışması).
Bütçe entegrasyonu özelliğini uygulama (hesaplarla bağlantılı bütçe kalemleri).
Kategori/alt kategori yönetimi geliştirme (hazır şablonlar, içe aktarma işlevi).
Ön yüzde komponent kütüphanesi veya playground geliştirme (objelerin merkezi yönetimi, değişikliklerin görselleştirilmesi).
Performans ve ölçeklenebilirlik planını taslak olarak oluşturma.


Sorumlular: Geliştiriciler, yazılım mimarı.
Süreç: Agile geliştirme, iki haftalık sprintlerle ilerlenecek. Sprint içerikleri (backlog, görevler, öncelikler), dokümantasyon tamamlandıktan sonra hazırlanacak ve bir sprint backlog’unda (örneğin, sprint-backlog.md veya GitHub Issues) belgelenerek yönetilecek. Her sprint, belirli bir özelliği veya modülü teslim etmeye odaklanacak (örneğin, Sprint 1: Çoklu döviz desteği, Sprint 2: Kategori yönetimi). Sprint planlama toplantılarında, 04-fonksiyonel-gereksinimler-dokumani.md’deki kullanıcı hikayeleri önceliklendirilecek, 07-teknik-tasarim-dokumani.md’den modül sınırları ve 06-ux-ui-tasarim-dokumani.md’den UI akışları referans alınacak. Lovable.dev ile çalışırken, her görev için ilgili dokümanlar (04, 06, 07) ve sprint backlog’u referans olarak kullanılacak.
Çıktılar: Çalışan MVP, komponent kütüphanesi, performans planı taslağı.

3.4. Test Aşaması

Amaç: Uygulamanın kalitesini doğrulamak.
Görevler:
Test planı dokümanını hazırlama.
Fonksiyonel, entegrasyon ve performans testlerini yürütme (modüllerin bağımsız çalıştığının doğrulanması).
Komponent kütüphanesi veya playground’un kullanılabilirlik testlerini gerçekleştirme.
Kullanıcı kabul testlerini gerçekleştirme.


Sorumlular: QA ekibi, geliştiriciler.
Süreç: Otomatik ve manuel testler, hata düzeltme döngüleri.
Çıktılar: Test raporları, onaylanmış MVP.

3.5. Teslim ve Lansman Aşaması

Amaç: Uygulamayı kullanıcılara sunmak ve ilk geri bildirimleri toplamak.
Görevler:
Kullanıcı kılavuzunu hazırlama (kategori yönetimi, bütçe planlama, obje yönetimi kullanımı).
Uygulamayı üretim ortamına dağıtma.
Kullanıcı geri bildirimlerini toplama ve analiz etme.


Sorumlular: PO, geliştiriciler, QA.
Süreç: Lansman öncesi son kontroller, geri bildirim döngüsü.
Çıktılar: Canlı uygulama, kullanıcı kılavuzu, geri bildirim raporu.

4. Kilometre Taşları

Kilometre Taşı 1: Analiz tamamlandı, fonksiyonel gereksinimler taslağı (04-fonksiyonel-gereksinimler-dokumani.md), modül sınırları taslağı (07-teknik-tasarim-dokumani.md) ve risk yönetim planı taslağı (03-risk-yonetim-plani.md) onaylandı.
Kilometre Taşı 2: Tasarım tamamlandı, UX/UI wireframe’leri, komponent kütüphanesi taslağı ve teknik tasarım taslağı onaylandı.
Kilometre Taşı 3: MVP geliştirildi, temel özellikler (çoklu döviz, ekstre yönetimi, bütçe entegrasyonu, kategori yönetimi) ve komponent kütüphanesi çalışır durumda.
Kilometre Taşı 4: Testler tamamlandı, MVP ve komponent kütüphanesi kullanıcı kabul testlerini geçti.
Kilometre Taşı 5: Uygulama lansmanı yapıldı, geri bildirim toplama başladı.

5. Görev Dağılımları

Ürün Sahibi: Vizyonun uygulanmasını denetler, gereksinimleri önceliklendirir, geri bildirimleri değerlendirir.
Proje Yöneticisi: Sprintleri koordine eder, ilerlemeyi izler, paydaşlar arası iletişimi sağlar.
Yazılım Mimarı: Teknik tasarımı yönlendirir, modüler yapıyı ve komponent kütüphanesini denetler.
Geliştiriciler: Kod geliştirir, hata düzeltmeleri yapar, komponent kütüphanesini uygular.
UX/UI Tasarımcıları: Kullanıcı arayüzü, akışlar ve playground tasarımlarını hazırlar.
QA Ekibi: Test senaryolarını hazırlar, kalite kontrolünü gerçekleştirir.

6. Risk Analizi

Risk 1: Modüler Yapının Karmaşıklaşması
Olasılık: Orta
Etki: Yüksek
Azaltma: Modül sınırlarının analiz aşamasında net tanımlanması (07-teknik-tasarim-dokumani.md), her modül için ayrı test senaryoları hazırlanması.


Risk 2: Ön Yüzde Obje Yönetimi Zorlukları
Olasılık: Orta
Etki: Orta
Azaltma: Komponent kütüphanesi veya playground’un tasarım aşamasında prototiplenmesi (06-ux-ui-tasarim-dokumani.md), geliştirme sırasında kullanılabilirlik testleri.


Risk 3: Kullanıcı Verilerinin Güvenliği
Olasılık: Düşük
Etki: Çok Yüksek
Azaltma: Veri gizliliği ve güvenlik politikasını erken tanımlama, şifreleme standartlarını uygulama.


Risk 4: Geliştirme Gecikmeleri
Olasılık: Orta
Etki: Orta
Azaltma: Agile sprintlerle sık ilerleme kontrolü, görev önceliklendirmesi.



7. İletişim Planı

Sprint Toplantıları: İki haftada bir, tüm paydaşlarla ilerleme gözden geçirme.
Durum Raporları: Haftalık, proje yöneticisi tarafından hazırlanır, GitHub Wiki’ye yüklenir.
Geri Bildirim Kanalı: PO ve paydaşlar için Slack veya e-posta üzerinden açık iletişim.

8. Öneriler

Öneri 1: Analiz aşamasında, modül sınırlarını netleştirmek için bir modül haritası hazırlanmalı (07-teknik-tasarim-dokumani.md’de detaylandırılacak).
Öneri 2: Tasarım aşamasında, komponent kütüphanesi için bir prototip (örneğin, Storybook) geliştirilmeli ve paydaşlarla test edilmeli (06-ux-ui-tasarim-dokumani.md).
Öneri 3: Geliştirme aşamasında, her modülün bağımsız çalıştığını doğrulamak için birim testleri önceliklendirilmeli.
Öneri 4: Risk analizi, risk yönetim planı dokümanıyla detaylandırılmalı (03-risk-yonetim-plani.md).

9. Sonraki Adımlar

Bu Dokümanın Onayı: Ürün Sahibi’nin yorumları ve onayı bekleniyor.
Risk Yönetim Planı: Bir sonraki doküman olarak hazırlanacak (03-risk-yonetim-plani.md).
Sprint Planlama: Dokümantasyon tamamlandıktan sonra, sprint içerikleri bir sprint backlog’unda (örneğin, sprint-backlog.md veya GitHub Issues) hazırlanacak ve sprint planlama toplantılarıyla yönetilecek.
GitHub Yükleme: Doküman, Ürün Sahibi tarafından https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresine yüklenecek.

Son Güncelleme: 19 Nisan 2025, Sorumlu: batuhanozgun
