Loopinance Fonksiyonel Gereksinimler: Bütçe Planlama
Bu doküman, Loopinance uygulamasının bütçe planlama modülüne ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
3. Fonksiyonel Gereksinimler
3.6. Bütçe Planlama
3.6.1. Bütçe Planı Yaratma

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, sınırsız süreli veya belirli bir dönem için bütçe planı yaratabilmeliyim ki finansal hedeflerimi planlayabileyim.
Kabul Kriterleri:
Kullanıcı, Bütçeler Sayfası’nda “Yeni Bütçe Planı Yarat” tuşuyla formu açar.
Form Alanları:
Bütçe Planı Adı: 40 karaktere kadar serbest metin, zorunlu.
Bütçe Süresi: İki seçenek: “Belirli bir dönem” veya “Süre sınırı yok”. Bilgi kutucukları açıklamalar içerir:
Belirli bir dönem: “Bütçe kalemleri planda belirtilen süre içinde geçerli olur, süre bittiğinde devam etmez.”
Süre sınırı yok: “Bütçe kalemleri yaratıldıkları koşullara göre plan silinene ya da pasif duruma getirilene kadar davranışlarına devam eder.”


Başlangıç/Bitiş Tarihi: “Belirli bir dönem” seçilirse zorunlu, tarih seçiciyle girilir (örneğin, 1 Ocak 2025 - 31 Aralık 2025).
Açıklama: 400 karaktere kadar serbest metin, isteğe bağlı.
Versiyon: Değiştirilemez, varsayılan “V.0001” (versiyonlama için).
Oluştur: “Bütçe Planını Oluştur” tuşuyla plan Supabase’e kaydedilir.


Plan oluşturulduğunda, kullanıcı Bütçeler Sayfası’na yönlendirilir.
Bütçe Planı Kartı:
Kartta plan adı, başlangıç/bitiş tarihleri (belirli dönemse), “Sil”, “Düzenle”, “Kalem Ekle”, “Pasif Yap”, “Kalemleri Görüntüle”, “Referans Al”, “Yürürlüğe Al” CTA’ları bulunur.
Kart, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Silme:
“Sil” CTA’sı, planı ve içindeki bütçe kalemlerini siler, ekstrelerdeki yansımalar kaldırılır.
Onay modal’i: “Plan ve kalemler silinecek, ekstreler güncellenecek. Emin misiniz?”
Silme sonrası ekstreler zincirleme güncellenir (<1 saniye/hesap).


Düzenleme:
Kalem yoksa: Ad, süre tipi, tarihler (belirli dönemse), açıklama değiştirilebilir.
Kalem varsa:
Belirli bir dönem: Tarih değişirse, kalemlerin ekstre yansımaları yeni tarih aralığına göre güncellenir.
Belirli → Sınırsız: Kalemler, plan silinene/pasif olana kadar ekstrelerde devam eder.
Sınırsız → Belirli: Kalemler, yeni tarih aralığına göre ekstrelerde revize edilir.
Kalemlerin tarih, süre, tekrarlanma özellikleri, süre tipi değişiminde ekstre yansımalarını etkiler (detaylar 3.6.2’de).


Düzenleme sonrası ekstreler zincirleme güncellenir (<1 saniye/hesap).


Pasif Yap:
“Pasif Yap” CTA’sı, planı pasif duruma getirir; kalemlerin tekrarlanma fonksiyonları durur, mevcut ekstre yansımaları kalır, yeni yansımalar eklenmez.
Pasif plan, düzenlenebilir veya yeniden yürürlüğe alınabilir.


Kalemleri Görüntüle:
“Kalemleri Görüntüle” CTA’sı, kalem listesi sayfasına yönlendirir; kullanıcı kalemleri inceleyebilir, silebilir, düzenleyebilir (detaylar 3.6.2’de).


Referans Al:
“Referans Al” CTA’sı, orijinal planı referans alarak yeni bir versiyon (örneğin, V.0002) yaratır.
Yeni versiyon, orijinalin kalemleriyle aynı başlar; kullanıcı kalemleri düzenleyebilir/silebilir/ekleyebilir.
Versiyonlar, Bütçeler Sayfası’nda hiyerarşik gösterilir (örneğin, ağaç yapısı).


Yürürlüğe Al:
İlk plan varsayılan olarak “yürürlükte”dir.
Yeni plan veya versiyon yaratıldığında, kullanıcı “Yürürlüğe Al” CTA’sı ile aktif planı seçer.
Sadece yürürlükte olan planın kalemleri ekstre ve raporlara yansır.
Plan statüleri: “Pasif” (kalemler çalışmaz), “Yürürlükte” (ekstre/raporlara yansır), “Yürürlükte Değil” (yansımaz, ama düzenlenebilir).


Form yüklenmesi, plan oluşturma, silme, düzenleme, versiyonlama, statü değişimi <1 saniye hedeflenir.
Bütçe planlama, nakit hesap modülünden bağımsız bir modül olarak çalışır.


