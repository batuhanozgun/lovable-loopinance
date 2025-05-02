Loopinance Fonksiyonel Gereksinimler: Bütçe Planlama
Bu doküman, Loopinance uygulamasının bütçe planlama modülüne ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
0. Genel Bakış
Bütçe planlama modülü, kullanıcıların finansal hedeflerini planlamalarına olanak tanır. Her kullanıcının, gerçekleşen işlemlerle eşleştirilen tek bir Ana Bütçesi bulunur. Kullanıcılar ayrıca, simülasyon ve "what-if" analizi yapmak amacıyla, Ana Bütçe’yi referans alarak veya sıfırdan Alternatif Bütçeler oluşturabilirler. Alternatif Bütçelerdeki kalemler gerçekleşen işlemlerle eşleştirilemez. Modül, nakit hesap modülünden bağımsız çalışır, ancak Ana Bütçe kalemlerinin ekstre yansımaları için entegre olur (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md).
1. Kapsam
Bu doküman, Ana Bütçe ve Alternatif Bütçe planlarının oluşturulması, kalem ekleme/düzenleme/silme ve Ana Bütçe ile Alternatif Bütçeler arasındaki ilişkiyi (örneğin, kalem aktarma konsepti) kapsar. Gerçekleşen işlem eşleştirmesi 04-03'te detaylandırılmıştır. Alternatif Bütçelerin detaylı analiz ve simülasyon arayüzleri bu dokümanın kapsamı dışındadır ve Analiz/Raporlama modülünde ele alınacaktır. UX/UI detayları 06-ux-ui-tasarim-dokumani.md, teknik detaylar 07-teknik-tasarim-dokumani.md, performans riskleri 03-risk-yonetim-plani.md adreslenir.
2. Fonksiyonel Gereksinimler
3.6. Bütçe Planlama
3.6.1 Bütçe Planı Yönetimi (Oluşturma, Düzenleme, Silme)
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, finansal takibim için her zaman aktif olan tek bir Ana Bütçem olmalı ve farklı senaryoları denemek için Alternatif Bütçeler yaratabilmeliyim.
Kabul Kriterleri:

Ana Bütçe:
Her kullanıcının yalnızca bir tane Ana Bütçesi vardır. Bu, uygulama ilk kullanıldığında otomatik olarak oluşturulabilir veya kullanıcı tarafından ilk plan olarak yaratılabilir.
Ana Bütçe her zaman "aktif" durumdadır; gerçekleşen işlemler sadece bu bütçeyle eşleştirilir ve ana analizler bu bütçeyi baz alır.
Ana Bütçe silinemez, ancak içindeki tüm kalemler silinerek sıfırlanabilir veya düzenlenebilir.
Ana Bütçe'nin adı ve açıklaması düzenlenebilir. Süresi "Sınırsız" olarak başlar, ancak kullanıcı isterse belirli bir döneme çevirebilir (bu durumda kalemlerin geçerliliği etkilenir).


Alternatif Bütçe Oluşturma:
Kullanıcı, Bütçeler Sayfası’nda “Yeni Alternatif Bütçe Yarat” tuşuyla formu açar.
Oluşturma Seçenekleri:
Ana Bütçeyi Referans Al: Ana Bütçe'nin o anki tüm kalemleriyle birlikte bir kopyasını oluşturur.
Sıfırdan Başla: Boş bir Alternatif Bütçe oluşturur.


Form Alanları (Yeni Alternatif Bütçe için):
Bütçe Planı Adı: 40 karaktere kadar serbest metin, zorunlu.
Bütçe Süresi: İki seçenek: “Belirli bir dönem” veya “Süre sınırı yok”. Bilgi kutucukları açıklamalar içerir.
Başlangıç/Bitiş Tarihi: “Belirli bir dönem” seçilirse zorunlu.
Açıklama: 400 karaktere kadar serbest metin, isteğe bağlı.
Oluştur: “Alternatif Bütçeyi Oluştur” tuşuyla plan Supabase’e kaydedilir.




Bütçeler Sayfası Gösterimi:
Ana Bütçe her zaman listenin başında ve belirgin bir şekilde (örneğin, "Ana Bütçe" etiketiyle) gösterilir.
Alternatif Bütçeler listelenir.
Her bütçe planı kartında plan adı, süre bilgisi ve ilgili CTA'lar bulunur.
Ana Bütçe Kartı CTA'ları: "Düzenle" (Ad/Açıklama/Süre Tipi), "Kalem Ekle", "Kalemleri Görüntüle".
Alternatif Bütçe Kartı CTA'ları: "Düzenle", "Kalem Ekle", "Kalemleri Görüntüle", "Sil", "Ana Bütçeyi Referans Alarak Yenile" (opsiyonel), "Simülasyonu Gör" (Analiz modülüne bağlanacak).




Alternatif Bütçe Silme:
"Sil" CTA’sı, Alternatif Bütçeyi ve içindeki tüm kalemleri siler. Bu işlem Ana Bütçe’yi veya gerçekleşen işlem eşleşmelerini etkilemez. Onay modal’i gösterilir.


