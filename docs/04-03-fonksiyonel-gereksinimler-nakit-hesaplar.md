Loopinance Fonksiyonel Gereksinimler: Nakit Hesaplar
Bu doküman, Loopinance uygulamasının nakit hesap yönetimi işlevlerine ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
3. Fonksiyonel Gereksinimler
3.5. Nakit Hesap Yönetimi
3.5.1. Hesap Oluşturma
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesap oluşturmak için özelleşmiş, kademeli bir form kullanabilmeliyim ki ihtiyaçlarıma uygun ve mobil dostu olsun.Kabul Kriterleri:

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
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesap oluşturduğumda, kesim gününe bağlı olarak mevcut dönem ekstresi ve gelecek 11 dönem ekstreleri otomatik oluşmalı ki bir yıllık finansal öngörüyle bütçemi takip edebileyim.Kabul Kriterleri:

Hesap oluşturulduğunda, Supabase veri tabanına kaydedilir ve ekstreler otomatik oluşur:
Mevcut dönem ekstresi, seçilen kesim gününe göre belirlenir.
Gelecek 11 dönem ekstresi, kesim gününe bağlı olarak oluşturulur (bir yıllık planlama).


Ekstre statüsü (açık, kapalı, gelecek), kesim gününe göre otomatik yönetilir:
Kesim günü geçtiğinde, mevcut ekstre kapanır, bir gelecek ekstre açılır.
Yeni bir gelecek ekstre (11’inci) eklenir, toplam 11 gelecek dönem korunur.
Kullanıcı, kapalı ekstreyi yeniden açabilir, bakiyeler ve sonraki ekstreler güncellenir (detaylar 3.5.8 Kapalı Ekstre Açma).
Günlük batch işlemi (her gece), her hesabın kesim gününe özgü ekstre statülerini günceller.


Yeni ekstre oluşturulduğunda, kullanıcının Ana Bütçesindeki ilgili tekrarlanan bütçe kalemleri otomatik olarak yeni ekstreye yansıtılır (04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.2).
Kullanıcı, oluşum sırasında bir modal loading ekranı görür; ekran, daktilo efektiyle (her mesaj 0.3 saniye) şu mesajları gösterir:
“Hesabınız yaratılıyor”
“Mevcut dönem ekstreniz yaratılıyor”
“Gelecek dönem ekstreler yaratılıyor” (Ana Bütçe kalemleri yansıtılıyor)


Loading ekranı tamamlandığında (<2 saniye), kullanıcı otomatik olarak hesaplar sayfasına yönlendirilir.
Ekstre oluşumu <1 saniye sürer, nakit hesap modülüne özgü ve bağımsız çalışır.
Batch performansı, tahmini 5.000 kullanıcıya göre hedeflenir, detaylar 07-teknik-tasarim-dokumani.md netleşecek.
Veri tabanı yapısı, 07-teknik-tasarim-dokumani.md tanımlanacak.

Bağlantılar: 07-teknik-tasarim-dokumani.md için veri tabanı ve ekstre mantığı, 06-ux-ui-tasarim-dokumani.md için loading ekranı tasarımı, 03-risk-yonetim-plani.md için performans riskleri ve Lovable.dev’in geçmiş CRUD sorunları, 04-04-fonksiyonel-gereksinimler-butce-planlama.md (Ana Bütçe kalemlerinin yansıması).
3.5.3. Ekstre Görüntüleme
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabımın ekstrelerini listeleyip detaylarını görebilmeliyim ki gerçekleşen ve Ana Bütçeme göre bütçelenen finansal durumumu net bir şekilde takip edebileyim.Kabul Kriterleri:

Hesaplar Sayfası:
Hesap, bir kart olarak gösterilir; kartta hesap adı, kapanış bakiyesi, açık ekstre kesim tarihi, düzenle/sil ikonları, “İşlem Gir” ve “Ekstreler” CTA tuşları bulunur.
Kart, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Ekstreler Sayfası:
“Güncel Dönem”, “Gelecek Dönem”, “Geçmiş Dönem” başlıkları altında ekstre kartları listelenir.
Her ekstre kartında: dönem başlangıcı, dönem kapanışı, gerçek açılış/kapanış bakiyeleri, Ana Bütçeye göre bütçelenen açılış/kapanış bakiyeleri, detay ikonu, “İşlem Gir” CTA’sı, kapalı ekstrelerde “kilitli asma kilit” ikonu.
Geçmiş ekstreler kalıcıdır, silinemez, 5 yılı dolduranlar arşivlenir ve kullanıcılar tarafından erişilebilir.
Liste, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Ekstre Detay Sayfası:
Ekstre Bilgileri: Hesap adı, dönem, açılış bakiyesi, kapanış bakiyesi, Ana Bütçeye göre bütçelenen açılış/kapanış bakiyeleri, toplam gelir (gerçekleşen ve Ana Bütçeye göre bütçelenen), toplam gider (gerçekleşen ve Ana Bütçeye göre bütçelenen), ekstre statüsü (açık, kapalı, gelecek).
Bütçe Entegrasyonu (04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.2):
Ana Bütçe kalemiyle eşleştirilen işlemler, işlem satırında “Bütçesi var” etiketiyle gösterilir.
Eşleştirilmemiş işlemler, “Bütçesi yok” etiketiyle gösterilir.
Ana Bütçedeki harcama yapılmamış bütçe kalemleri, işlem listesinde bir satır olarak görünür (örneğin, “Market/Gıda, Bütçe: 100 TL, Harcama: 0 TL”).
Ana Bütçedeki bir kalemden harcama yapıldıysa, kalan bütçe miktarı gösterilir (örneğin, “Market/Gıda, Bütçe: 100 TL, Kalan: 40 TL”).
Çift sayımı önlemek için, bütçe kalemi satırında yalnızca kalan bütçe miktarı gösterilir; harcanan kısım, eşleştirilen işlemlerle işlem satırlarında yansır.


İşlemler Listesi:
Her işlem satırında: tarih, saat, kategori, alt kategori, tutar (giderler kırmızı, gelirler yeşil), açıklama (akordiyonla açılır), bütçe etiketi (“Bütçesi var/yok” - Ana Bütçe’ye göre), düzenle/sil ikonları.
Ana Bütçe kalemi satırlarında: kategori, alt kategori, bütçe tutarı, kalan tutar, açıklama (varsa, akordiyonla açılır).
Varsayılan sıralama: Tarihe göre (en yeniden eskiye).
Kullanıcı, listeyi tutar (büyükten küçüğe), kategori (alfabetik) veya açıklama (alfabetik) bazında sıralayabilir.
Opsiyonel: Kullanıcı, sadece bütçelenen (Ana Bütçe) kalemleri veya gerçekleşen işlemleri filtreleyebilir; filtreleme arayüzü detayları 06-ux-ui-tasarim-dokumani.md.


Gruplama (Opsiyonel):
“Bütçeye göre grupla” CTA butonuyla etkinleştirilir.
Gruplama etkinleştirildiğinde, işlemler iki ana grupta gösterilir:
Bütçelenmiş İşlemler (Ana Bütçe): “Bütçesi var” etiketli işlemler ve ilgili Ana Bütçe kalemleri, kategori bazında alt gruplara ayrılır.
Bütçelenmemiş İşlemler: “Bütçesi yok” etiketli işlemler, kategori bazında alt gruplara ayrılır.


Grup içi sıralama: Varsayılan olarak tarihe göre (en yeniden eskiye); kullanıcı, tutar (büyükten küçüğe), kategori (alfabetik) veya açıklama (alfabetik) bazında sıralayabilir.
Gruplama kapatıldığında, işlemler tarihe göre (en yeniden eskiye) sıralı listelenir; kullanıcı sıralamayı değiştirebilir.
Gruplama arayüzü detayları 06-ux-ui-tasarim-dokumani.md.


“İşlem Gir” CTA’sı, kullanıcıyı işlem giriş formuna yönlendirir (3.5.5 İşlem Girme).
Kapalı ekstrede işlemler görüntülenebilir, ancak düzenleme/silme için ekstre açılmalıdır (3.5.8 Kapalı Ekstre Açma).
Sayfa, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Bakiye Türleri:
Açılış Bakiyesi: İlk hesapta başlangıç bakiyesi, sonraki ekstrelerde önceki kapanış bakiyesi.
Kapanış Bakiyesi: Açılış bakiyesi + işlemler (gelir/gider), dönem kapanana kadar dinamik, sonra sabit.
Bütçelenen Açılış/Kapanış Bakiyeleri: Gerçekleşen + Ana Bütçedeki bütçelenen işlemlerin toplamı.
Gerçekleşen Gelir/Gider: İşlemlerden gelen gelir/gider.
Bütçelenen Gelir/Gider: Gerçekleşen + Ana Bütçedeki bütçelenen gelir/gider.


