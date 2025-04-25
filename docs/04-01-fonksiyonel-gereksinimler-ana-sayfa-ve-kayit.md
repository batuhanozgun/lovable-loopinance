Loopinance Fonksiyonel Gereksinimler: Ana Sayfa ve Kayıt
Bu doküman, Loopinance uygulamasının ana sayfa, kullanıcı kaydı/giriş ve karşılama (wizard) işlevlerine ait fonksiyonel gereksinimleri tanımlar. Genel bilgiler için bkz. 04-fonksiyonel-gereksinimler-genel.md.
3. Fonksiyonel Gereksinimler
3.1. Ana Sayfada Karşılama

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

Son Güncelleme: 26 Nisan 2025, Sorumlu: batuhanozgun