Bağlantılar: 04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Görüntüleme için bütçe yansımaları, 07-teknik-tasarim-dokumani.md için veri tabanı yapısı, 06-ux-ui-tasarim-dokumani.md için form, kart, modal ve hiyerarşi tasarımı, 03-risk-yonetim-plani.md için performans riskleri.

3.6.2. Bütçe Kalemi Ekleme

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabıma bağlı bir bütçe planına gelir veya gider kalemi ekleyebilmeliyim ki finansal hedeflerimi detaylı bir şekilde planlayabileyim ve ekstrede hem gerçekleşen hem de bütçelenen durumu takip edebileyim.
Kabul Kriterleri:
Kullanıcı, Bütçeler Sayfası’nda bütçe planı kartındaki “Kalem Ekle” CTA’sı veya “Kalemleri Görüntüle” sayfasındaki “Yeni Kalem Ekle” tuşuyla formu açar.
Form Alanları:
İşlem Tipi: Gelir veya gider, toggle veya radio buton ile seçilir, zorunlu.
Kategori: Kullanıcının kategori listesinden dropdown ile seçilir, zorunlu (04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4).
Alt Kategori: Seçilen kategoriye bağlı alt kategoriler, dropdown ile otomatik yüklenir, zorunlu.
Hesap: Nakit hesap listesinden dropdown ile seçilir, zorunlu (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.1 Hesap Oluşturma).
Tutar: Tam sayı ve küsurat girişine uygun (örneğin, 15,50 TL), virgülden sonra 2 hane, pozitif sayı, zorunlu.
Tekrarlanma Durumu: “Var” veya “Yok”, toggle veya radio buton ile seçilir, zorunlu.
Yoksa:
Tarih: Tarih seçici ile açık ekstre dönemi içindeki bir tarih seçilir (örneğin, 1-30 Nisan 2025), zorunlu.
Kalem, seçilen tarihe göre ilgili ekstrede bütçelenen gelir/gider olarak yansır.


Varsa:
Tekrarlanma Sıklığı: Dropdown ile seçilir, seçenekler: günlük, haftalık, aylık, ayın ilk günü, ayın son günü, ayın ilk iş günü, ayın son iş günü, iki haftada bir, üç haftada bir, 3 ayda bir, 6 ayda bir; zorunlu.
Tarih Aralığı: İki seçenek: “Bütçe planı aktif olduğu sürece” veya “Belirli bir tarih aralığı”.
“Belirli bir tarih aralığı” seçilirse, başlangıç/bitiş tarihi seçici ile girilir (örneğin, 1 Ocak 2025 - 31 Aralık 2025), zorunlu.
“Bütçe planı aktif olduğu sürece” seçilirse, kalem plan pasif yapıldığında veya silindiğinde otomatik durur.
Tekrarlanma, mevcut ekstre sayısıyla sınırlıdır (1 açık + 11 gelecek ekstre, toplam 12 dönem). Yeni ekstre oluşturulduğunda, tekrarlanan kalemler otomatik yansıtılır (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.2 Ekstre Oluşumu).






Açıklama: 400 karaktere kadar serbest metin, isteğe bağlı.
Kaydet: “Kalemi Kaydet” tuşuyla kalem Supabase’e kaydedilir.


Hata Senaryoları:
Geçersiz tutar (negatif veya sıfır): Toast mesajı, “Tutar pozitif bir sayı olmalı.”
Kategori/alt kategori seçilmezse: Toast mesajı, “Kategori ve alt kategori seçimi zorunlu.”
Hesap seçilmezse: Toast mesajı, “Bir nakit hesap seçilmeli.”
Tekrarlanma “Yok” seçiliyken tarih seçilmezse: Toast mesajı, “Bir tarih seçilmeli.”
Tekrarlanma “Var” seçiliyken sıklık veya tarih aralığı seçilmezse: Toast mesajı, “Tekrarlanma sıklığı ve tarih aralığı seçilmeli.”
Tarih, açık ekstre dönemi dışındaysa: Toast mesajı, “Tarih, açık ekstre dönemi içinde olmalı.”


Ekstre Yansımaları:
Kalem kaydedildiğinde, bütçelenen gelir/gider olarak ilgili ekstrelerin işlem listesinde yansır:
Tekrarlanma “Yok” ise, seçilen tarihe göre tek bir ekstrede yansır.
Tekrarlanma “Var” ise, sıklık ve tarih aralığına göre ilgili ekstrelerde yansır (örneğin, aylık 100 TL gider, her ayın 1’inde ilgili ekstreye yansır).


