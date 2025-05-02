Loopinance Fonksiyonel Gereksinimler: Ana Sayfa ve Kayıt
Bu doküman, Loopinance uygulamasının ana sayfa (giriş öncesi ve sonrası), kullanıcı kaydı/giriş ve karşılama (wizard) işlevlerine ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
0. Genel Bakış
Ana sayfa modülü, giriş yapılmamış kullanıcılar için kayıt/giriş ve rehber sunarken, giriş yapmış kullanıcılar için finansal durumlarına genel bir bakış ve hızlı erişim sağlar. Hesaplardan bağımsız çalışır ve kullanıcı dostu bir deneyim sunmayı hedefler.
1. Kapsam
Bu doküman, giriş öncesi ana sayfa (kayıt/giriş, rehber), giriş sonrası ana sayfa (genel bakış, navigasyon), kullanıcı kaydı/giriş ve karşılama wizard’ını kapsar. UX/UI detayları 06-ux-ui-tasarim-dokumani.md, teknik detaylar 07-teknik-tasarim-dokumani.md, performans riskleri 03-risk-yonetim-plani.md adreslenir.
2. Fonksiyonel Gereksinimler
3.1. Giriş Yapılmamış Kullanıcılar için Ana Sayfada Karşılama
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, uygulamayı açtığımda, deneme süresi bilgisi, nasıl kullanılır rehberi ve kayıt/giriş seçenekleri sunan dolu dolu bir ana sayfa görmeliyim ki uygulamayı kullanmaya motive olayım.
Kabul Kriterleri:

Ana sayfada deneme süresi (6 ay) bir section olarak gösterilir.
“Nasıl kullanılır” rehberi, ikonlarla bir section olarak sunulur.
Header’da detaylı “nasıl kullanılır” sayfasına bağlantı bulunur.
Kayıt/giriş seçenekleri (mail, Google, Apple) öne çıkar.
Hızlı işlem girme CTA’sı bulunur, kullanıcıyı işlem giriş formuna yönlendirir.
Ana sayfa, mobil ve masaüstünde kullanıcı dostu, yüklenme <1 saniye.

Bağlantılar: 06-ux-ui-tasarim-dokumani.md için tasarım detayları, 04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.5 İşlem Girme için hızlı işlem CTA’sı.
3.2. Kullanıcı Kaydı ve Giriş
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, mail adresimle veya Google/Apple hesabımla kolayca kayıt olup giriş yapabilmeliyim ki uygulamayı kullanmaya başlayayım.
Kabul Kriterleri:

Mail kaydı: Sadece mail adresi, şifre, şifre tekrarı, işlem <2 saniye.
Google/Apple ile giriş: Tek tıkla, ek bilgi olmadan, işlem <2 saniye.
Giriş formunda “Şifremi unuttum” bağlantısı bulunur, Supabase’in şifre sıfırlama akışıyla çalışır (örneğin, mail ile sıfırlama linki).
Hatalı girişte (örneğin, geçersiz mail, yanlış şifre) toast mesajı gösterilir, mesaj problemi açıkça belirtir (örneğin, “Geçersiz mail, tekrar deneyin”), mobil/desktop uyumlu.

Bağlantılar: 05-veri-gizliligi-ve-guvenlik-politikasi.md için giriş güvenliği, 07-teknik-tasarim-dokumani.md için Supabase entegrasyonu.
3.3. Karşılama Sayfası (Wizard)
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ilk girişte bir wizard ile yönlendirilmeliyim ki deneme sürecini ve uygulamayı nasıl kullanacağımı öğreneyim.
Kabul Kriterleri:

Wizard, modal olarak açılır, “bir daha karşıma çıkma” seçeneği sunar.
Adımlar: Deneme süresi (6 ay), kategori oluşturma, hesap oluşturma, bütçe oluşturma.
Her adım, açıklayıcı metin içerir, geçiş <1 saniye.
Wizard, mobil ve masaüstünde kullanıcı dostu.

Bağlantılar: 06-ux-ui-tasarim-dokumani.md için wizard tasarımı, 04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.1 Bütçe Planı Yaratma için bütçe oluşturma adımı.
3.4. Giriş Yapılmış Kullanıcılar için Ana Sayfa (Landing Page)
3.4.1 Genel Bakış Paneli
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ana sayfada finansal durumuma dair hızlı bir genel bakış görebilmeliyim ki uygulamaya giriş yaptığımda durumu anında değerlendirebileyim.
Kabul Kriterleri:

