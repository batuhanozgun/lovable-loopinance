
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';
import { FeatureSection } from '@/modules/LandingPage/components/FeatureSection';

const Features = () => {
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
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">{t("features.title")}</h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>
        <FeatureSection />
        
        {/* Extended Features Section */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">Daha Fazla Özellik</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-medium mb-3">Otomatik Kategorizasyon</h3>
                <p className="text-muted-foreground">Yapay zeka destekli sistemimiz, harcamalarınızı otomatik olarak kategorize eder ve size zaman kazandırır.</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-medium mb-3">Bütçe Takibi</h3>
                <p className="text-muted-foreground">Kategori bazlı bütçeler oluşturun ve harcamalarınızı hedeflerinize göre takip edin.</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-medium mb-3">Finansal Raporlar</h3>
                <p className="text-muted-foreground">Detaylı raporlar ve grafiklerle finansal durumunuzu daha iyi anlayın ve analiz edin.</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-medium mb-3">Çoklu Hesap Yönetimi</h3>
                <p className="text-muted-foreground">Tüm banka hesaplarınızı, kredi kartlarınızı ve nakit hesaplarınızı tek bir yerden kolayca yönetin.</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-medium mb-3">Hatırlatıcılar</h3>
                <p className="text-muted-foreground">Önemli finansal tarihleri ve ödemeleri unutmamak için kişiselleştirilmiş hatırlatıcılar alın.</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-medium mb-3">Veri Güvenliği</h3>
                <p className="text-muted-foreground">En yüksek güvenlik standartlarıyla finansal verilerinizi koruyoruz ve gizliliğinize saygı duyuyoruz.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Features;
