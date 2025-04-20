Loopinance Fonksiyonel Gereksinimler Dokümanı
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

Son Güncelleme: 19 Nisan 2025, Sorumlu: batuhanozgun
2. Kullanıcı Rolleri

Bireysel Kullanıcı: Finanslarını takip etmek isteyen bireyler. Hesap oluşturur, işlem girer, bütçe planlar, kategori yönetir, ekstre ve raporları görüntüler.
Admin: Kategori şablonlarını veri tabanında yönetir (ekler, siler, düzenler).

3. Fonksiyonel Gereksinimler
3.1. Ana Sayfada Karşılama

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, uygulamayı açtığımda, deneme süresi bilgisi, nasıl kullanılır rehberi ve kayıt/giriş seçenekleri sunan dolu dolu bir ana sayfa görmeliyim ki uygulamayı kullanmaya motive olayım.
Kabul Kriterleri:
Ana sayfada deneme süresi (6 ay) bir section olarak gösterilir.
“Nasıl kullanılır” rehberi, ikonlarla bir section olarak sunulur.
Header’da detaylı “nasıl kullanılır” sayfasına bağlantı bulunur.
Kayıt/giriş seçenekleri (mail, Google, Apple) öne çıkar.
Ana sayfa, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Bağlantılar: UX/UI Tasarım Dokümanı (06) için tasarım detayları.

3.2. Kullanıcı Kaydı ve Giriş

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, mail adresimle veya Google/Apple hesabımla kolayca kayıt olup giriş yapabilmeliyim ki uygulamayı kullanmaya başlayayım.
Kabul Kriterleri:
Mail kaydı: Sadece mail adresi, şifre, şifre tekrarı, işlem <2 saniye.
Google/Apple ile giriş: Tek tıkla, ek bilgi olmadan, işlem <2 saniye.
Giriş formunda “Şifremi unuttum” bağlantısı bulunur, Supabase’in şifre sıfırlama akışıyla çalışır (örneğin, mail ile sıfırlama linki).
Hatalı girişte (örneğin, geçersiz mail, yanlış şifre) toast mesajı gösterilir, mesaj problemi açıkça belirtir (örneğin, “Geçersiz mail, tekrar deneyin”), mobil/desktop uyumlu.


Bağlantılar: Veri Gizliliği ve Güvenlik Politikası (05) için giriş güvenliği, Teknik Tasarım Dokümanı (07) için Supabase entegrasyonu.

3.3. Karşılama Sayfası (Wizard)

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ilk girişte bir wizard ile yönlendirilmeliyim ki deneme sürecini ve uygulamayı nasıl kullanacağımı öğreneyim.
Kabul Kriterleri:
Wizard, modal olarak açılır, “bir daha karşıma çıkma” seçeneği sunar.
Adımlar: Deneme süresi (6 ay), kategori oluşturma, hesap oluşturma, bütçe oluşturma.
Her adım, açıklayıcı metin içerir, geçiş <1 saniye.
Wizard, mobil ve masaüstünde kullanıcı dostu.


Bağlantılar: UX/UI Tasarım Dokümanı (06) için wizard tasarımı.

3.4. Kategori ve Alt Kategori Yönetimi

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, adminin veri tabanında yönettiği hazır kategori şablonlarını import edebilmeli ve tamamen özelleştirebilmeliyim ki kendi kategori yapımı hızlıca oluşturayım.
Kabul Kriterleri:
Şablonlar, admin tarafından veri tabanında yönetilir (sınırsız ekleme/silme/düzenleme).
Kullanıcı, import sırasında kategori/alt kategori isimlerini, sıralarını, yapısını düzenleyebilir, silebilir, ekleyebilir, sınırsız özelleştirme.
Her kullanıcının kategori yapısı bağımsız, sadece kendisi görür.
Import işlemi <2 saniye, özelleştirme arayüzü mobil dostu.
Kategoriler, gelir/gider işlemleri ve bütçe planlamasıyla bağlantılıdır (detaylar sonraki hikayelerde).


Bağlantılar: Teknik Tasarım Dokümanı (07) için veri tabanı yapısı.

3.5. Nakit Hesap Yönetimi
3.5.1. Hesap Oluşturma

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesap oluşturmak için özelleşmiş, kademeli bir form kullanabilmeliyim ki ihtiyaçlarıma uygun ve mobil dostu olsun.
Kabul Kriterleri:
Form, 3 adımlı:
Adım 1: Genel bilgiler (hesap adı <30 karakter, para birimi [dropdown: TRY, USD, EUR], başlangıç bakiyesi ≥0, açıklama).
Adım 2: Kesim günü (zorunlu: ayın ilk günü, son günü, ilk iş günü, son iş günü, belirli bir gün [text input, 2-28 arası]).
Adım 3: Önizleme.


Başlangıç bakiyesi default 0, 0 seçilirse “Emin misiniz?” sorusu gösterilir.
Kesim günü “belirli bir gün” seçilirse, 2-28 arası bir sayı girilir; hatalı girişte (örneğin, 1 veya 29) toast mesajı gösterilir (örneğin, “Geçerli bir gün seçin: 2-28”).
Nakit hesap, bağımsız bir modül olarak çalışır.
Soru işareti açıklamaları modal olarak açılır, mobil/desktop uyumlu.
Form yüklenmesi <1 saniye, hatalı girişte toast mesajı (örneğin, “Negatif bakiye girilemez”).


