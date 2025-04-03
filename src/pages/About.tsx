
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader/index';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter/index';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';

const About = () => {
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
          <h1 className="text-3xl font-bold text-center mb-8">Hakkımızda</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Hikayemiz</h2>
              <p className="text-muted-foreground mb-4">
                Loopinance, finansal yönetimi herkes için erişilebilir ve anlaşılır kılma vizyonuyla 2023 yılında kuruldu. Ekibimiz, karmaşık finans dünyasını basitleştirmek ve insanların finansal durumlarını daha iyi anlamalarına yardımcı olmak için bir araya geldi.
              </p>
              <p className="text-muted-foreground">
                Başlangıçta küçük bir ekip olarak yola çıktık, ancak kısa sürede finansal teknoloji alanında önemli bir oyuncu haline geldik. Misyonumuz, kullanıcılarımıza finansal özgürlük yolunda rehberlik etmek ve onlara daha iyi finansal kararlar almaları için gerekli araçları sunmaktır.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Değerlerimiz</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background p-5 rounded-lg border">
                  <h3 className="font-medium text-lg mb-2">Şeffaflık</h3>
                  <p className="text-muted-foreground">Her adımda açık ve dürüst iletişimi benimsiyoruz.</p>
                </div>
                <div className="bg-background p-5 rounded-lg border">
                  <h3 className="font-medium text-lg mb-2">Kullanıcı Odaklılık</h3>
                  <p className="text-muted-foreground">Kullanıcılarımızın ihtiyaçları her zaman önceliğimizdir.</p>
                </div>
                <div className="bg-background p-5 rounded-lg border">
                  <h3 className="font-medium text-lg mb-2">Yenilikçilik</h3>
                  <p className="text-muted-foreground">Sürekli olarak ürünlerimizi geliştirmek için çalışıyoruz.</p>
                </div>
                <div className="bg-background p-5 rounded-lg border">
                  <h3 className="font-medium text-lg mb-2">Güvenlik</h3>
                  <p className="text-muted-foreground">Verilerinizin güvenliği bizim için en önemli önceliktir.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Vizyonumuz</h2>
              <p className="text-muted-foreground">
                Loopinance olarak, herkesin finansal durumunu kolayca yönetebileceği, anlayabileceği ve iyileştirebileceği bir dünya hayal ediyoruz. Teknoloji ve yenilikçi çözümlerimizle, finansal okuryazarlığı artırmayı ve insanların hayallerine bir adım daha yaklaşmalarına yardımcı olmayı hedefliyoruz.
              </p>
            </section>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default About;