Ekstre görüntüleme, nakit hesap modülüne özgü ve bağımsız çalışır.
Modülerlik: Kod, /cash-account/statement-view klasöründe, diğer hesap türlerinden bağımsız yazılmalı. Lovable.dev talimatları: Kod mimari yoruma izin vermeden yazılmalı, dosya yapısı net olmalı, hata mesajları spesifik olmalı.
Tasarım Tutarlılığı: Kartlar, liste, etiketler ve CTA’lar merkezi tasarım sisteminden çekilmeli; detaylar 06-ux-ui-tasarim-dokumani.md.
Performans: Ekstre yüklenmesi ve gruplama <1 saniye/hesap, 5.000 kullanıcı için optimize edilmeli (03-risk-yonetim-plani.md).

Bağlantılar: 07-teknik-tasarim-dokumani.md için veri tabanı ve ekstre mantığı, 06-ux-ui-tasarim-dokumani.md için kart, liste, akordiyon ve gruplama arayüzü, 03-risk-yonetim-plani.md için performans riskleri, 04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md için kategori/alt kategori, 04-04-fonksiyonel-gereksinimler-butce-planlama.md (Ana Bütçe entegrasyonu).
3.5.4. Hesap Düzenleme ve Silme
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabımı düzenleyebilmeli veya silebilmeliyim ki ihtiyaçlarıma göre güncel tutabileyim.Kabul Kriterleri:

Düzenleme:
İşlem yoksa: 3 adımlı formun tüm alanları (hesap adı, para birimi, başlangıç bakiyesi, açıklama, kesim günü) değiştirilebilir.
İşlem varsa: Hesap adı, açıklama, başlangıç bakiyesi değiştirilebilir; kesim günü değişimi, mevcut dönemden itibaren geçerli olur, geçmiş ekstreler etkilenmez.
Başlangıç bakiyesi veya kesim günü değişirse, ekstreler yeniden hesaplanır (mevcut ve gelecek ekstreler güncellenir, geçmiş ekstreler sabit). Ana Bütçe kalemlerinin yansımaları da güncellenir.
Düzenleme formu, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.