Bağlantılar: Teknik Tasarım Dokümanı (07) için modüler yapı, UX/UI Tasarım Dokümanı (06) için modal tasarımı.

3.5.2. Ekstre Oluşumu

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesap oluşturduğumda, kesim gününe bağlı olarak mevcut dönem ekstresi ve gelecek 11 dönem ekstreleri otomatik oluşmalı ki bir yıllık finansal öngörüyle bütçemi takip edebileyim.
Kabul Kriterleri:
Hesap oluşturulduğunda, Supabase veri tabanına kaydedilir ve ekstreler otomatik oluşur:
Mevcut dönem ekstresi, seçilen kesim gününe göre belirlenir.
Gelecek 11 dönem ekstresi, kesim gününe bağlı olarak oluşturulur (bir yıllık planlama).


Ekstre statüsü (açık, kapalı, gelecek), kesim gününe göre otomatik yönetilir:
Kesim günü geçtiğinde, mevcut ekstre kapanır, bir gelecek ekstre açılır.
Yeni bir gelecek ekstre (11’inci) eklenir, toplam 11 gelecek dönem korunur.
Kullanıcı, kapalı ekstreyi yeniden açabilir, bakiyeler ve sonraki ekstreler güncellenir (detaylar hikâyede).
Günlük batch işlemi (her gece), her hesabın kesim gününe özgü ekstre statülerini günceller.


Kullanıcı, oluşum sırasında bir modal loading ekranı görür; ekran, daktilo efektiyle (her mesaj 0.3 saniye) şu mesajları gösterir:
“Hesabınız yaratılıyor”
“Mevcut dönem ekstreniz yaratılıyor”
“Gelecek dönem ekstreler yaratılıyor”


Loading ekranı tamamlandığında (<2 saniye), kullanıcı otomatik olarak hesaplar sayfasına yönlendirilir.
Ekstre oluşumu <1 saniye sürer, nakit hesap modülüne özgü ve bağımsız çalışır.
Batch işlemi performansı <1 saniye/hesap hedeflenir, kullanıcı/ekstre sayısına bağlı detaylar Teknik Tasarım Dokümanı’nda (07) netleşecek.
Veri tabanı yapısı, Teknik Tasarım Dokümanı’nda (07) tanımlanacak.


Bağlantılar: Teknik Tasarım Dokümanı (07) için veri tabanı ve ekstre mantığı, UX/UI Tasarım Dokümanı (06) için loading ekranı tasarımı, Risk Yönetim Planı (03) için performans riskleri ve Lovable.dev’in geçmiş CRUD sorunları.

3.5.3. Ekstre Görüntüleme

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabımın ekstrelerini listeleyip detaylarını görebilmeliyim ki gerçekleşen ve bütçelenen finansal durumumu net bir şekilde takip edebileyim.
Kabul Kriterleri:
Hesaplar Sayfası:
Hesap, bir kart olarak gösterilir; kartta hesap adı, kapanış bakiyesi, açık ekstre kesim tarihi, düzenle/sil ikonları, “İşlem Gir” ve “Ekstreler” CTA tuşları bulunur.
Kart, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Ekstreler Sayfası:
“Güncel Dönem”, “Gelecek Dönem”, “Geçmiş Dönem” başlıkları altında ekstre kartları listelenir.
Her ekstre kartında: dönem başlangıcı, dönem kapanışı, gerçek açılış/kapanış bakiyeleri, bütçelenen açılış/kapanış bakiyeleri, detay ikonu.
Geçmiş ekstreler kalıcıdır, silinemez, 5 yılı dolduranlar arşivlenir.
Liste, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Ekstre Detay Sayfası:
Ekstre bilgileri: hesap adı, dönem, açılış bakiyesi, kapanış bakiyesi, bütçelenen açılış/kapanış bakiyeleri, toplam gelir (gerçekleşen ve bütçelenen), toplam gider (gerçekleşen ve bütçelenen), ekstre statüsü (açık, kapalı, gelecek).
Kapalı ekstre, kullanıcı tarafından yeniden açılabilir, işlem eklendiğinde bakiyeler ve sonraki ekstreler güncellenir (detaylar hikâyede).
Bakiye türleri:
Açılış Bakiyesi: İlk hesapta başlangıç bakiyesi, sonraki ekstrelerde önceki kapanış bakiyesi.
Kapanış Bakiyesi: Açılış bakiyesi + işlemler (gelir/gider), dönem kapanana kadar dinamik, sonra sabit (kullanıcı yeniden açarsa değişebilir).
Bütçelenen Açılış/Kapanış Bakiyeleri: Gerçekleşen + bütçelenen işlemlerin toplamı (detaylar hikâyenin bütçe kısmında).
Gerçekleşen Gelir/Gider: İşlemlerden gelen gelir/gider.
Bütçelenen Gelir/Gider: Gerçekleşen + bütçelenen gelir/gider.


