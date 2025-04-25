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

Son Güncelleme: 26 Nisan 2025, Sorumlu: batuhanozgun
