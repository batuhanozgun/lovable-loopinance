Loopinance Teknik Tasarım Dokümanı
Bu doküman, Loopinance uygulamasının teknik tasarımını tanımlar.
3. Teknik Tasarım
3.1 Nakit Hesaplar
3.1.1 Veri Yapısı

Tablolar:
accounts:
id: UUID, birincil anahtar.
user_id: UUID, kullanıcıya bağlantı.
name: String, hesap adı (maks. 30 karakter).
currency: Enum (TRY, USD, EUR).
initial_balance: Decimal, başlangıç bakiyesi.
statement_day: Enum (ilk gün, son gün, ilk iş günü, son iş günü, belirli bir gün [2-28]).
created_at: Timestamp.


statements:
id: UUID, birincil anahtar.
account_id: UUID, hesaba bağlantı.
period_start: Date, dönem başlangıcı.
period_end: Date, dönem sonu.
status: Enum (açık, kapalı, gelecek).
opening_balance: Decimal, açılış bakiyesi.
closing_balance: Decimal, kapanış bakiyesi.
budgeted_opening_balance: Decimal, bütçelenen açılış.
budgeted_closing_balance: Decimal, bütçelenen kapanış.


transactions:
id: UUID, birincil anahtar.
account_id: UUID, hesaba bağlantı.
statement_id: UUID, ekstrelere bağlantı.
category_id: UUID, kategoriye bağlantı (04-02).
subcategory_id: UUID, alt kategoriye bağlantı (04-02).
budget_id: UUID, bütçe kalemine bağlantı (04-04, sadece Ana Bütçe).
type: Enum (gelir, gider).
amount: Decimal, tutar.
date: Date, işlem tarihi.
description: String, açıklama (maks. 400 karakter).
created_at: Timestamp.





3.1.2 API Endpoint’ler

Hesap Oluşturma (04-03, 3.5.1):
POST /cash-account/create
Request: { "name": String, "currency": Enum, "initial_balance": Decimal, "statement_day": Enum }
Response: { "account_id": UUID, "status": "created" }
Süre: <1 saniye.




Ekstre Oluşumu (04-03, 3.5.2):
POST /cash-account/statements/generate
Request: { "account_id": UUID }
Response: { "statement_ids": [UUID], "status": "generated" }
Süre: <1 saniye/hesap.


Batch: POST /cash-account/statements/batch-update
Her gece çalışır, tüm hesapların ekstre statülerini günceller.




İşlem Girme (04-03, 3.5.5):
POST /cash-account/transactions/create
Request: { "account_id": UUID, "category_id": UUID, "subcategory_id": UUID, "budget_id": UUID, "type": Enum, "amount": Decimal, "date": Date, "description": String }
Response: { "transaction_id": UUID, "status": "created" }
Süre: <1 saniye, zincirleme güncellemeler dahil.





3.1.3 Modülerlik

Kod, /cash-account klasöründe yazılır, diğer modüllerden bağımsız.
Lovable.dev talimatları: Kod, mimari yoruma izin vermeden yazılır.
Dosya yapısı:
/cash-account/create-account.ts
/cash-account/generate-statements.ts
/cash-account/transactions.ts



3.1.4 Performans ve Güvenlik

Tüm işlemler <1 saniye/hesap, 5.000 kullanıcı için optimize edilir (03-risk-yonetim-plani.md).
Supabase kimlik doğrulama: API’ler yalnızca yetkili kullanıcılar için erişilebilir (05-veri-gizliligi-ve-guvenlik-politikasi.md).
Veri önbellekleme: Sık kullanılan veriler (örneğin, ekstreler) istemci tarafında önbelleğe alınır.

Bağlantılar

04-03-fonksiyonel-gereksinimler-nakit-hesaplar.md için fonksiyonel gereksinimler
04-02-fonksiyonel-gereksinimler-kategori-yonetimi.md, 3.4 Kategori Yönetimi
04-04-fonksiyonel-gereksinimler-butce-planlama.md, 3.6.2 Bütçe Kalemleri
05-veri-gizliligi-ve-guvenlik-politikasi.md için güvenlik
07-teknik-tasarim-dokumani.md için diğer modüller (gelecek)
03-risk-yonetim-plani.md için performans riskleri

Son Güncelleme: 2 Mayıs 2025, Sorumlu: batuhanozgun
