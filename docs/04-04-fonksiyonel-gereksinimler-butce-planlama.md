04-04-fonksiyonel-gereksinimler-butce-planlama.md
Loopinance Fonksiyonel Gereksinimler: Bütçe Planlama
Bu doküman, Loopinance uygulamasının bütçe planlama modülüne ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
0. Genel Bakış
Bütçe planlama modülü, kullanıcıların finansal hedeflerini planlamalarına olanak tanır. Kullanıcılar, nakit hesaplarına bağlı bütçe planları oluşturabilir, gelir/gider kalemleri ekleyebilir ve işlemlerini bütçe kalemleriyle eşleştirebilir. Modül, nakit hesap modülünden bağımsız çalışır, ancak ekstre yansımaları için entegre olur (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md).
1. Kapsam
Bu doküman, bütçe planı oluşturma, kalem ekleme, işlem eşleştirme ve analiz süreçlerini kapsar. UX/UI detayları 06-ux-ui-tasarim-dokumani.md, teknik detaylar 07-teknik-tasarim-dokumani.md, performans riskleri 03-risk-yonetim-plani.md adreslenir.
2. Fonksiyonel Gereksinimler
3.6. Bütçe Planlama
3.6.1 Bütçe Planı Yaratma
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


Performans:
Form yüklenmesi, plan oluşturma, silme, düzenleme, versiyonlama, statü değişimi <1 saniye hedeflenir.


Modülerlik:
Bütçe planlama, nakit hesap modülünden bağımsız bir modül olarak çalışır.



Bağlantılar:

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Görüntüleme için bütçe yansımaları
07-teknik-tasarim-dokumani.md için veri tabanı yapısı
06-ux-ui-tasarim-dokumani.md için form, kart, modal ve hiyerarşi tasarımı
03-risk-yonetim-plani.md için performans riskleri

3.6.2 Bütçe Kalemi Ekleme
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
Tekrarlanma “Yok”sa:
Tarih: Tarih seçici ile açık ekstre dönemi içindeki bir tarih seçilir (örneğin, 1-30 Nisan 2025), zorunlu.
Kalem, seçilen tarihe göre ilgili ekstrede bütçelenen gelir/gider olarak yansır.


Tekrarlanma “Var”sa:
Tekrarlanma Sıklığı: Dropdown ile seçilir, seçenekler: günlük, haftalık, aylık, ayın ilk günü, ayın son günü, ayın ilk iş günü, ayın son iş günü, iki haftada bir, üç haftada bir, 3 ayda bir, 6 ayda bir; zorunlu.
Tarih Aralığı: İki seçenek: “Bütçe planı aktif olduğu sürece” veya “Belirli bir tarih aralığı”. “Belirli bir tarih aralığı” seçilirse, başlangıç/bitiş tarihi seçici ile girilir (örneğin, 1 Ocak 2025 - 31 Aralık 2025), zorunlu. “Bütçe planı aktif olduğu sürece” seçilirse, kalem plan pasif yapıldığında veya silindiğinde otomatik durur.
Tekrarlanma, mevcut ekstre sayısıyla sınırlıdır (1 açık + 11 gelecek ekstre, toplam 12 dönem).
Yeni ekstre oluşturulduğunda, tekrarlanan kalemler otomatik yansıtılır (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.2 Ekstre Oluşumu).


Açıklama: 400 karaktere kadar serbest metin, isteğe bağlı.
Kaydet: “Kalemi Kaydet” tuşuyla kalem Supabase’e kaydedilir.


Hata Senaryoları:
Geçersiz tutar (negatif veya sıfır): Toast mesajı, “Tutar pozitif bir sayı olmalı.”
Kategori/alt kategori seçilmezse: Toast mesajı, “Kategori ve alt kategori seçimi zorunlu.”
Hesap seçilmezse: Toast mesajı, “Bir nakit hesap seçilmeli.”
Tekrarlanma “Yok” seçiliyken tarih seçilmezse: Toast mesajı, “Bir tarih seçilmeli.”
Tekrarlanma “Var” seçiliyken sıklık veya tarih aralığı seçilmezse: Toast mesajı, “Tekrarlanma sıklığı ve tarih aralığı seçilmeli.”
Tarih, açık ekstre dönemi dışındaysa: Toast mesajı, “Tarih, açık ekstre dönemi içinde olmalı.”
Aynı işlem tipi, kategori, alt kategori, hesap ve tekrarlanma durumu (var/yok ve sıklık) için zaten bir bütçe kalemi varsa: Toast mesajı, “Bu özelliklere sahip bir bütçe kalemi zaten mevcut. Mevcut kalemi düzenlemek ister misiniz?” ve kullanıcı mevcut kaleme yönlendirilir.


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
Lovable.dev talimatları: Kod, mimari yoruma izin vermeden yazılmalı; sadece tanımlı form mantığını uygulamalı.
Dosya yapısı: /budget/cash-account/add-budget-item.ts gibi net bir yol izlenmeli.
Hata mesajları, spesifik ve net olmalı (örneğin, “Geçersiz tarih” yerine “Tarih, açık ekstre dönemi içinde olmalı”).


