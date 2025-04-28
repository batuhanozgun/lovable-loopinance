Loopinance Fonksiyonel Gereksinimler: Nakit Hesaplar
Bu doküman, Loopinance uygulamasının nakit hesap yönetimi işlevlerine ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
3. Fonksiyonel Gereksinimler
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


Bağlantılar: 07-teknik-tasarim-dokumani.md için modüler yapı, 06-ux-ui-tasarim-dokumani.md için modal tasarımı.

3.5.2. Ekstre Oluşumu

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesap oluşturduğumda, kesim gününe bağlı olarak mevcut dönem ekstresi ve gelecek 11 dönem ekstreleri otomatik oluşmalı ki bir yıllık finansal öngörüyle bütçemi takip edebileyim.
Kabul Kriterleri:
Hesap oluşturulduğunda, Supabase veri tabanına kaydedilir ve ekstreler otomatik oluşur:
Mevcut dönem ekstresi, seçilen kesim gününe göre belirlenir.
Gelecek 11 dönem ekstresi, kesim gününe bağlı olarak oluşturulur (bir yıllık planlama).


Ekstre statüsü (açık, kapalı, gelecek), kesim gününe göre otomatik yönetilir:
Kesim günü geçtiğinde, mevcut ekstre kapanır, bir gelecek ekstre açılır.
Yeni bir gelecek ekstre (11’inci) eklenir, toplam 11 gelecek dönem korunur.
Kullanıcı, kapalı ekstreyi yeniden açabilir, bakiyeler ve sonraki ekstreler güncellenir (detaylar 3.5.8 Kapalı Ekstre Açma).
Günlük batch işlemi (her gece), her hesabın kesim gününe özgü ekstre statülerini günceller.


Kullanıcı, oluşum sırasında bir modal loading ekranı görür; ekran, daktilo efektiyle (her mesaj 0.3 saniye) şu mesajları gösterir:
“Hesabınız yaratılıyor”
“Mevcut dönem ekstreniz yaratılıyor”
“Gelecek dönem ekstreler yaratılıyor”


Loading ekranı tamamlandığında (<2 saniye), kullanıcı otomatik olarak hesaplar sayfasına yönlendirilir.
Ekstre oluşumu <1 saniye sürer, nakit hesap modülüne özgü ve bağımsız çalışır.
Batch performansı, tahmini 5.000 kullanıcıya göre hedeflenir, detaylar 07-teknik-tasarim-dokumani.md netleşecek.
Veri tabanı yapısı, 07-teknik-tasarim-dokumani.md tanımlanacak.


Bağlantılar: 07-teknik-tasarim-dokumani.md için veri tabanı ve ekstre mantığı, 06-ux-ui-tasarim-dokumani.md için loading ekranı tasarımı, 03-risk-yonetim-plani.md için performans riskleri ve Lovable.dev’in geçmiş CRUD sorunları.

3.5.3. Ekstre Görüntüleme

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabımın ekstrelerini listeleyip detaylarını görebilmeliyim ki gerçekleşen ve bütçelenen finansal durumumu net bir şekilde takip edebileyim.
Kabul Kriterleri:
Hesaplar Sayfası:
Hesap, bir kart olarak gösterilir; kartta hesap adı, kapanış bakiyesi, açık ekstre kesim tarihi, düzenle/sil ikonları, “İşlem Gir” ve “Ekstreler” CTA tuşları bulunur.
Kart, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Ekstreler Sayfası:
“Güncel Dönem”, “Gelecek Dönem”, “Geçmiş Dönem” başlıkları altında ekstre kartları listelenir.
Her ekstre kartında: dönem başlangıcı, dönem kapanışı, gerçek açılış/kapanış bakiyeleri, bütçelenen açılış/kapanış bakiyeleri, detay ikonu, “İşlem Gir” CTA’sı, kapalı ekstrelerde “kilitli asma kilit” ikonu.
Geçmiş ekstreler kalıcıdır, silinemez, 5 yılı dolduranlar arşivlenir ve kullanıcılar tarafından erişilebilir.
Liste, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Ekstre Detay Sayfası:
Ekstre Bilgileri: Hesap adı, dönem, açılış bakiyesi, kapanış bakiyesi, bütçelenen açılış/kapanış bakiyeleri, toplam gelir (gerçekleşen ve bütçelenen), toplam gider (gerçekleşen ve bütçelenen), ekstre statüsü (açık, kapalı, gelecek).
Bütçe Entegrasyonu (04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.3):
Eşleştirilen işlemler, işlem satırında “Bütçesi var” etiketiyle gösterilir.
Eşleştirilmemiş işlemler, “Bütçesi yok” etiketiyle gösterilir.
Harcama yapılmamış bütçe kalemleri, işlem listesinde bir satır olarak görünür (örneğin, “Market/Gıda, Bütçe: 100 TL, Harcama: 0 TL”).
Bütçeden harcama yapıldıysa, kalan bütçe miktarı gösterilir (örneğin, “Market/Gıda, Bütçe: 100 TL, Kalan: 40 TL”).
Çift sayımı önlemek için, bütçe kalemi satırında yalnızca kalan bütçe miktarı gösterilir; harcanan kısım, eşleştirilen işlemlerle işlem satırlarında yansır.


