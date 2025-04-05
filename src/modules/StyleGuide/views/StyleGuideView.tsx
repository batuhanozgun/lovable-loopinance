
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Heading } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ROUTE_PATHS } from '@/modules/Routing';

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
              title={t('styleGuide.modules.categories.title')} 
              description={t('styleGuide.modules.categories.description')} 
              href={ROUTE_PATHS.CATEGORIES_STYLE_GUIDE} 
              buttonText={t('styleGuide.viewButton')}
            />
            
            {/* Additional style guide entries can be added here */}
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
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link 
          to={href}
          className="inline-flex items-center text-sm font-medium text-primary"
        >
          {buttonText}
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  );
};

export { StyleGuideView };