İşlem listesi, varsayılan olarak tarihe göre sıralanır (en yeniden eskiye).
Kullanıcı, işlem listesini şu seçeneklerle sıralayabilir: tutar (büyükten küçüğe), kategori (alfabetik), açıklama (alfabetik); sıralama arayüzü detayları 06-ux-ui-tasarim-dokumani.md.
Opsiyonel: Kullanıcı, işlem listesinde sadece bütçelenen kalemleri veya sadece gerçekleşen işlemleri filtreleyebilir; filtreleme arayüzü detayları 06-ux-ui-tasarim-dokumani.md.
Bütçelenen kalemler, ekstre işlem listesinde gerçekleşen işlemlerden görsel olarak ayrılır; görsel ayrım detayları 06-ux-ui-tasarim-dokumani.md.
Bütçelenen bakiyeler, gerçekleşen bakiyeleri değiştirmez; sadece bütçelenen gelir/gider ve bütçelenen açılış/kapanış bakiyelerini etkiler (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Görüntüleme).
Yeni ekstre oluşturulduğunda, tekrarlanan kalemler otomatik yansıtılır; bu, ekstre oluşturmanın bir parçasıdır (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.2 Ekstre Oluşumu).
Bildirimler, ekstre kapanış sürecinde genel bir bilgilendirme olarak sağlanır (örneğin, “Ekstre kapandı, yeni ekstre açıldı, gelecek dönem için 11. ekstre yaratıldı”), detaylar 04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.7 Ekstre Kapanışı.


Silme:
“Kalemleri Görüntüle” sayfasında kalem satırında “Sil” ikonu görünür.
Silme için onay modal’i: “Kalem silinecek, ekstre yansımaları kaldırılacak. Emin misiniz?”
Silme sonrası ekstreler zincirleme güncellenir (<1 saniye/hesap).


Düzenleme:
“Kalemleri Görüntüle” sayfasında kalem satırında “Düzenle” ikonu görünür.
Düzenleme formu, mevcut bilgilerle dolu açılır; tüm alanlar değiştirilebilir.
Değişiklik sonrası ekstre yansımaları zincirleme güncellenir (<1 saniye/hesap).


Modülerlik:
Bütçe kalemi ekleme, nakit hesap modülüne özgü ve bağımsız çalışır.
Kod, nakit hesaplar için ayrı bir klasörde (örneğin, /budget/cash-account) yazılmalı, diğer hesap türlerinden (kredi kartı, banka hesabı) bağımsız olmalı.
Form mantığı, arka planda nakit hesaba özgü çalışırken, ön yüzde tek bir form arayüzü kullanılır.
Lovable.dev talimatları:
Kod, mimari yoruma izin vermeden yazılmalı; sadece tanımlı form mantığını uygulamalı.
Dosya yapısı: /budget/cash-account/add-budget-item.ts gibi net bir yol izlenmeli.
Hata mesajları, spesifik ve net olmalı (örneğin, “Geçersiz tarih” yerine “Tarih, açık ekstre dönemi içinde olmalı”).




Tasarım Tutarlılığı:
Form elemanları (butonlar, dropdown, toggle, input), merkezi bir tasarım sisteminden çekilmeli; detaylar 06-ux-ui-tasarim-dokumani.md.


Performans:
Form yüklenmesi, kalem kaydı, silme, düzenleme ve ekstre güncellemeleri <1 saniye/hesap hedeflenir.
Tekrarlanma sıklığına bağlı yansımalar, 5.000 kullanıcı için optimize edilmeli (03-risk-yonetim-plani.md).


Bağlantılar:
04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Görüntüleme için yansımalar.
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4 için kategori/alt kategori.
07-teknik-tasarim-dokumani.md için veri tabanı yapısı.
06-ux-ui-tasarim-dokumani.md için form, modal ve sıralama/filtreleme arayüzü tasarımı.
03-risk-yonetim-plani.md için performans ve Lovable.dev riskleri.





Planlanan Bölümler
Aşağıdaki bölümler, bütçe planlama modülünün devamı için planlanmıştır:

3.6.3 Harcama/Gelir İşlemlerinin Bütçe Kalemleriyle Eşleştirilmesi: İşlem girerken bütçe kalemleriyle otomatik eşleşme.
3.6.4 Bütçe Kalemi Özellikleri: Tekrarlanma (günlük, haftalık, aylık vb.) ve otomatik kayıtlar.
3.6.5 Bütçe Kalemi Girme UX/UI Kolaylığı: Toplu bütçe girişi için kullanıcı dostu yöntemler.
3.6.6 Bütçe Planı Detay Sayfası ve Görselleştirme: Loading bar ile gerçekleşen/bütçelenen karşılaştırması.
3.6.7 Ek Bütçe Ekleme (Opsiyonel): Tek seferlik ek bütçe ekleme, mevcut yapıyı bozmadan.
3.6.8 Bütçe Kalemi ve Gerçekleşen İşlem Analizi: Eşleşme ve analiz süreçleri.

Son Güncelleme: 27 Nisan 2025, Sorumlu: batuhanozgun
