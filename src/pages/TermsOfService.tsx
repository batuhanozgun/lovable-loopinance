
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader/index';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';

const TermsOfService = () => {
  const { t } = useTranslation(["LandingPage", "common"]);

  useEffect(() => {
    // Initialize LandingPage translations
    initLandingPageTranslations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Kullanım Koşulları</h1>
          
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p>Son güncellenme: 1 Nisan 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Giriş</h2>
            <p>
              Loopinance web sitesini ve hizmetlerini kullanarak, bu Kullanım Koşulları'nı kabul etmiş olursunuz. Eğer bu koşulları kabul etmiyorsanız, lütfen sitemizi ve hizmetlerimizi kullanmayın.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Tanımlar</h2>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li><strong>"Loopinance", "biz", "bizim" veya "şirketimiz"</strong> ifadeleri Loopinance şirketini ifade eder.</li>
              <li><strong>"Hizmetler"</strong> ifadesi, Loopinance tarafından sağlanan tüm ürünleri, yazılımları, web sitesini ve diğer hizmetleri ifade eder.</li>
              <li><strong>"Kullanıcı", "siz" veya "sizin"</strong> ifadeleri, Loopinance hizmetlerini kullanan herhangi bir kişiyi ifade eder.</li>
              <li><strong>"İçerik"</strong> ifadesi, metin, grafik, fotoğraf, ses, video, yazılım, hesap verisi ve diğer materyalleri ifade eder.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Hesap Oluşturma ve Güvenlik</h2>
            <p>
              Hizmetlerimizin bazı özelliklerini kullanmak için bir hesap oluşturmanız gerekir. Hesap oluştururken doğru, güncel ve eksiksiz bilgiler vermeyi kabul edersiniz. Hesap güvenliğinizi korumak sizin sorumluluğunuzdadır ve hesabınız üzerinden gerçekleşen tüm etkinliklerden siz sorumlusunuz.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Kullanım Lisansı</h2>
            <p>
              Loopinance, bu Kullanım Koşulları'na uymanız şartıyla, hizmetlerimize erişmeniz ve kişisel kullanımınız için sınırlı, münhasır olmayan, devredilemez bir lisans verir. Bu lisans, hizmetlerimizi değiştirme, kopyalama, dağıtma, satma veya kiralama hakkını içermez.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Kullanıcı İçeriği</h2>
            <p>
              Hizmetlerimize yüklediğiniz veya gönderdiğiniz içerikten siz sorumlusunuz. Loopinance, uygunsuz, yasadışı veya zararlı olduğunu düşündüğü içeriği kaldırma veya reddetme hakkını saklı tutar.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Yasaklanan Davranışlar</h2>
            <p>
              Hizmetlerimizi kullanırken aşağıdaki davranışlar yasaktır:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Yasaları ihlal eden herhangi bir eylem</li>
              <li>Başkalarının fikri mülkiyet haklarını ihlal etmek</li>
              <li>Virüs veya zararlı kod yaymak</li>
              <li>Sistemlerimize veya ağlarımıza yetkisiz erişim sağlamak</li>
              <li>Hizmetlerimizi bozmak veya engel olmak</li>
              <li>Diğer kullanıcıları taciz etmek veya tehdit etmek</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Fikri Mülkiyet Hakları</h2>
            <p>
              Hizmetlerimiz ve içeriğimiz, telif hakkı, ticari marka ve diğer fikri mülkiyet yasaları tarafından korunmaktadır. Loopinance veya lisans verenlerimiz, bu içeriğin tüm haklarını saklı tutar.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Ücretler ve Ödemeler</h2>
            <p>
              Bazı hizmetlerimiz için ücret talep edebiliriz. Ödeme bilgilerinizin doğru ve güncel olduğunu taahhüt edersiniz. Abonelikler, otomatik olarak yenilenebilir ve iptal edilene kadar fatura kesilmeye devam edilebilir.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Sorumluluk Reddi</h2>
            <p>
              Hizmetlerimiz "olduğu gibi" ve "mevcut olduğu şekliyle" sunulmaktadır. Loopinance, hizmetlerimizin kesintisiz, hatasız veya güvenli olacağını garanti etmez.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Sorumluluk Sınırlaması</h2>
            <p>
              Hiçbir durumda Loopinance, dolaylı, arızi, özel, sonuç niteliğindeki veya cezai zararlardan sorumlu olmayacaktır.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Tazminat</h2>
            <p>
              Bu Kullanım Koşulları'nı ihlal etmenizden veya hizmetlerimizi uygunsuz kullanmanızdan kaynaklanan her türlü iddia, talep, zarar, yükümlülük ve masrafa karşı Loopinance'i savunmayı ve tazmin etmeyi kabul edersiniz.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">12. Değişiklikler</h2>
            <p>
              Loopinance, bu Kullanım Koşulları'nı herhangi bir zamanda değiştirme hakkını saklı tutar. Değişiklikler, web sitemizde yayınlandıktan sonra geçerli olacaktır.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">13. Fesih</h2>
            <p>
              Loopinance, herhangi bir zamanda ve herhangi bir nedenle, önceden bildirim yapmaksızın hizmetlerimize erişiminizi sonlandırabilir veya askıya alabilir.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">14. Geçerli Yasa</h2>
            <p>
              Bu Kullanım Koşulları, Türkiye Cumhuriyeti yasalarına tabidir ve bu yasalara göre yorumlanacaktır.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">15. İletişim</h2>
            <p>
              Bu Kullanım Koşulları hakkında herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle şu adresten iletişime geçin: iletisim@loopinance.com
            </p>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default TermsOfService;
