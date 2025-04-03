
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
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
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">Sık Sorulan Sorular</h1>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">Loopinance nedir?</AccordionTrigger>
              <AccordionContent>
                Loopinance, kişisel finans yönetimini kolaylaştırmak için tasarlanmış bir web uygulamasıdır. Gelirlerinizi, giderlerinizi takip edebilir, bütçeler oluşturabilir ve finansal hedeflerinize ulaşmak için planlama yapabilirsiniz.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">Loopinance'i kullanmak için ücret ödemem gerekiyor mu?</AccordionTrigger>
              <AccordionContent>
                Loopinance'in temel özellikleri ücretsizdir. Ancak, daha gelişmiş özellikler ve analitik araçlar için Premium planlarımız bulunmaktadır. Fiyatlandırma sayfamızı ziyaret ederek daha fazla bilgi alabilirsiniz.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">Verilerim güvende mi?</AccordionTrigger>
              <AccordionContent>
                Evet, verilerinizin güvenliği bizim için en önemli önceliktir. En son güvenlik teknolojilerini kullanıyor ve verilerinizi şifrelenmiş bir şekilde saklıyoruz. Ayrıca, verilerinizi üçüncü taraflarla paylaşmıyoruz.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Hesabımı nasıl silebilirim?</AccordionTrigger>
              <AccordionContent>
                Hesabınızı silmek için, profil ayarlarınıza gidin ve "Hesabı Sil" seçeneğini bulun. Hesabınızı sildiğinizde, tüm verileriniz kalıcı olarak silinecektir.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">Birden fazla para birimi destekleniyor mu?</AccordionTrigger>
              <AccordionContent>
                Evet, Loopinance birden fazla para birimini destekler. Hesaplarınızı farklı para birimlerinde oluşturabilir ve isterseniz ana para biriminizi değiştirebilirsiniz.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">Mobil uygulama var mı?</AccordionTrigger>
              <AccordionContent>
                Şu anda Loopinance'in mobil uygulaması geliştirme aşamasındadır. Ancak, web sitemiz mobil uyumludur ve herhangi bir cihazdan erişilebilir.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">İşlemlerimi nasıl kategorize edebilirim?</AccordionTrigger>
              <AccordionContent>
                Loopinance, işlemlerinizi kolayca kategorize etmenizi sağlar. Önceden tanımlanmış kategoriler kullanabilir veya kendi özel kategorilerinizi oluşturabilirsiniz. Ayrıca, otomatik kategorizasyon özelliğimiz, işlemlerinizi geçmiş verilerinize dayanarak otomatik olarak sınıflandırır.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">Sorun yaşarsam nasıl destek alabilirim?</AccordionTrigger>
              <AccordionContent>
                Yardıma ihtiyacınız olduğunda, İletişim sayfamız üzerinden bize ulaşabilirsiniz. Ayrıca, Yardım Merkezi'mizde sık sorulan sorulara ve kullanım kılavuzlarına erişebilirsiniz.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">Banka hesaplarımı Loopinance'e bağlayabilir miyim?</AccordionTrigger>
              <AccordionContent>
                Premium planlarımızda, banka hesaplarınızı Loopinance'e güvenli bir şekilde bağlama özelliği bulunmaktadır. Bu sayede, işlemleriniz otomatik olarak senkronize edilir ve manuel veri girişine gerek kalmaz.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">Raporlar ve grafikler nasıl oluşturuluyor?</AccordionTrigger>
              <AccordionContent>
                Loopinance, finansal verilerinizi analiz ederek detaylı raporlar ve grafikler oluşturur. Gelir-gider analizleri, kategori bazlı harcama dağılımları ve trend analizleri gibi birçok farklı görsel sunumla finansal durumunuzu daha iyi anlayabilirsiniz.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default FAQ;