İşlemler Listesi:
Her işlem satırında: tarih, saat, kategori, alt kategori, tutar (giderler kırmızı, gelirler yeşil), açıklama (akordiyonla açılır, sadece açıklama içerir), bütçe etiketi (“Bütçesi var/yok”), düzenle/sil ikonları.
Bütçe kalemi satırlarında: kategori, alt kategori, bütçe tutarı, kalan tutar, açıklama (varsa, akordiyonla açılır).
Varsayılan sıralama: Tarihe göre (en yeniden eskiye).
Kullanıcı, listeyi şu seçeneklerle sıralayabilir: tutar (büyükten küçüğe), kategori (alfabetik), açıklama (alfabetik).
Opsiyonel: Kullanıcı, sadece bütçelenen kalemleri veya sadece gerçekleşen işlemleri filtreleyebilir; filtreleme arayüzü detayları 06-ux-ui-tasarim-dokumani.md.


Gruplama (Opsiyonel):
Kullanıcı, “Bütçeye göre grupla” CTA butonuyla gruplamayı etkinleştirebilir.
Gruplama etkinleştirildiğinde, işlemler iki ana grupta gösterilir:
Bütçelenmiş İşlemler: “Bütçesi var” etiketli işlemler ve ilgili bütçe kalemleri, kategori bazında alt gruplara ayrılır (örneğin, “Market/Gıda”, “Ev/Faturalar”).
Bütçelenmemiş İşlemler: “Bütçesi yok” etiketli işlemler, kategori bazında alt gruplara ayrılır.