Tasarım Tutarlılığı:
Form elemanları (butonlar, dropdown, toggle, input), merkezi bir tasarım sisteminden çekilmeli; detaylar 06-ux-ui-tasarim-dokumani.md.


Performans:
Form yüklenmesi, kalem kaydı, silme, düzenleme ve ekstre güncellemeleri <1 saniye/hesap hedeflenir.
Tekrarlanma sıklığına bağlı yansımalar, 5.000 kullanıcı için optimize edilmeli (03-risk-yonetim-plani.md).



Bağlantılar:

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Görüntüleme için yansımalar
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4 için kategori/alt kategori
07-teknik-tasarim-dokumani.md için veri tabanı yapısı
06-ux-ui-tasarim-dokumani.md için form ve modal tasarımı
03-risk-yonetim-plani.md için performans ve Lovable.dev riskleri

3.6.3 Harcama/Gelir İşlemlerinin Bütçe Kalemleriyle Eşleştirilmesi
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabıma bağlı gelir veya gider işlemlerini bütçe kalemleriyle eşleştirebilmeliyim ki planlanan ve gerçekleşen harcamalarımı karşılaştırabileyim ve bütçe yönetimimi iyileştirebileyim.
Kabul Kriterleri:

Eşleştirme, iki senaryoda gerçekleşir:
İşlem girişi sırasında: Kullanıcı, gelir/gider girerken işlemi bir bütçe kalemiyle bağlar (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.4 İşlem Girişi).
Sonradan eşleştirme: Kullanıcı, ekstredeki mevcut bir işlemi bütçe kalemiyle bağlar (04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Görüntüleme).


Eşleştirme Süreci:
Anahtar Alanlar:
Zorunlu: Kategori, alt kategori, hesap (işlemle aynı hesaba bağlı bütçe kalemleri).
Destekleyici: Tarih (işlem tarihi, bütçe kaleminin tarih aralığı veya tekrarlanma sıklığıyla eşleşir).


Otomatik Öneri:
Sistem, işlemdeki kategori, alt kategori, hesap ve tarihle eşleşen bütçe kalemlerini önerir.
Tek bir kalem eşleşirse: “Bu işlem, [Kategori/Alt Kategori] bütçesiyle eşleşiyor (Tutar: X TL, Tekrarlanma: Y)” mesajı gösterilir.
Birden fazla kalem eşleşmesi mümkün değildir; aynı kategori, alt kategori, hesap, işlem tipi ve tekrarlanma durumu için yalnızca bir bütçe kalemi olabilir (3.6.2 Bütçe Kalemi Ekleme).
Eşleşen kalem yoksa: Kullanıcıya “Bütçe kalemi bulunamadı. Yeni bütçe oluşturmak ister misiniz?” mesajı gösterilir, iki seçenek sunulur:
“Bütçe Oluştur”: Kullanıcıyı bütçe kalemi ekleme formuna yönlendirir (3.6.2).
“Bütçesiz Devam Et”: İşlem, bütçesiz olarak kaydedilir.




Manuel Seçim:
Kullanıcı, önerilen kalemi reddedebilir ve tüm bütçe kalemlerinden birini manuel seçebilir (dropdown veya liste).


Onay:
Eşleştirme kaydedildiğinde, toast mesajı: “İşlem, [Kategori/Alt Kategori] bütçesine eşleştirildi.”




İşlem Girişi Sırasında Eşleştirme:
İşlem giriş formunda (04-03, 3.5.4), kategori, alt kategori ve hesap seçildikten sonra bütçe eşleştirme adımı gösterilir.
Sistem, eşleşen bütçe kalemlerini önerir (otomatik öneri mantığı).
Kullanıcı, öneriyi onaylar, manuel seçer veya bütçesiz devam eder.
Bütçe aşımı kontrolü: İşlem tutarı, eşleşen bütçe kaleminin tutarını aşarsa, uyarı gösterilir: “Bu işlem, bütçeyi X TL aşıyor. Devam etmek istiyor musunuz?”