Bütçe Düzenleme (Ana ve Alternatif):
Ad, açıklama, süre tipi, tarihler (belirli dönemse) düzenlenebilir.
Süre tipi veya tarih aralığı değişirse, plandaki kalemlerin geçerlilik durumları etkilenir (ilgili ekstre yansımaları sadece Ana Bütçe için geçerlidir). Düzenleme sonrası Ana Bütçe için ekstreler zincirleme güncellenir (<1 saniye/hesap).


"Yürürlüğe Al" / "Pasif Yap" Mekanizması YOKTUR: Ana Bütçe her zaman aktiftir. Alternatif Bütçeler sadece simülasyon içindir, aktif/pasif durumları yoktur (belki "Arşivlendi" durumu eklenebilir).
Performans: Form yüklenmesi, plan oluşturma, silme, düzenleme <1 saniye hedeflenir.

Bağlantılar: 04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md (Eşleşme ve Ekstre Yansımaları sadece Ana Bütçe için), 07-teknik-tasarim-dokumani.md (Veri tabanı yapısı: Plan türü alanı eklenecek), 06-ux-ui-tasarim-dokumani.md (Form, kart, modal tasarımları, Ana/Alternatif ayrımının görselleştirilmesi).
3.6.2 Bütçe Kalemi Ekleme / Yönetme
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, Ana Bütçeme veya bir Alternatif Bütçeme gelir/gider kalemleri ekleyebilmeliyim. Alternatif Bütçede planladığım bir kalemi beğenirsem, kolayca Ana Bütçeme aktarabilmeliyim.
Kabul Kriterleri:

Kullanıcı, ilgili bütçe planı kartındaki (Ana veya Alternatif) “Kalem Ekle” CTA’sı veya “Kalemleri Görüntüle” sayfasındaki “Yeni Kalem Ekle” tuşuyla formu açar.
Form Alanları: İşlem Tipi, Kategori/Alt Kategori, Hesap, Tutar, Tekrarlanma Durumu/Detayları, Tarih Aralığı, Açıklama.
Kaydetme: Kalem, içinde bulunulan plana (Ana veya Alternatif) kaydedilir.
Ekstre Yansımaları: Sadece Ana Bütçe’ye eklenen veya düzenlenen kalemler, ilgili ekstrelerin işlem listesine ve bütçelenen bakiyelere yansır (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3). Alternatif Bütçe kalemleri ekstrelere yansımaz.
Eşleştirme: Gerçekleşen işlemler sadece Ana Bütçe kalemleriyle eşleştirilebilir (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.5).
Hata Senaryoları:
Tarih aralığı, işlemle eşleşmeye uygun olmalı. İşlem tarihi kalemin tarih aralığı dışındaysa, hata mesajı: “Tarih, kalemin X-Y aralığına uymuyor.”
Aynı kategori/alt kategori için birden fazla Ana Bütçe kalemi varsa, eşleştirme sırasında tarih aralığı en uygun olan seçilir (04-03, 3.5.5).


Modal İçi Kalem Oluşturma: İşlem girişi sırasında (04-03, 3.5.5) “Ana Bütçeye Kalem Oluştur” seçeneğiyle bu form modal içinde bir alt form olarak açılır, kullanıcı kalem oluşturup eşleştirebilir.
"Ana Bütçeye Aktar" Fonksiyonu:
Kullanıcı bir Alternatif Bütçe’nin "Kalemleri Görüntüle" sayfasındayken, her kalem satırında "Ana Bütçeye Aktar" ikonu/butonu bulunur.
Butona tıklandığında:
Sistem, Ana Bütçe’de aynı anahtarlara (Kategori, Alt Kategori, Hesap, Tekrarlanma Durumu/Sıklığı) sahip bir kalem olup olmadığını kontrol eder.
Varsa: “Ana Bütçe’deki mevcut ‘[Kalem Adı]’ kalemi bu kalemle güncellensin mi? (Eski Tutar: X, Yeni Tutar: Y)” [Güncelle / İptal]
Yoksa: “Bu kalem Ana Bütçe’ye yeni olarak eklensin mi?” [Ekle / İptal]
Onaylanırsa, ilgili işlem (ekleme veya güncelleme) Ana Bütçe üzerinde yapılır ve ekstre yansımaları güncellenir (<1 saniye/hesap).


Not: Bu fonksiyonun detaylı akışı (eşleşme anahtarı, toplu aktarım ihtiyacı) ayrıca tartışılmalıdır.


Silme/Düzenleme: Kullanıcı hem Ana hem de Alternatif Bütçelerdeki kalemleri silebilir veya düzenleyebilir. Ana Bütçe’deki değişiklikler ekstre yansımalarını günceller.
Çoklu Kalem Girişi (3.6.5): Kullanıcı hangi plana (Ana veya Alternatif) kalem eklediğini seçerek başlar. Sadece Ana Bütçe’ye eklenenler ekstrelere yansır.
Diğer kabul kriterleri (Hata senaryoları, performans, modülerlik vb.) büyük ölçüde aynı kalır, ancak Ana/Alternatif ayrımı dikkate alınır.

