
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Heading } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';

const StyleGuideView: React.FC = () => {
  const { t } = useTranslation(['StyleGuide']);
  
  return (
    <div className="p-6">
      <Container>
        <div className="space-y-6">
          <div className="flex flex-col space-y-3">
            <Heading level="h1" className="text-3xl font-bold">
              {t('styleGuide.title')}
            </Heading>
            <p className="text-muted-foreground">
              {t('styleGuide.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StyleGuideCard 
              title={t('styleGuide.modules.landingPage.title')} 
              description={t('styleGuide.modules.landingPage.description')} 
              href="/style-guide" 
              buttonText={t('styleGuide.viewButton')}
            />
            
            <StyleGuideCard 
              title={t('styleGuide.modules.categories.title')} 
              description={t('styleGuide.modules.categories.description')} 
              href="/categories-style-guide" 
              buttonText={t('styleGuide.viewButton')}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

// Stil kılavuzu kart bileşeni
const StyleGuideCard: React.FC<{
  title: string;
  description: string;
  href: string;
  buttonText: string;
}> = ({ title, description, href, buttonText }) => {
  return (
    <a 
      href={href}
      className="block p-6 bg-card hover:bg-accent/5 rounded-lg border border-border transition-colors"
    >
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
        {buttonText}
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
};

export { StyleGuideView };