Sonradan Eşleştirme:
Ekstrede (04-03, 3.5.3), her işlem satırında “Bütçeye Eşle” CTA’sı bulunur.
CTA tıklandığında, kategori, alt kategori, hesap ve tarihle eşleşen bütçe kalemleri önerilir.
Kullanıcı, önerilen kalemi seçer veya manuel bağlar.
Eşleştirme kaydedildiğinde, ekstre güncellenir (<1 saniye/hesap).
İşlem zaten eşleştirilmişse, “Bütçeye Eşle” yerine “Bütçeyi Düzenle” CTA’sı görünür; kullanıcı mevcut eşleştirmeyi değiştirebilir.


Ekstre Gösterimi:
Eşleştirilen işlemler, ekstrede “Bütçesi var” etiketiyle gösterilir.
Eşleştirilmemiş işlemler, “Bütçesi yok” etiketiyle gösterilir.
Harcama yapılmamış bütçe kalemleri, ekstrede bir satır olarak görünür.
Bütçeden harcama yapıldıysa, kalan bütçe miktarı gösterilir (çift sayımı önlemek için).
Opsiyonel: İşlemler, bütçe kalemi bazında gruplanabilir (bütçelenmiş ve bütçelenmemiş kalemler ayrı gösterilir); detaylar 04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Görüntüleme.


Hata Senaryoları:
Kategori/alt kategori/hesap için eşleşen bütçe kalemi yoksa: “Bütçe kalemi bulunamadı. Yeni bütçe oluşturmak ister misiniz?”
İşlem tarihi, bütçe kaleminin tarih aralığı dışındaysa: “Bu işlem, seçilen bütçe kaleminin tarih aralığıyla uyuşmuyor. Başka bir kalem seçin veya bütçesiz devam edin.”
Geçersiz seçim (örneğin, farklı hesaba bağlı kalem): “Seçilen bütçe kalemi, işlem hesabıyla uyuşmuyor.”


Modülerlik:
Eşleştirme mantığı, nakit hesap modülüne özgü ve bağımsız çalışır.
Kod, nakit hesaplar için ayrı bir klasörde (örneğin, /budget/cash-account/match-transaction) yazılmalı, diğer hesap türlerinden bağımsız olmalı.
Lovable.dev talimatları: Kod, mimari yoruma izin vermeden yazılmalı; sadece tanımlı eşleştirme mantığını uygulamalı.
Dosya yapısı: /budget/cash-account/match-transaction.ts gibi net bir yol izlenmeli.
Hata mesajları, spesifik ve net olmalı (örneğin, “Passing budget” yerine “Seçilen bütçe kalemi, işlem hesabıyla uyuşmuyor”).


Tasarım Tutarlılığı:
Eşleştirme formu ve CTA’lar, merkezi bir tasarım sisteminden çekilmeli; detaylar 06-ux-ui-tasarim-dokumani.md.


Performans:
Öneri yüklenmesi, eşleştirme kaydı ve ekstre güncellemeleri <1 saniye/hesap hedeflenir.
Öneri algoritması, 5.000 kullanıcı için optimize edilmeli (03-risk-yonetim-plani.md).



Bağlantılar:

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.4 İşlem Girişi için işlem girişi akışı
04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Görüntüleme için ekstre gösterimi ve gruplama
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4 için kategori/alt kategori
07-teknik-tasarim-dokumani.md için veri tabanı yapısı
06-ux-ui-tasarim-dokлара için form ve CTA tasarımı
03-risk-yonetim-plani.md için performans ve Lovable.dev riskleri

3.6.4 Bütçe Kalemi Özellikleri

Tanım: Bütçe kalemleri, tekrarlanma (günlük, haftalık, aylık vb.) ve otomatik kayıt özelliklerini destekler.
Detaylar:
Tekrarlanma seçenekleri ve tarih aralığı, 3.6.2’de tanımlı.
Otomatik kayıt, yeni ekstre oluşturulduğunda tekrarlanan kalemlerin yansıtılmasını sağlar (04-03, 3.5.2 Ekstre Oluşumu).


Bağlantılar:
04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.2 Ekstre Oluşumu
06-ux-ui-tasarim-dokumani.md için form tasarımı