Bağlantılar: 04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md (Eşleşme ve Ekstre Yansımaları), 04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 07-teknik-tasarim-dokumani.md, 06-ux-ui-tasarim-dokumani.md ("Aktar" fonksiyonu arayüzü).
3.6.3 Harcama/Gelir İşlemlerinin Bütçe Kalemleriyle Eşleştirilmesi

Bu başlık altındaki detaylı mantık artık 04-03, 3.5.5 bölümünde ele alınmaktadır.
Burada sadece şu not düşülebilir: "Gerçekleşen işlemlerin bütçe kalemleriyle eşleştirilmesi sadece kullanıcının Ana Bütçesi üzerinden yapılır. Detaylar için bkz. 04-03, 3.5.5."

3.6.4 Bütçe Kalemi Özellikleri

Tanım: Bütçe kalemleri (hem Ana hem Alternatif Bütçelerde), tekrarlanma (günlük, haftalık, aylık vb.) özelliklerini destekler.
Detaylar: Tekrarlanma seçenekleri ve tarih aralığı, 3.6.2’de tanımlı.
Otomatik kayıt (ekstre yansıması), sadece Ana Bütçe kalemleri için, yeni ekstre oluşturulduğunda gerçekleşir (04-03, 3.5.2 Ekstre Oluşumu).

Bağlantılar: 04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.2 Ekstre Oluşumu, 06-ux-ui-tasarim-dokumani.md için form tasarımı.
3.6.5 Bütçe Kalemi Girme UX/UI Kolaylığı
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, Ana Bütçeme veya bir Alternatif Bütçeme birden fazla gelir veya gider kalemini hızlı ve kolay bir şekilde ekleyebilmeliyim ki finansal hedeflerimi planlarken zaman kaybetmeyeyim ve tekrarlayan girişlerden kaçınayım.
Kabul Kriterleri:

Kullanıcı, Bütçeler Sayfası’nda ilgili bütçe planı (Ana veya Alternatif) kartındaki “Kalem Ekle” CTA’sına basar.
Modal açılır:
“Tek kalem ekle” (3.6.2 formuna yönlendirir).
“Çoklu giriş yap” (hiyerarşik akordeon arayüzüne yönlendirir).


Çoklu giriş ekranı, kullanıcının seçtiği plana (Ana veya Alternatif) kalem eklemek üzere açılır ve kullanıcının tanımlı kategori/alt kategori yapısıyla önceden doldurulur.
Arayüz Yapısı, Anlık Doğrulama, Kaydetme, Hata Senaryoları, Boş Kategori Durumu, Mobil Uyumluluk, Performans, Modülerlik, Tasarım Tutarlılığı önceki tanımlarla aynı kalır.
Ekstre Yansımaları: Kaydedilen kalemlerden sadece Ana Bütçe’ye ait olanlar, 3.6.2’deki gibi ekstrelerde yansır.

Bağlantılar: (Öncekiyle aynı, Ana/Alternatif ayrımı dikkate alınarak).
3.6.6 Bütçe Planı Detay Sayfası ve Görselleştirme
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, Ana Bütçemin kategori, alt kategori ve zaman bazında detaylı analizini görselleştirilmiş bir şekilde inceleyebilmeliyim, gerçekleşen işlemlerle bütçelenen kalemlerimi karşılaştırabilmeliyim ki finansal hedeflerime ne kadar ulaştığımı anlayayım ve Ana Bütçemi optimize edeyim. (Alternatif Bütçelerin analizleri ayrı bir bölümde ele alınacaktır.)
Kabul Kriterleri:

Bu sayfa sadece Ana Bütçe verilerini gösterir ve analiz eder.
Sayfa Yapısı, Özet Kartları, Görselleştirme Alanı (Loading Bar, Pasta Grafiği, Zaman Grafiği), Tablo, Filtreleme/Sıralama, Etkileşim, Analiz Özellikleri, Ek Özellikler (Uyarılar, İhracat), Mobil Uyumluluk, Performans, Modülerlik, Tasarım Tutarlılığı ve Hata Senaryoları önceki tanımlarla aynı kalır, ancak tamamen Ana Bütçe’ye odaklıdır. Gerçekleşen tutarlar, Ana Bütçe kalemleriyle eşleşen işlemlerden gelir. Bütçelenen tutarlar Ana Bütçe kalemlerinden gelir.
Kapsam Dışı Notu: Alternatif Bütçelerin simülasyonlarının veya Ana Bütçe ile karşılaştırmalı analizlerinin nasıl gösterileceği bu dokümanın kapsamı dışındadır ve Analiz/Raporlama modülü gereksinimlerinde tanımlanacaktır.

Bağlantılar: 04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md (Ana Bütçe Eşleşmeleri ve Ekstre Yansımaları), 04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 06-ux-ui-tasarim-dokumani.md, 07-teknik-tasarim-dokumani.md, 03-risk-yonetim-plani.md.
Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun / Gemini Assistant
