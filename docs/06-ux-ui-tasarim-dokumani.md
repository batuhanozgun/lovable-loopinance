Loopinance UX/UI Tasarım Dokümanı
Bu doküman, Loopinance uygulamasının kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) tasarımını tanımlar.
3. UX/UI Tasarımı
3.0 Merkezi Tasarım Sistemi
Merkezi tasarım sistemi, uygulamanın tüm modüllerinde tutarlı bir görünüm ve deneyim sağlamak için kullanılır. Tüm bileşenler (kartlar, butonlar, modal’lar, ikonlar) bu sistemden türetilir. Not: Bu sistem, Tailwind CSS gibi utility-first bir CSS framework’ü ile uygulanabilir; tüm bileşenler merkezi bir stil kütüphanesinden (örneğin, /shared/components) çekilmelidir.
3.0.1 Renk Paleti

Gelir: Yeşil (#34C759, Tailwind: bg-green-500).
Gider: Kırmızı (#FF3B30, Tailwind: bg-red-500).
Kategoriler ve CTA’lar: Mavi (#007AFF, Tailwind: bg-blue-500).
Nötr (Metin, Kenarlık): Gri (#8E8E93, Tailwind: text-gray-500).
Arka Plan: Beyaz (#FFFFFF, Tailwind: bg-white).
Uyarı: Sarı (#FF9500, Tailwind: bg-yellow-500).

3.0.2 Tipografi

Başlıklar: 16pt, kalın, siyah (Tailwind: text-lg font-bold text-black).
Ana Metin: 12pt, siyah (Tailwind: text-sm text-black).
İkincil Metin: 10pt, gri (Tailwind: text-xs text-gray-500).
Buton Metni: 12pt, mavi (Tailwind: text-sm text-blue-500).
Etiketler: 10pt, renk duruma göre değişir (Tailwind: text-xs).

3.0.3 Ortak Bileşenler

Kartlar:
Boyut: Mobil: 280x60px, Masaüstü: 320x70px (Tailwind: w-[280px] h-[60px] md:w-[320px] md:h-[70px]).
Kenarlık: 0.5px gri, köşe yuvarlama 6px (Tailwind: border border-gray-300 rounded-md).


Butonlar:
Standart: 12pt, mavi, kenarlıksız (Tailwind: text-sm text-blue-500).
İptal: 12pt, gri, kenarlıksız (Tailwind: text-sm text-gray-500).


Modal’lar:
Mobil: 280x350px, Masaüstü: 350x400px (Tailwind: w-[280px] h-[350px] md:w-[350px] md:h-[400px]).
Kenarlık: 0.5px gri, köşe yuvarlama 6px (Tailwind: border border-gray-300 rounded-md).


İkonlar:
Boyut: 14px (Tailwind: w-3.5 h-3.5).
Düzenle: Kalem, mavi (#007AFF).
Sil: Çöp kutusu, gri (#8E8E93).
Kilit: Sarı (#FF9500).


Animasyonlar:
Akordeon Açılma: 0.2 saniye.
Modal Yükleme: 0.4 saniye.



3.1 Nakit Hesaplar
3.1.1 Hesaplar Sayfası

Hesap Kartı (04-03, 3.5.3):
Boyutlar: Merkezi tasarım sisteminden (3.0.3).
Bileşenler:
Hesap Adı: 14pt, kalın, mavi (Tailwind: text-sm font-bold text-blue-500).
Kapanış Bakiyesi: 12pt, yeşil/kırmızı (Tailwind: text-sm text-green-500 veya text-red-500).
Açık Ekstre Kesim Tarihi: 10pt, gri (Tailwind: text-xs text-gray-500).
İkonlar: Düzenle, Sil (merkezi sistemden).
CTA’lar: “İşlem Gir” ve “Ekstreler”, merkezi tasarım sisteminden (3.0.3 butonlar).


Etkileşim: Tıklanabilir, ekstreler sayfasına yönlendirir.


Arka Plan: Mobil: Tek sütun, kaydırılabilir (Tailwind: flex flex-col); Masaüstü: Izgara düzeni (4 sütun, Tailwind: grid grid-cols-4 gap-4).

3.1.2 Ekstreler Sayfası (04-03, 3.5.3)

Başlıklar: Merkezi sistemden, 16pt, kalın, siyah.
Ekstre Kartı:
Boyutlar: Merkezi tasarım sisteminden (3.0.3).
Bileşenler:
Dönem Başlangıcı/Sonu: 10pt, gri (Tailwind: text-xs text-gray-500).
Gerçek/Bütçelenen Bakiyeler: 12pt, yeşil/kırmızı (Tailwind: text-sm text-green-500 veya text-red-500).
İkon: Kapalı ekstrelerde “kilitli asma kilit” (merkezi sistemden).
CTA: “İşlem Gir”, merkezi tasarım sisteminden.


Etkileşim: Tıklanabilir, ekstre detay sayfasına yönlendirir.


Arşiv Sayfası:
“Arşive Git” bağlantısı, 12pt, mavi (Tailwind: text-sm text-blue-500).
Liste formatı: Ekstre kartlarıyla aynı, tarih bazlı sıralı.



3.1.3 Ekstre Detay Sayfası (04-03, 3.5.3)

Ekstre Bilgileri:
Hesap Adı: 16pt, kalın, siyah (Tailwind: text-lg font-bold text-black).
Dönem: 12pt, gri (Tailwind: text-sm text-gray-500).
Bakiyeler: 12pt, yeşil/kırmızı (Tailwind: text-sm text-green-500 veya text-red-500).
Statü: 10pt, etiket (Açık: Yeşil, Kapalı: Gri, Gelecek: Mavi).


İşlemler Listesi:
Satır: 280x40px (mobil), 600x50px (masaüstü) (Tailwind: w-[280px] h-[40px] md:w-[600px] md:h-[50px]).
Bileşenler:
Tarih/Saat: 10pt, gri (Tailwind: text-xs text-gray-500).
Kategori/Alt Kategori: 12pt, siyah (Tailwind: text-sm text-black).
Tutar: 12pt, gelir yeşil, gider kırmızı (Tailwind: text-sm text-green-500 veya text-red-500).
Açıklama: Akordeon, 10pt, gri (Tailwind: text-xs text-gray-500).
Etiket: “Bütçesi var/yok”, 10pt, mavi/gri (Tailwind: text-xs text-blue-500 veya text-gray-500).
İkonlar: Düzenle, Sil (merkezi sistemden).


Gruplama (Opsiyonel):
“Bütçeye göre grupla” CTA’sı, merkezi sistemden.
Gruplar: “Bütçesi Var” (mavi başlık), “Bütçesi Yok” (gri başlık).




Filtreleme/Sıralama:
Dropdown: Kategori, işlem tipi, 12pt (Tailwind: text-sm).
Sıralama: Tarih, tutar, kategori (12pt butonlar).



3.1.4 İşlem Girme Formu (04-03, 3.5.5)

Modal: Merkezi tasarım sisteminden (3.0.3).
Form Alanları:
Hesap: Dropdown, 12pt, mavi (Tailwind: text-sm text-blue-500).
Tarih: Tarih seçici, 12pt (Tailwind: text-sm).
Gelir/Gider: Toggle, yeşil/kırmızı (Tailwind: text-green-500 veya text-red-500).
Kategori/Alt Kategori: Dropdown, alfabetik, 12pt (Tailwind: text-sm).
Tutar: Input, 12pt, numara klavyesi (Tailwind: text-sm).
Açıklama: Textarea, 10pt, maks. 400 karakter (Tailwind: text-xs).


Bütçe Eşleştirme:
Öneri: “Bu işlem, Ana Bütçenizdeki [Kategori/Alt Kategori] ile eşleşiyor”, 10pt, mavi (Tailwind: text-xs text-blue-500).
“Ana Bütçeye Kalem Oluştur” alt formu: Aynı modal içinde, 12pt (Tailwind: text-sm).


Butonlar: Merkezi tasarım sisteminden (3.0.3).

3.1.5 Mobil Uyumluluk

Kartlar ve listeler tek sütun, kaydırılabilir (Tailwind: flex flex-col).
Modal’lar dokunmatik dostu, kaydırılabilir.
Animasyonlar: Merkezi tasarım sisteminden (3.0.3).

3.1.6 Tasarım Tutarlılığı

Tüm bileşenler, merkezi tasarım sisteminden (3.0) türetilir.

Bağlantılar

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md için fonksiyonel gereksinimler
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4 Kategori Yönetimi
04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.2 Bütçe Kalemleri
07-teknik-tasarim-dokumani.md için teknik tasarım

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