3.6.5 Bütçe Kalemi Girme UX/UI Kolaylığı
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, bütçe planıma birden fazla gelir veya gider kalemini hızlı ve kolay bir şekilde ekleyebilmeliyim ki finansal hedeflerimi planlarken zaman kaybetmeyeyim ve tekrarlayan girişlerden kaçınayım.
Kabul Kriterleri:

Kullanıcı, Bütçeler Sayfası’nda bütçe planı kartındaki “Kalem Ekle” CTA’sına basar.
Modal açılır:
“Tek kalem ekle” (3.6.2 formuna yönlendirir).
“Çoklu giriş yap” (hiyerarşik akordeon arayüzüne yönlendirir).


Çoklu giriş ekranı, kategori modülünden (04-02, 3.4) alınan kullanıcının tanımlı kategori ve alt kategori yapısıyla önceden doldurulmuş olarak açılır.
Arayüz Yapısı:
Kategori Akordeonları: Her kategori (örneğin, “Market”, “Ev”), bir üst seviye akordeon başlığıdır. Varsayılan olarak tüm kategoriler katlanmış, kullanıcı birini açar.
Alt Kategori Akordeonları: Kategori akordeonu açıldığında, ilgili alt kategoriler (örneğin, “Gıda”, “Faturalar”) alt seviye akordeonlar olarak görünür.
Bütçe Kalemi Formu: Alt kategori akordeonu açıldığında, “Bütçe Ekle” butonu görünür. Butona basıldığında, 3.6.2’deki form alanları açılır:
İşlem Tipi: Toggle (Gelir/Gider), zorunlu.
Hesap: Dropdown, nakit hesap listesinden seçilir, zorunlu (04-03, 3.5.1).
Tutar: Input, tam sayı ve küsurat (örneğin, 15,50 TL), virgülden sonra 2 hane, pozitif, zorunlu.
Tekrarlanma Durumu: Toggle (Var/Yok), zorunlu.
Tekrarlanma “Yok”sa: Tarih seçici, açık ekstre dönemi içinde bir tarih (örneğin, 1-30 Nisan 2025), zorunlu.
Tekrarlanma “Var”sa:
Tekrarlanma Sıklığı: Dropdown (günlük, haftalık, aylık, ayın ilk günü, ayın son günü, ayın ilk iş günü, ayın son iş günü, iki haftada bir, üç haftada bir, 3 ayda bir, 6 ayda bir), zorunlu.
Tarih Aralığı: Dropdown (“Bütçe planı aktif olduğu sürece” veya belirli bir tarih aralığı). Belirli aralık seçilirse, başlangıç/bitiş tarihi seçici ile girilir (örneğin, 1 Ocak 2025 - 31 Aralık 2025), zorunlu.


Açıklama: Input, 400 karaktere kadar, isteğe bağlı.


Her alt kategoriye birden fazla kalem eklenebilir. Eklenen kalemler, alt kategori akordeonunda liste olarak görünür (örneğin, “Gıda: Kalem 1, Kalem 2”).
Her kalemde “Sil” ikonu, kalemi kaldırır.


Anlık Doğrulama:
Hesap, Tekrarlanma Durumu ve diğer zorunlu alanlar doldurulduğunda, çakışma kontrolü alt kategori bazında yapılır.
Çakışan kalem formunda uyarı görünür (detaylar 06-ux-ui-tasarim-dokumani.md’de tanımlanacak).
Hatalı girişler (negatif tutar, eksik alan) için anlık uyarı: “Tutar pozitif bir sayı olmalı” veya “Hesap seçimi zorunlu.”


Kaydetme:
“Tüm Kalemleri Kaydet” butonu, tüm geçerli kalemleri Supabase’e toplu kaydeder (<1 saniye/hesap).
Kaydetme sonrası özet: “X kalem eklendi, Y kalem çakıştı (örneğin, Market/Gıda, Ev/Faturalar).”
Çakışan kalemler için düzenleme seçeneği sunulur.


Hata Senaryoları:
Geçersiz tutar: “Market/Gıda, Kalem X: Tutar pozitif bir sayı olmalı.”
Eksik alan: “Market/Gıda, Kalem X: Hesap, Tekrarlanma zorunlu.”
Geçersiz tarih: “Market/Gıda, Kalem X: Tarih, açık ekstre dönemi içinde olmalı.”
Çakışma: Anlık uyarı + toplu özet.