İşlemler listesi: Her işlem satırında tarih, saat, kategori, alt kategori, tutar (giderler kırmızı, gelirler yeşil), açıklama (akordiyonla açılır, sınırsız, sınır hikâyede netleşecek), düzenle/sil ikonları.
Sayfa, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Ekstre görüntüleme, nakit hesap modülüne özgü ve bağımsız çalışır.
Veri tabanı yapısı, Teknik Tasarım Dokümanı’nda (07) tanımlanacak.


Bağlantılar: Teknik Tasarım Dokümanı (07) için veri tabanı ve ekstre mantığı, UX/UI Tasarım Dokümanı (06) için kart, liste ve akordiyon tasarımı, Risk Yönetim Planı (03) için performans riskleri.

3.5.4. Hesap Düzenleme ve Silme

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabımı düzenleyebilmeli veya silebilmeliyim ki ihtiyaçlarıma göre güncel tutabileyim.
Kabul Kriterleri:
Düzenleme:
İşlem yoksa: 3 adımlı formun tüm alanları (hesap adı, para birimi, başlangıç bakiyesi, açıklama, kesim günü) değiştirilebilir.
İşlem varsa: Hesap adı, açıklama, başlangıç bakiyesi değiştirilebilir; kesim günü değişimi, mevcut dönemden itibaren geçerli olur, geçmiş ekstreler etkilenmez.
Başlangıç bakiyesi veya kesim günü değişirse, ekstreler yeniden hesaplanır (mevcut ve gelecek ekstreler güncellenir, geçmiş ekstreler sabit).
Düzenleme formu, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Silme:
Hesap, işlemler ve bağlantılı bütçeler silinir, kullanıcıya onay modal’i gösterilir.
Silme işlemi, nakit hesap modülüne özgü ve bağımsız çalışır.


İşlemler, nakit hesap modülüne özgü ve bağımsız çalışır.


Bağlantılar: Teknik Tasarım Dokümanı (07) için modüler yapı ve ekstre hesaplama mantığı, UX/UI Tasarım Dokümanı (06) için form ve modal tasarımı, Risk Yönetim Planı (03) için performans riskleri.

4. Kısıtlamalar

İlk sürümde sadece bireysel kullanıcılar desteklenir, KOBİ özellikleri kapsam dışı.
Banka API entegrasyonları ilk sürümde yer almaz.
6 ay deneme süresi sonrası temel fonksiyonlar (işlem girme, hesap yaratma, bütçe planlama, ekstre, raporlar) kilitlenir, detaylar sonraki hikayelerde netleşir.

5. İlişkiler

Vizyon ve Kapsam Dokümanı (01): Uygulamanın genel hedefleri ve kapsamı.
Risk Yönetim Planı (03): Performans riskleri (örneğin, ekstre hesaplama süreleri), modülerlik riskleri (örneğin, Lovable.dev’in yanlış dosya değişiklikleri), geçmiş CRUD sorunları.
Veri Gizliliği ve Güvenlik Politikası (05): Kullanıcı kaydı/giriş için güvenlik gereksinimleri.
UX/UI Tasarım Dokümanı (06): Ana sayfa, wizard, formlar, modal, kart, liste ve akordiyon tasarımları.
Teknik Tasarım Dokümanı (07): Modüler yapı, veri tabanı tasarımı, Supabase entegrasyonu.

6. Sonraki Adımlar

Kullanıcı Hikâyesi Devamı: İşlem girme, ekstre kapanışı, bütçe oluşturma, çoklu döviz desteği, Banka Hesabı Yönetimi, Kredi Kartı Yönetimi, raporlama gibi süreçler anlatılacak.
Doküman Onayı: Ürün Sahibi’nin yorumları ve onayı bekleniyor.
GitHub Yükleme: Doküman, https://github.com/batuhanozgun/lovable-loopinance/tree/main/docs adresine yüklenecek.

Son Güncelleme: 19 Nisan 2025, Sorumlu: batuhanozgun

Güncelleme Notları:

Düzeltilen Hata: Hesap Oluşturma (3.5.1) ve Hesap Düzenleme/Silme (3.5.4) bölümleri, önceki taslaklardan eksiksiz geri eklendi.
Yeni Eklemeler:
Ekstre Görüntüleme: Geçmiş ekstreler için 5 yıllık arşivleme, akordiyon için sınırsız açıklama (sınır hikâyede netleşecek).
Ekstre Oluşumu: Batch performansı için kullanıcı/ekstre sayısı notu, Teknik Tasarım Dokümanı’na yönlendirme.
Sonraki Adımlar: İşlem girme, ekstre kapanışı, bütçe sıralaması eklendi.


Modülerlik: Nakit hesap modülü bağımsız, Banka/Kredi Kartı için hazır yapı (12 Nisan 2025, Lovable.dev riskleri).
Performans: Ekstre oluşumu <1 saniye, loading <2 saniye, batch <1 saniye/hesap, sayfa yüklenmeleri <1 saniye (19 Nisan 2025, 30 saniyelik ekstre sorunu).

