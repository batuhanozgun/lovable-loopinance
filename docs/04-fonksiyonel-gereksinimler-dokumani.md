Loopinance Fonksiyonel Gereksinimler: Genel
Bu doküman, Loopinance kişisel finans yönetimi uygulamasının fonksiyonel gereksinimlerine genel bir bakış sunar ve modül-spesifik gereksinimlere bağlantılar içerir. Modül detayları için aşağıdaki dokümanlara bakınız:

04-01-fonksiyonel-gereksinimler-ana-sayfa-ve-kayit.md
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md
04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md
04-04-fonksiyonel-gereksinimler-butce-planlama.md

1. Giriş
1.1. Amaç
Bu doküman, Loopinance kişisel finans yönetimi uygulamasının kullanıcı odaklı işlevlerini tanımlamayı amaçlar. Kullanıcıların uygulamayla nasıl etkileşime gireceğini, hangi özellikleri kullanacağını ve bu özelliklerin kabul kriterlerini belirtir. Teknik detaylara girmeden, bireysel kullanıcıların ihtiyaçlarına odaklanır.
1.2. Kapsam
İlk sürüm, bireysel kullanıcılar için kişisel finans yönetimi özelliklerini kapsar: hesap yönetimi, kategori/alt kategori yönetimi, işlem girişi, bütçe planlama, ekstre yönetimi, çoklu döviz desteği ve analiz/raporlama. KOBİ odaklı özellikler ve banka API entegrasyonları kapsam dışıdır. Uygulama, 6 aylık deneme süresi sunar; deneme sonrası temel fonksiyonlar kilitlenir, kullanıcılar aylık/yıllık ödeme planı seçer. Bütçe ve gerçek işlemlerin entegrasyonu, bir yıllık finansal öngörüyle uygulamanın temel değer önerilerinden biridir.
1.3. Hedef Kitle

Ürün Sahibi (PO): Gereksinimleri onaylar.
Proje Yöneticisi: Geliştirme sürecini koordine eder.
Yazılım Mimarı: Teknik tasarımı gereksinimlere göre şekillendirir.
Geliştiriciler: Özellikleri uygular.
UX/UI Tasarımcıları: Kullanıcı arayüzünü tasarlar.
QA Ekibi: Gereksinimlere göre testleri yürütür.

1.4. Güncelleme Süreci

Doküman, GitHub Wiki üzerinden Markdown formatında, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresinde versiyon kontrollü yönetilir.
Her değişiklik, tarih ve sorumlu ile kayıt altına alınır.
Sprint başında PO tarafından gözden geçirilir.
Her güncelleme sonrası ilgili dokümanlar paylaşılır.

Son Güncelleme: 26 Nisan 2025, Sorumlu: batuhanozgun
2. Kullanıcı Rolleri

Bireysel Kullanıcı: Finanslarını takip etmek isteyen bireyler. Hesap oluşturur, işlem girer, düzenler/siler, bütçe planlar, kategori yönetir, ekstre ve raporları görüntüler.
Admin: Kategori şablonlarını veri tabanında yönetir (ekler, siler, düzenler).

4. Kısıtlamalar

İlk sürümde sadece bireysel kullanıcılar desteklenir, KOBİ özellikleri kapsam dışı.
Banka API entegrasyonları ilk sürümde yer almaz.
Nakit hesaplar eksi bakiyeye düşemez, işlem girme ve düzenleme/silme sırasında kontrol edilir.
6 ay deneme süresi sonrası temel fonksiyonlar (işlem girme, hesap yaratma, bütçe planlama, ekstre, raporlar) kilitlenir, detaylar sonraki hikayelerde netleşir.

5. İlişkiler

Vizyon ve Kapsam Dokümanı (01): Uygulamanın genel hedefleri ve kapsamı.
Risk Yönetim Planı (03): Performans riskleri (örneğin, ekstre hesaplama süreleri), modülerlik riskleri (örneğin, Lovable.dev’in yanlış dosya değişiklikleri), geçmiş CRUD sorunları.
Veri Gizliliği ve Güvenlik Politikası (05): Kullanıcı kaydı/giriş için güvenlik gereksinimleri.
UX/UI Tasarım Dokümanı (06): Ana sayfa, wizard, formlar, modal, kart, liste, akordiyon, bildirim, diyalog ve hiyerarşi tasarımları.
Teknik Tasarım Dokümanı (07): Modüler yapı, veri tabanı tasarımı, Supabase entegrasyonu.

6. Sonraki Adımlar

Kullanıcı Hikâyesi Devamı: Bütçe kalemi girme, bütçe kalemlerinin ekstre yansımaları, çoklu döviz desteği, Banka Hesabı Yönetimi, Kredi Kartı Yönetimi, bildirim sayfası detayları, raporlama gibi süreçler anlatılacak. Fonksiyon listesi (hesap yaratma, ekstre oluşumu, işlem girme, ekstre kapanışı, bütçe planı yaratma, kalem girme, ekstre yansımaları) revize edilebilir.
Doküman Onayı: Ürün Sahibi tarafından onaylandı, hikâye devam ediyor.
GitHub Yükleme: Dokümanlar, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresine yüklenecek.

Son Güncelleme: 26 Nisan 2025, Sorumlu: batuhanozgun