Boş Kategori Durumu:
Kullanıcıda tanımlı kategori/alt kategori yoksa, ekran “Kategori ekle” CTA’sıyla açılır ve kullanıcıyı kategori oluşturma akışına (04-02, 3.4) yönlendirir.


Ekstre Yansımaları:
Kaydedilen kalemler, 3.6.2’deki gibi ekstrelerde yansır (tekrarlanma varsa sıklık/tarih aralığına göre, yoksa seçilen tarihe göre).
Güncellemeler zincirleme yapılır (<1 saniye/hesap).


Mobil Uyumluluk:
Hiyerarşik akordeon, mobilde tek sütun, sade açılıp kapanma animasyonları.
Dropdown’lar ve input’lar, mobil klavyeyle uyumlu.
Varsayılan olarak sadece bir kategori akordeonu açık, diğerleri katlanmış.


Performans:
Form yüklenmesi, anlık doğrulama, kaydetme <1 saniye/hesap.
50 kaleme kadar optimize edilir (03-risk-yonetim-plani.md).
Anlık çakışma kontrolü, istemci tarafında (JavaScript) yapılır; toplu kaydetme, batch API ile optimize edilir.


Modülerlik:
Kod, nakit hesaplar için ayrı bir klasörde (örneğin, /budget/cash-account/bulk-add) yazılır, diğer hesap türlerinden bağımsız.
Lovable.dev talimatları: Kod, mimari yoruma izin vermeden yazılır, tanımlı mantığı uygular.
Dosya yapısı: /budget/cash-account/bulk-add.ts.


Tasarım Tutarlılığı:
Form elemanları (butonlar, dropdown, toggle, input), merkezi tasarım sisteminden çekilir (06-ux-ui-tasarim-dokumani.md).
Çakışma uyarıları, UX/UI dokümanında tanımlı renk paleti ve stil rehberine uyar.



Bağlantılar:

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md (3.5.3 Ekstre Yansımaları, 3.5.2 Ekstre Oluşumu)
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md (3.4 Kategori/Alt Kategori)
06-ux-ui-tasarim-dokumani.md (form, modal, akordeon, uyarı tasarımı)
07-teknik-tasarim-dokumani.md (veri tabanı, API)
03-risk-yonetim-plani.md (performans riskleri)

3.6.6 Bütçe Planı Detay Sayfası ve Görselleştirme
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, bütçe planımın kategori, alt kategori ve zaman bazında detaylı analizini görselleştirilmiş bir şekilde inceleyebilmeliyim, gerçekleşen işlemlerle bütçelenen kalemlerimi karşılaştırabilmeliyim ki finansal hedeflerime ne kadar ulaştığımı anlayayım ve planımı optimize edeyim.
Kabul Kriterleri:

Kullanıcı, Bütçeler Sayfası’nda bütçe planı kartındaki “Kalemleri Görüntüle” CTA’sına basarak veya plan detay sayfasına yönlendirilerek bu alana ulaşır.
Sayfa Yapısı:
Başlık ve Genel Bilgiler: Bütçe planı adı, süresi (belirli dönemse başlangıç/bitiş tarihleri), açıklama, statü (yürürlükte/pasif) ve bağlı hesaplar gösterilir.
Özet Kartları: Sayfanın üstünde, 4 kart:
Toplam bütçelenen tutar (gelir/gider ayrı).
Toplam gerçekleşen tutar.
Aşım/tasarruf oranı (örneğin, “%10 aşım, 300 TL fazla”).
Harcama olmayan kategoriler/alt kategoriler (örneğin, “Ulaşım: 300 TL bütçelenen”).


Görselleştirme Alanı: Üç tür görselleştirme içerir:
Loading Bar: Her alt kategori için ayrı, bütçelenen tutara karşı gerçekleşen harcamayı gösterir (örneğin, “Gıda: 500 TL bütçelenen, 400 TL gerçekleşen, %80”).
Pasta Grafiği: Kategori ve alt kategori bazında bütçe dağılımı (örneğin, “Market %40, Ev %50”).
Zaman Grafiği: Tekrarlanan kalemlerin zaman içindeki trendleri (örneğin, “Market: Nisan 400 TL, Mart 350 TL”).


Tablo: Bütçe kalemlerinin detaylı listesi:
Kolonlar: Kategori, alt kategori, işlem tipi, hesap, bütçelenen tutar, gerçekleşen tutar, kalan bütçe, tekrarlanma, tarih.
Her satırda “Düzenle” ve “Sil” ikonları, doğrudan 3.6.2 akışına yönlendirir.