Silme:
Hesap, işlemler ve bağlantılı (Ana Bütçe'deki) bütçe eşleşmeleri silinir, kullanıcıya onay modal’i gösterilir.
Silme işlemi, nakit hesap modülüne özgü ve bağımsız çalışır.


İşlemler, nakit hesap modülüne özgü ve bağımsız çalışır.

Bağlantılar: 07-teknik-tasarim-dokumani.md için modüler yapı ve ekstre hesaplama mantığı, 06-ux-ui-tasarim-dokumani.md için form ve modal tasarımı, 03-risk-yonetim-plani.md için performans riskleri, 04-04-fonksiyonel-gereksinimler-butce-planlama.md (Ana Bütçe).
3.5.5. İşlem Girme
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabıma gelir veya gider işlemi girebilmeliyim ve bu işlemi Ana Bütçemdeki ilgili kalemle eşleştirebilmeliyim ki finansal hareketlerimi kolayca takip edebileyim.Kabul Kriterleri:

Kullanıcı, 04-01-fonksiyonel-gereksinimler-ana-sayfa-ve-kayit.md (3.1 Ana Sayfada Karşılama), Hesaplar Sayfası’ndaki kartlardan, ekstre kartlarından veya Ekstre Detay Sayfası’ndan işlem girişine başlayabilir.
İşlem giriş formu, modal olarak açılır; mobil ekranlarda kaydırma UX/UI açısından değerlendirilir.
Form Alanları:
Hesap Seçimi: Kullanıcı, hesap kartından veya ekstre kartından geldiğinde alan inaktif ve ilgili hesap otomatik seçilidir; diğer durumlarda kullanıcı hesabı seçer.
Tarih: Varsayılan olarak bugünün tarihi gelir, kullanıcı açık ekstre dönemi içindeki tarihlerden birini seçebilir.
Gelir/Gider: Mobil dostu seçim formatı ile gelir veya gider seçilir.
Kategori/Alt Kategori: Kullanıcı kategoriyi seçer, seçilen kategoriye bağlı alt kategoriler otomatik yüklenir.
Tutar: Tam sayı ve küsurat girişine uygun, virgülden sonra 2 hane desteklenir.
Açıklama: 400 karaktere kadar serbest metin.


Bütçe Eşleştirme (Sadece Ana Bütçe ile):
Kategori, alt kategori ve hesap seçildikten sonra, sistem sadece kullanıcının Ana Bütçesi içinde eşleşen bütçe kalem(ler)ini arar ve önerir. Tekrarlanan veya tek seferlik kalemler dikkate alınır.
Otomatik Öneri (Ana Bütçe üzerinden):
Tek bir kalem eşleşirse: “Bu işlem, Ana Bütçenizdeki [Kategori/Alt Kategori] bütçesiyle eşleşiyor (Tutar: X TL, Tekrarlanma: Y)” mesajı gösterilir.
Eşleşen kalem yoksa: “Ana Bütçenizde eşleşen kalem bulunamadı. Ana Bütçeye yeni kalem oluşturmak ister misiniz?” mesajıyla iki seçenek sunulur:
“Ana Bütçeye Kalem Oluştur”: Modal içinde bir alt form açılır (04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.2’ye uygun), kullanıcı kalem oluşturup eşleştirir.
“Bütçesiz Devam Et”: İşlem, bütçesiz olarak kaydedilir.




Manuel Seçim (Ana Bütçe üzerinden): Kullanıcı, önerilen kalemi reddedebilir ve sadece Ana Bütçe'deki tüm bütçe kalemlerinden birini seçebilir (dropdown).
Çoklu Kalem Durumu: Aynı kategori/alt kategori için birden fazla Ana Bütçe kalemi varsa, tarih aralığı en yakın olan önerilir. Kullanıcı, alternatif kalemleri dropdown’dan seçebilir.
Tarih Aralığı Kontrolü: İşlem tarihi, Ana Bütçe kaleminin date_range’ine uymalı. Uymazsa, uyarı: “Tarih, Ana Bütçe kaleminin X-Y aralığına uymuyor. Başka bir kalem seçin veya bütçesiz devam edin.”
Bütçe Aşımı Kontrolü: İşlem tutarı, eşleşen (Ana Bütçe'deki) bütçe kaleminin tutarını aşarsa, uyarı: “Bu işlem, Ana Bütçenizdeki kalemi X TL aşıyor. Devam etmek istiyor musunuz?”
Onay: Eşleştirme kaydedildiğinde, toast mesajı: “İşlem, Ana Bütçenizdeki [Kategori/Alt Kategori] bütçesine eşleştirildi.”


Hata Senaryoları:
İşlem kaydedilmeden önce nakit hesabın bakiyesi kontrol edilir; eksi bakiyeye düşecekse hata mesajı gösterilir (“Yetersiz bakiye, işlem kaydedilemez”).
Kategori/alt kategori seçilmezse: Toast mesajı, “Kategori ve alt kategori seçimi zorunlu.”
Hesap seçilmezse: Toast mesajı, “Bir nakit hesap seçilmeli.”
Geçersiz tutar (negatif veya sıfır): Toast mesajı, “Tutar pozitif bir sayı olmalı.”
Tarih, açık ekstre dönemi dışındaysa: Toast mesajı, “Tarih, açık ekstre dönemi içinde olmalı.”
İşlem tarihi, (Ana Bütçe'deki) bütçe kaleminin tarih aralığı dışındaysa: “Bu işlem, seçilen (Ana Bütçe) kaleminin tarih aralığıyla uyuşmuyor. Başka bir kalem seçin veya bütçesiz devam edin.”
Alternatif Bütçe seçmeye çalışmak: Arayüz sadece Ana Bütçe kalemlerini listelemeli.


Kaydetme:
“İşlemi Kaydet” tuşuyla işlem Supabase’e kaydedilir.
İşlem kaydedildiğinde:
Açık ekstredeki kapanış bakiyesi, gerçekleşen gelir/gider ve (Ana Bütçeye göre) bütçelenen bakiyeler güncellenir.
Gelecek ekstreler zincirleme güncellenir (açılış/kapanış bakiyeleri, Ana Bütçeye göre bütçelenen bakiyeler).
Kullanıcı, Ekstreler Sayfası’ndan açık ekstreyi açtığında işlemi detaylarda görür (tarih, saat, kategori, alt kategori, tutar, açıklama, bütçe etiketi, düzenle/sil ikonları).




Form yüklenmesi ve işlem kaydı <1 saniye, zincirleme güncellemeler <1 saniye/hesap hedeflenir.
İşlem girme, nakit hesap modülüne özgü ve bağımsız çalışır.
Modülerlik: Kod, nakit hesaplar için ayrı bir klasörde yazılmalı. Lovable.dev talimatları uygulanmalı.
Tasarım Tutarlılığı: Form elemanları merkezi tasarım sisteminden çekilmeli; detaylar 06-ux-ui-tasarim-dokumani.md.
Performans: Bütçe öneri yüklenmesi ve eşleştirme kaydı <1 saniye/hesap, 5.000 kullanıcı için optimize edilmeli (03-risk-yonetim-plani.md).

Bağlantılar: 04-01-fonksiyonel-gereksinimler-ana-sayfa-ve-kayit.md, 04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 04-04-fonksiyonel-gereksinimler-butce-planlama.md (Ana Bütçe), 3.5.3 Ekstre Görüntüleme, 07-teknik-tasarim-dokumani.md, 06-ux-ui-tasarim-dokumani.md, 03-risk-yonetim-plani.md.
3.5.6. İşlem Düzenleme ve Silme
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, nakit hesabımdaki bir işlemi düzenleyebilmeli veya silebilmeliyim ki finansal hareketlerimi güncel tutabileyim ve Ana Bütçe eşleşmesini düzeltebileyim.Kabul Kriterleri:

Düzenleme:
Ekstre Detay Sayfası’nda işlem satırında düzenle ikonu görünür.
Düzenle ikonuna tıklayınca, işlem giriş formu modal olarak açılır; mevcut bilgiler (hesap, tarih, gelir/gider, kategori/alt kategori, tutar, açıklama, Ana Bütçe eşleşmesi) dolu gelir.
Kullanıcı bilgileri değiştirip kaydeder; nakit hesabın bakiyesi kontrol edilir, eksi bakiyeye düşecekse hata mesajı gösterilir. Kullanıcı Ana Bütçe eşleşmesini değiştirebilir.
Değişiklik sonrası açık ekstredeki kapanış bakiyesi, gerçekleşen gelir/gider, (Ana Bütçeye göre) bütçelenen bakiyeler ve gelecek ekstreler zincirleme güncellenir.


Silme:
Ekstre Detay Sayfası’nda işlem satırında sil ikonu görünür.
Sil ikonuna tıklayınca onay modal’i açılır; onaylanırsa işlem ve Ana Bütçe eşleşmesi silinir.
Silme sonrası nakit hesabın bakiyesi kontrol edilir, eksi bakiyeye düşecekse hata mesajı gösterilir.
Silme sonrası açık ekstre ve gelecek ekstreler zincirleme güncellenir (Ana Bütçe etkileri dahil).


Kapalı ekstrede düzenleme/silme için ekstre açılmalıdır (3.5.8 Kapalı Ekstre Açma).
Düzenleme/silme ve zincirleme güncellemeler <1 saniye hedeflenir.
İşlem düzenleme/silme, nakit hesap modülüne özgü ve bağımsız çalışır.

Bağlantılar: 3.5.5 İşlem Girme, 3.5.3 Ekstre Görüntüleme, 3.5.8 Kapalı Ekstre Açma, 07-teknik-tasarim-dokumani.md, 06-ux-ui-tasarim-dokumani.md, 03-risk-yonetim-plani.md, 04-04-fonksiyonel-gereksinimler-butce-planlama.md (Ana Bütçe).
3.5.7. Ekstre Kapanışı
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ekstremin kapanış sürecinde bilgilendirilmeli ve yeni dönem ekstresine geçiş yapabilmeliyim ki finansal takibimi kesintisiz sürdüreyim.Kabul Kriterleri:

Bildirimler:
Kapanıştan 1 hafta önce: Uygulama içi bildirim ve mail, “Ekstreniz 7 gün sonra kapanacak” uyarısı.
Kapanış günü: Gün içinde bildirim ve mail, “Ekstreniz bu gece kapanacak, işlemleri girin” uyarısı.
Kapanış sonrası: Bildirim ve mail, “Ekstreniz kapandı, yeni dönem [tarih aralığı] açıldı” mesajı. Ana Bütçe kalemlerinin yeni ekstreye yansıdığı bilgisi eklenebilir.
Bildirimler bölümü: Zil ikonunda son 5 bildirim görünür, “Hepsini Gör” ile bildirim sayfasına yönlendirme.


Kapanış Süreci:
Kapanış gecesi, mevcut ekstre kapanır, yeni dönem ekstresi açılır.
Gelecek ekstre sayısı 10’a düşer, yeni bir gelecek ekstre eklenir (1+11 yapı korunur). Ana Bütçe kalemleri yeni ekstreye yansıtılır.
Yeni işlem girişleri, açık ekstreye yapılır.


Kapanış ve yeni ekstre oluşturma <1 saniye/hesap hedeflenir.
Ekstre kapanışı, nakit hesap modülüne özgü ve bağımsız çalışır.

Bağlantılar: 3.5.2 Ekstre Oluşumu, 3.5.8 Kapalı Ekstre Açma, 07-teknik-tasarim-dokumani.md, 06-ux-ui-tasarim-dokumani.md, 03-risk-yonetim-plani.md, 04-04-fonksiyonel-gereksinimler-butce-planlama.md (Ana Bütçe).
3.5.8. Kapalı Ekstre Açma
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, kapalı bir ekstreyi yeniden açabilmeliyim ki geçmiş işlemleri düzenleyebileyim veya yeni işlem girebileyim (ve Ana Bütçe eşleşmelerini güncelleyebileyim).Kabul Kriterleri:

Erişim:
Ekstreler Sayfası’nda kapalı ekstre kartında “kilitli asma kilit” ikonu görünür.
Kilit ikonuna tıklayınca diyalog açılır: “Ekstreyi işlem girmeye açmak mı istiyorsunuz?” Evet seçilirse ekstre açılır, ikon “açık asma kilit” olur.
Açık ekstrede “İşlem Gir” CTA’sı aktif olur, işlem giriş formu açılır.


Kapalı Ekstre Kısıtlaması:
Kapalı ekstrede “İşlem Gir”, düzenle veya sil tıklanırsa uyarı diyalogu çıkar: “Kapalı ekstreye işlem eklemek/düzenlemek için ekstreyi açmalısınız.” Diyalogda “Aç” butonuyla ekstre açılır.
Ekstre Detay Sayfası’nda işlemler görüntülenebilir, ancak düzenleme/silme için aynı uyarı diyalogu çıkar.


Çift Açık Ekstre Kontrolü:
Aynı hesapta iki açık ekstre varsa, uygulama günlük bildirim gönderir: “Hesapta fazladan açık ekstre var, lütfen eski ekstreyi kapatın.” Bildirim, Ekstreler Sayfası’na yönlendirir.


Ekstre açma ve bildirim işlemleri <1 saniye hedeflenir.
Kapalı ekstre açma, nakit hesap modülüne özgü ve bağımsız çalışır.

Bağlantılar: 3.5.5 İşlem Girme, 3.5.6 İşlem Düzenleme/Silme, 3.5.3 Ekstre Görüntüleme, 3.5.7 Ekstre Kapanışı, 07-teknik-tasarim-dokumani.md, 06-ux-ui-tasarim-dokumani.md, 03-risk-yonetim-plani.md.
Notlar

Eski yapıda, birden fazla bütçe planı arasında geçiş ve aktiflik değişimi, gerçekleşen işlemlerin eski veya geçersiz bütçe kalemleriyle eşleşmesine yol açıyordu, bu da analizlerde kafa karışıklığına neden oluyordu. Yeni “Ana Bütçe / Alternatif Bütçeler” modeli ile bu sorun çözüldü. Ana Bütçe, tek ve değişmez bir referans olarak işlem eşleştirmeleri için kullanılıyor; Alternatif Bütçeler simülasyon ve analiz için ayrıldı.

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun / Gemini Assistant