Grup içi sıralama: Varsayılan olarak tarihe göre (en yeniden eskiye); kullanıcı, tutar (büyükten küçüğe), kategori (alfabetik) veya açıklama (alfabetik) bazında sıralayabilir.
Gruplama kapatıldığında, işlemler varsayılan olarak tarihe göre (en yeniden eskiye) sıralı listelenir; kullanıcı sıralamayı tutar, kategori veya açıklama bazında değiştirebilir.
Gruplama arayüzü (buton, grup başlıkları) detayları [06-ux-ui-tasarim-dokumani.md](#].


“İşlem Gir” CTA’sı, kullanıcıyı işlem giriş formuna yönlendirir (3.5.5 İşlem Girme).
Kapalı ekstrede işlemler görüntülenebilir, ancak düzenleme/silme için ekstre açılmalıdır (3.5.8 Kapalı Ekstre Açma).
Sayfa, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Bakiye Türleri:
Açılış Bakiyesi: İlk hesapta başlangıç bakiyesi, sonraki ekstrelerde önceki kapanış bakiyesi.
Kapanış Bakiyesi: Açılış bakiyesi + işlemler (gelir/gider), dönem kapanana kadar dinamik, sonra sabit (kullanıcı yeniden açarsa değişebilir).
Bütçelenen Açılış/Kapanış Bakiyeleri: Gerçekleşen + bütçelenen işlemlerin toplamı (04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.3).
Gerçekleşen Gelir/Gider: İşlemlerden gelen gelir/gider.
Bütçelenen Gelir/Gider: Gerçekleşen + bütçelenen gelir/gider.


Ekstre görüntüleme, nakit hesap modülüne özgü ve bağımsız çalışır.
Modülerlik:
Kod, nakit hesaplar için ayrı bir klasörde (örneğin, /cash-account/statement-view) yazılmalı, diğer hesap türlerinden bağımsız olmalı.
Lovable.dev talimatları:
Kod, mimari yoruma izin vermeden yazılmalı; sadece tanımlı görüntüleme mantığını uygulamalı.
Dosya yapısı: /cash-account/statement-view.ts gibi net bir yol izlenmeli.
Hata mesajları, spesifik ve net olmalı (örneğin, “Geçersiz veri” yerine “Ekstre yüklenemedi, lütfen tekrar deneyin”).




Tasarım Tutarlılığı:
Kartlar, liste, etiketler ve CTA’lar, merkezi bir tasarım sisteminden çekilmeli; detaylar 06-ux-ui-tasarim-dokumani.md.


Performans:
Ekstre yüklenmesi ve gruplama işlemleri <1 saniye/hesap hedeflenir.
Performans, 5.000 kullanıcı için optimize edilmeli (03-risk-yonetim-plani.md).


Bağlantılar:
07-teknik-tasarim-dokumani.md için veri tabanı ve ekstre mantığı.
06-ux-ui-tasarim-dokumani.md için kart, liste, akordiyon ve gruplama arayüzü tasarımı.
03-risk-yonetim-plani.md için performans riskleri.
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4 için kategori/alt kategori.
04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.3 için bütçe entegrasyonu.





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


Bağlantılar: 07-teknik-tasarim-dokumani.md için modüler yapı ve ekstre hesaplama mantığı, 06-ux-ui-tasarim-dokumani.md için form ve modal tasarımı, 03-risk-yonetim-plani.md için performans riskleri.

3.5.5. İşlem Girme

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabıma gelir veya gider işlemi girebilmeliyim ki finansal hareketlerimi kolayca takip edebileyim.
Kabul Kriterleri:
Kullanıcı, 04-01-fonksiyonel-gereksinimler-ana-sayfa-ve-kayit.md, 3.1 Ana Sayfada Karşılama, Hesaplar Sayfası’ndaki kartlardan, ekstre kartlarından veya Ekstre Detay Sayfası’ndan işlem girişine başlayabilir.
İşlem giriş formu, modal olarak açılır; mobil ekranlarda kaydırma (scroll) UX/UI açısından değerlendirilir.
Form Alanları:
Hesap Seçimi: Kullanıcı, hesap kartından veya ekstre kartından geldiğinde alan inaktif ve ilgili hesap otomatik seçilidir; diğer durumlarda kullanıcı hesabı seçer.
Tarih: Varsayılan olarak bugünün tarihi gelir, kullanıcı açık ekstre dönemi içindeki tarihlerden birini seçebilir (örneğin, 1-30 Nisan 2025).
Gelir/Gider: Mobil dostu seçim formatı (örneğin, toggle veya radio buton) ile gelir veya gider seçilir.
Kategori/Alt Kategori: Kullanıcı kategoriyi seçer, seçilen kategoriye bağlı alt kategoriler otomatik yüklenir.
Tutar: Tam sayı ve küsurat girişine uygun (örneğin, 15,50 TL), virgülden sonra 2 hane desteklenir.
Açıklama: 400 karaktere kadar serbest metin.


Bütçe Eşleştirme (04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.3):
Kategori, alt kategori ve hesap seçildikten sonra, sistem eşleşen bütçe kalemlerini önerir.
Otomatik Öneri:
Tek bir kalem eşleşirse: “Bu işlem, [Kategori/Alt Kategori] bütçesiyle eşleşiyor (Tutar: X TL, Tekrarlanma: Y)” mesajı gösterilir.
Eşleşen kalem yoksa: “Bütçe kalemi bulunamadı. Yeni bütçe oluşturmak ister misiniz?” mesajıyla iki seçenek sunulur:
“Bütçe Oluştur”: Kullanıcıyı bütçe kalemi ekleme formuna yönlendirir (04-04, 3.6.2 Bütçe Kalemi Ekleme).
“Bütçesiz Devam Et”: İşlem, bütçesiz olarak kaydedilir.




Manuel Seçim: Kullanıcı, önerilen kalemi reddedebilir ve tüm bütçe kalemlerinden birini manuel seçebilir (dropdown veya liste).
Bütçe Aşımı Kontrolü: İşlem tutarı, eşleşen bütçe kaleminin tutarını aşarsa, uyarı gösterilir: “Bu işlem, bütçeyi X TL aşıyor. Devam etmek istiyor musunuz?”
Onay: Eşleştirme kaydedildiğinde, toast mesajı: “İşlem, [Kategori/Alt Kategori] bütçesine eşleştirildi.”


Hata Senaryoları:
İşlem kaydedilmeden önce nakit hesabın bakiyesi kontrol edilir; eksi bakiyeye düşecekse hata mesajı gösterilir (örneğin, “Yetersiz bakiye, işlem kaydedilemez”).
Kategori/alt kategori seçilmezse: Toast mesajı, “Kategori ve alt kategori seçimi zorunlu.”
Hesap seçilmezse: Toast mesajı, “Bir nakit hesap seçilmeli.”
Geçersiz tutar (negatif veya sıfır): Toast mesajı, “Tutar pozitif bir sayı olmalı.”
Tarih, açık ekstre dönemi dışındaysa: Toast mesajı, “Tarih, açık ekstre dönemi içinde olmalı.”
İşlem tarihi, bütçe kaleminin tarih aralığı dışındaysa: “Bu işlem, seçilen bütçe kaleminin tarih aralığıyla uyuşmuyor. Başka bir kalem seçin veya bütçesiz devam edin.”
Geçersiz bütçe seçimi (örneğin, farklı hesaba bağlı kalem): “Seçilen bütçe kalemi, işlem hesabıyla uyuşmuyor.”


Kaydetme:
“İşlemi Kaydet” tuşuyla işlem Supabase’e kaydedilir.
İşlem kaydedildiğinde:
Açık ekstredeki kapanış bakiyesi, gerçekleşen gelir/gider ve bütçelenen bakiyeler güncellenir.
Gelecek ekstreler zincirleme güncellenir (açılış/kapanış bakiyeleri, bütçelenen bakiyeler).
Kullanıcı, Ekstreler Sayfası’ndan açık ekstreyi açtığında işlemi detaylarda görür (tarih, saat, kategori, alt kategori, tutar, açıklama, bütçe etiketi, düzenle/sil ikonları).




Form yüklenmesi ve işlem kaydı <1 saniye, zincirleme güncellemeler <1 saniye/hesap hedeflenir.
İşlem girme, nakit hesap modülüne özgü ve bağımsız çalışır.
Modülerlik:
Kod, nakit hesaplar için ayrı bir klasörde (örneğin, /cash-account/transaction-entry) yazılmalı, diğer hesap türlerinden bağımsız olmalı.
Lovable.dev talimatları:
Kod, mimari yoruma izin vermeden yazılmalı; sadece tanımlı form mantığını uygulamalı.
Dosya yapısı: /cash-account/transaction-entry.ts gibi net bir yol izlenmeli.
Hata mesajları, spesifik ve net olmalı (örneğin, “Geçersiz veri” yerine “Kategori ve alt kategori seçimi zorunlu”).




Tasarım Tutarlılığı:
Form elemanları (butonlar, dropdown, toggle, input) ve bütçe eşleştirme arayüzü, merkezi bir tasarım sisteminden çekilmeli; detaylar 06-ux-ui-tasarim-dokumani.md.


Performans:
Bütçe öneri yüklenmesi ve eşleştirme kaydı <1 saniye/hesap hedeflenir.
Performans, 5.000 kullanıcı için optimize edilmeli (03-risk-yonetim-plani.md).




Bağlantılar: 04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4, 04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.3, 3.5.3 Ekstre Görüntüleme, 07-teknik-tasarim-dokumani.md için veri tabanı yapısı, 06-ux-ui-tasarim-dokumani.md için modal ve form tasarımı, 03-risk-yonetim-plani.md için performans riskleri.

3.5.6. İşlem Düzenleme ve Silme

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabımdaki bir işlemi düzenleyebilmeli veya silebilmeliyim ki finansal hareketlerimi güncel tutabileyim.
Kabul Kriterleri:
Düzenleme:
Ekstre Detay Sayfası’nda işlem satırında düzenle ikonu görünür.
Düzenle ikonuna tıklayınca, işlem giriş formu modal olarak açılır; mevcut bilgiler (hesap, tarih, gelir/gider, kategori/alt kategori, tutar, açıklama, bütçe eşleştirmesi) dolu gelir.
Kullanıcı bilgileri değiştirip kaydeder; nakit hesabın bakiyesi kontrol edilir, eksi bakiyeye düşecekse hata mesajı gösterilir (örneğin, “Yetersiz bakiye, işlem kaydedilemez”).
Değişiklik sonrası açık ekstredeki kapanış bakiyesi, gerçekleşen gelir/gider, bütçelenen bakiyeler ve gelecek ekstreler zincirleme güncellenir.


Silme:
Ekstre Detay Sayfası’nda işlem satırında sil ikonu görünür.
Sil ikonuna tıklayınca onay modal’i açılır; onaylanırsa işlem silinir.
Silme sonrası nakit hesabın bakiyesi kontrol edilir, eksi bakiyeye düşecekse hata mesajı gösterilir (örneğin, “Yetersiz bakiye, işlem silinemez”).
Silme sonrası açık ekstre ve gelecek ekstreler zincirleme güncellenir.


Kapalı ekstrede düzenleme/silme için ekstre açılmalıdır (3.5.8 Kapalı Ekstre Açma).
Düzenleme/silme ve zincirleme güncellemeler <1 saniye hedeflenir.
İşlem düzenleme/silme, nakit hesap modülüne özgü ve bağımsız çalışır.


Bağlantılar: 3.5.5 İşlem Girme, 3.5.3 Ekstre Görüntüleme, 3.5.8 Kapalı Ekstre Açma, 07-teknik-tasarim-dokumani.md için veri tabanı yapısı, 06-ux-ui-tasarim-dokumani.md için modal tasarımı, 03-risk-yonetim-plani.md için performans riskleri.

3.5.7. Ekstre Kapanışı

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ekstremin kapanış sürecinde bilgilendirilmeli ve yeni dönem ekstresine geçiş yapabilmeliyim ki finansal takibimi kesintisiz sürdüreyim.
Kabul Kriterleri:
Bildirimler:
Kapanıştan 1 hafta önce: Uygulama içi bildirim (zil ikonunda kırmızı nokta) ve mail gönderilir, “Ekstreniz 7 gün sonra kapanacak” uyarısı.
Kapanış günü: Gün içinde bildirim ve mail, “Ekstreniz bu gece kapanacak, işlemleri girin” uyarısı.
Kapanış sonrası: Bildirim ve mail, “Ekstreniz kapandı, yeni dönem [tarih aralığı] açıldı” mesajı.
Bildirimler bölümü: Zil ikonunda son 5 bildirim görünür, “Hepsini Gör” ile bildirim sayfasına yönlendirme (detaylar sonraki hikayelerde).


Kapanış Süreci:
Kapanış gecesi, mevcut ekstre kapanır, yeni dönem ekstresi açılır.
Gelecek ekstre sayısı 10’a düşer, yeni bir gelecek ekstre eklenir (1+11 yapı korunur).
Yeni işlem girişleri, açık ekstreye yapılır.


Kapanış ve yeni ekstre oluşturma <1 saniye/hesap hedeflenir.
Ekstre kapanışı, nakit hesap modülüne özgü ve bağımsız çalışır.


Bağlantılar: 3.5.2 Ekstre Oluşumu, 3.5.8 Kapalı Ekstre Açma, 07-teknik-tasarim-dokumani.md için veri tabanı yapısı, 06-ux-ui-tasarim-dokumani.md için bildirim tasarımı, 03-risk-yonetim-plani.md için performans riskleri.

3.5.8. Kapalı Ekstre Açma

Kullanıcı Hikayesi: Bireysel kullanıcı olarak, kapalı bir ekstreyi yeniden açabilmeliyim ki geçmiş işlemleri düzenleyebileyim veya yeni işlem girebileyim.
Kabul Kriterleri:
Erişim:
Ekstreler Sayfası’nda kapalı ekstre kartında “kilitli asma kilit” ikonu görünür.
Kilit ikonuna tıklayınca diyalog açılır: “Ekstreyi işlem girmeye açmak mı istiyorsunuz?” Evet seçilirse ekstre açılır, ikon “açık asma kilit” olur.
Açık ekstrede “İşlem Gir” CTA’sı aktif olur, işlem giriş formu açılır.


Kapalı Ekstre Kısıtlaması:
Kapalı ekstrede “İşlem Gir”, düzenle veya sil tıklanırsa uyarı diyalogu çıkar: “Kapalı ekstreye işlem eklemek için ekstreyi açmalısınız.” Diyalogda “Aç” butonuyla ekstre açılır.
Ekstre Detay Sayfası’nda işlemler görüntülenebilir, ancak düzenleme/silme için aynı uyarı diyalogu çıkar.


Çift Açık Ekstre Kontrolü:
Aynı hesapta iki açık ekstre varsa, uygulama günlük bildirim gönderir: “Hesapta fazladan açık ekstre var, lütfen eski ekstreyi kapatın.” Bildirim, Ekstreler Sayfası’na yönlendirir.


Ekstre açma ve bildirim işlemleri <1 saniye hedeflenir.
Kapalı ekstre açma, nakit hesap modülüne özgü ve bağımsız çalışır.


Bağlantılar: 3.5.5 İşlem Girme, 3.5.6 İşlem Düzenleme/Silme, 3.5.3 Ekstre Görüntüleme, 3.5.7 Ekstre Kapanışı, 07-teknik-tasarim-dokumani.md için veri tabanı yapısı, 06-ux-ui-tasarim-dokumani.md için diyalog tasarımı, 03-risk-yonetim-plani.md için performans riskleri.

Son Güncelleme: 28 Nisan 2025, Sorumlu: batuhanozgun