Filtreleme ve Sıralama:
Filtreler:
Kategori/alt kategori: Dropdown.
İşlem tipi: Toggle (Gelir/Gider).
Tarih aralığı: Dropdown (örneğin, “Bu ay”, “Son 3 ay”, “Tüm süre”).
Hesap: Dropdown.


Sıralama:
Tutar (büyükten küçüğe).
Kategori/alt kategori (alfabetik).
Aşım/tasarruf oranı (en çok aşan önce).
Tarih (en yeni önce).




Etkileşim:
Loading bar, pasta grafiği veya zaman grafiği üzerine tıklayınca, tablo ilgili kategori/alt kategori/aya filtrelenir.
Tablo satırları tıklanabilir, detay modal’i açılır (düzenle/sil CTA’ları).




Analiz Özellikleri:
Bütçe Durumu:
Gerçekleşen > Bütçelenen: Kırmızı uyarı (örneğin, “Temizlik: %20 aşım, 40 TL fazla”).
Gerçekleşen < Bütçelenen: Yeşil işaret (örneğin, “Faturalar: %40 tasarruf, 400 TL”).
Harcama yok: Gri işaret (örneğin, “Ulaşım: Henüz harcama yok”).


Zaman Trendi: Tekrarlanan kalemlerin ekstre yansımaları analiz edilir, eksik yansımalar için uyarı: “Gıda kalemi, Nisan için ekstrede yansımadı.”
Hesap Bazlı Analiz: Her hesap için bütçelenen/gerçekleşen özet (örneğin, “Cüzdan: 2.000 TL bütçelenen, 1.800 TL gerçekleşen”).


Ek Özellikler:
Uyarılar: Bütçe aşımı veya harcama olmayan kalemler için toast mesajları (örneğin, “Gıda’da %20 aşım!”).
İhracat: Tabloyu CSV formatında dışa aktarma butonu.


Mobil Uyumluluk:
Görselleştirmeler, tek sütun ve kaydırılabilir:
Loading bar’lar, alt kategori bazında kompakt.
Pasta grafiği, dokunmatik dostu.
Zaman grafiği, son 3 ayı özetler, kaydırılabilir.


Tablo, kompakt (kategori, alt kategori, bütçe/gerçekleşen, durum kolonları).
Filtreleme, açılır menüyle uygulanır.
Animasyonlar sade (loading bar dolumu 0.5 saniye, grafik geçişi 0.3 saniye).


Performans:
Sayfa yüklenmesi, filtreleme, sıralama, görselleştirme güncellemeleri <1 saniye/hesap.
50 kaleme kadar optimize edilir (03-risk-yonetim-plani.md).
Veriler, istemci tarafında önbelleğe alınır; batch API kullanılır.


Modülerlik:
Kod, nakit hesaplar için ayrı bir klasörde (örneğin, /budget/cash-account/plan-details) yazılır, diğer hesap türlerinden bağımsız.
Lovable.dev talimatları: Kod, mimari yoruma izin vermeden yazılır.
Dosya yapısı: /budget/cash-account/plan-details.ts.


Tasarım Tutarlılığı:
Görselleştirmeler, filtreleme elemanları ve tablo, merkezi tasarım sisteminden çekilir (06-ux-ui-tasarim-dokumani.md).
Renk paleti: Aşım (kırmızı), tasarruf (yeşil), nötr (gri), kategori (mavi/yeşil tonlar).


Hata Senaryoları:
Boş veri: “Bu bütçe planında kalem yok. Kalem eklemek ister misiniz?” + “Kalem Ekle” CTA’sı.
Filtre sonucu boş: “Seçilen kriterlere uygun kalem bulunamadı.”
Geçersiz veri: “Bütçe kalemi verileri yüklenemedi, lütfen tekrar deneyin.”



Bağlantılar:

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md (3.5.3 Ekstre Yansımaları, 3.5.4 İşlem Girişi)
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md (3.4 Kategori/Alt Kategori)
06-ux-ui-tasarim-dokumani.md (görselleştirme, filtreleme, tablo tasarımı)
07-teknik-tasarim-dokumani.md (veri tabanı, API)
03-risk-yonetim-plani.md (performans riskleri)

Son Güncelleme: 29 Nisan 2025, Sorumlu: batuhanozgun