Özet Kartları:
Toplam Bakiye: Nakit hesapların güncel toplamı (04-03, 3.5.3).
Bütçelenen Tutar: Ana Bütçe’nin toplamı (04-04, 3.6.2).
Gerçekleşen Tutar: Son ekstre dönemi toplamı (04-03, 3.5.3).
Aşım/Tasarruf: Ana Bütçe’ye göre fark (örneğin, “%5 tasarruf”).


Yüklenme süresi <1 saniye.
Kartlar, mobil ve masaüstünde optimize.

3.4.2 Hızlı Erişim
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, sık kullandığım modüllere ana sayfadan hızlıca erişebilmeliyim ki zaman kazanayım.
Kabul Kriterleri:

CTA’lar:
“Hesaplar” (04-03’e yönlendirme).
“Bütçe Planlama” (04-04’e yönlendirme).
“Analiz” (04-07’e yönlendirme).
“Kategoriler” (04-02’ye yönlendirme).


CTA’lar, özelleştirilebilir (kullanıcı sıralama yapabilir).
Tıklama sonrası ilgili modüle <1 saniye’de geçiş.

3.4.3 Bildirimler
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ana sayfada finansal durumumla ilgili bildirimler görebilmeliyim ki önemli gelişmeleri kaçırmayayım.
Kabul Kriterleri:

Bildirim Türleri:
Bütçe Aşımı: “Gıda’da %20 aşım!” (04-04, 3.6.6).
Ekstre Kapanışı: “Yeni ekstre açıldı” (04-03, 3.5.7).
Genel Hatırlatma: “Bütçe kalemi ekle!”.


Bildirimler, kayan panelde veya badge ile gösterilir.
Maksimum 5 bildirim, eski bildirimler arşive taşınır.
Bildirim tıklama ile detay modal’i açılır (<1 saniye).

3.4.4 Profil Kısa Bilgi
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ana sayfada profil bilgime hızlıca ulaşabilmeliyim ki ayarları kolayca yöneteyim.
Kabul Kriterleri:

Kullanıcı adı ve avatar, üst köşede görünür.
“Ayarlar” CTA’sı ile 04-06’ya yönlendirme (<1 saniye).
Çıkış (Logout) butonu, onay modal’iyle çıkış yapar.

3.4.5 Mobil Uyumluluk
Kullanıcı Hikayesi: Bireysel kullanıcı olarak, ana sayfayı mobilde de kullanabilmeliyim ki her zaman erişim sağlayayım.
Kabul Kriterleri:

Özet kartları tek sütun, kaydırılabilir.
CTA’lar kompakt, dokunmatik dostu.
Bildirimler kayan çubukta, maksimum 3 görünür.
Animasyonlar: Yükleme 0.5 saniye, geçiş 0.3 saniye.

3.4.6 Performans ve Modülerlik
Kabul Kriterleri:

Sayfa yükleme, bildirim güncelleme <1 saniye.
10 kart/bildirim için optimize edilir (03-risk-yonetim-plani.md).
Kod, ayrı bir klasörde (/homepage) yazılır, diğer modüllerden bağımsız.
Lovable.dev talimatları: Mimari yoruma izin verilmeden yazılır.
Dosya yapısı: /homepage/index.ts.

3.4.7 Tasarım Tutarlılığı
Kabul Kriterleri:

Kartlar, CTA’lar ve bildirimler, merkezi tasarım sisteminden çekilir (06-ux-ui-tasarim-dokumani.md).
Renk paleti: Özet (mavi), aşım (kırmızı), tasarruf (yeşil).

Bağlantılar

04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4 Kategori Yönetimi
04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md, 3.5.3 Ekstre Yansımaları, 3.5.5 İşlem Girme, 3.5.7 Ekstre Kapanışı
04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.1 Bütçe Planı Yaratma, 3.6.2 Bütçe Kalemleri, 3.6.6 Görselleştirme
04-06-fonksiyonel-gereksinimler-ayarlar.md (gelecek)
04-07-fonksiyonel-gereksinimler-analiz-raporlama.md, 3.7.2 Analiz
05-veri-gizliligi-ve-guvenlik-politikasi.md için giriş güvenliği
06-ux-ui-tasarim-dokumani.md için tasarım detayları
07-teknik-tasarim-dokumani.md için Supabase entegrasyonu, veri tabanı ve API
03-risk-yonetim-plani.md için performans riskleri

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
