
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader/index';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter/index';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-8">Gizlilik Politikası</h1>
          
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p>Son güncellenme: 1 Nisan 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Giriş</h2>
            <p>
              Loopinance ("biz", "bizim" veya "şirketimiz") olarak, gizliliğinize saygı duyuyoruz ve kişisel verilerinizin korunmasını ciddiye alıyoruz. Bu Gizlilik Politikası, web sitemizi ve hizmetlerimizi kullanırken toplanan bilgileri, bu bilgilerin nasıl kullanıldığını ve korunduğunu açıklar.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Topladığımız Bilgiler</h2>
            <p>
              Hizmetlerimizi kullanırken aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li><strong>Kişisel Bilgiler:</strong> Ad, e-posta adresi, telefon numarası gibi sizi tanımlayabilecek bilgiler.</li>
              <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifre ve hesap tercihleri.</li>
              <li><strong>Finansal Bilgiler:</strong> Gelir, gider, bütçe ve diğer finansal veriler.</li>
              <li><strong>Kullanım Verileri:</strong> Web sitemizi ve hizmetlerimizi nasıl kullandığınıza dair bilgiler.</li>
              <li><strong>Cihaz Bilgileri:</strong> IP adresi, tarayıcı türü, cihaz türü ve işletim sistemi.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Bilgilerin Kullanımı</h2>
            <p>
              Topladığımız bilgileri aşağıdaki amaçlar için kullanabiliriz:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Hesabınızı oluşturmak ve yönetmek</li>
              <li>Hizmetlerimizi sağlamak ve geliştirmek</li>
              <li>Müşteri desteği sunmak</li>
              <li>Güvenlik ve doğrulama için</li>
              <li>İletişim ve bildirimler göndermek</li>
              <li>Yasal gerekliliklere uymak</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Bilgi Paylaşımı</h2>
            <p>
              Kişisel verilerinizi aşağıdaki durumlarda üçüncü taraflarla paylaşabiliriz:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li><strong>Hizmet Sağlayıcılar:</strong> Web sitemizi ve hizmetlerimizi işletmemize yardımcı olan güvenilir üçüncü taraf hizmet sağlayıcılarla.</li>
              <li><strong>Yasal Gereklilikler:</strong> Yasal bir yükümlülüğe uymak, şirketimizin haklarını veya güvenliğini korumak için gerekli olduğunda.</li>
              <li><strong>İş Ortakları:</strong> Size daha iyi hizmet sunmak için iş ortaklarımızla, ancak her zaman gizliliğinizi koruyarak.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizi korumak için uygun teknik ve organizasyonel güvenlik önlemleri uyguluyoruz. Ancak, internet üzerinden yapılan hiçbir veri iletiminin veya elektronik depolamanın %100 güvenli olmadığını hatırlatmak isteriz.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Çerezler ve Takip Teknolojileri</h2>
            <p>
              Web sitemizde çerezler ve benzer takip teknolojileri kullanıyoruz. Bu teknolojiler, size daha iyi bir kullanıcı deneyimi sunmamıza, siteyi analiz etmemize ve içeriği kişiselleştirmemize yardımcı olur.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Veri Saklama Süresi</h2>
            <p>
              Kişisel verilerinizi, hizmetlerimizi sağlamak için gerekli olduğu sürece saklarız. Hesabınızı sildiğinizde, verilerinizi yasal yükümlülüklerimizi yerine getirmek veya meşru iş çıkarlarımızı korumak için gerekli olmadığı sürece sileriz veya anonimleştiririz.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Haklarınız</h2>
            <p>
              Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Verilerinize erişim ve kopyasını alma hakkı</li>
              <li>Verilerinizin düzeltilmesini veya silinmesini isteme hakkı</li>
              <li>Veri işlemeyi kısıtlama hakkı</li>
              <li>Veri taşınabilirliği hakkı</li>
              <li>İtiraz etme hakkı</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Gizlilik Politikası Değişiklikleri</h2>
            <p>
              Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda, sitemizde bir bildirim yayınlayacağız ve gerekirse size e-posta ile bilgi vereceğiz.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. İletişim</h2>
            <p>
              Bu Gizlilik Politikası hakkında herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle şu adresten iletişime geçin: iletisim@loopinance.com
            </p>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default PrivacyPolicy;
