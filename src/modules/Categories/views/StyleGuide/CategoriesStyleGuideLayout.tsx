
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Heading, Text, Divider } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';

interface CategoriesStyleGuideLayoutProps {
  children: React.ReactNode;
}

const CategoriesStyleGuideLayout: React.FC<CategoriesStyleGuideLayoutProps> = ({ 
  children 
}) => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <div className="py-8">
      <Container>
        <div className="space-y-4 mb-8">
          <Heading level="h2" className="text-2xl font-bold">
            {t('Categories:styleGuide.title', 'Kategoriler Stil Kılavuzu')}
          </Heading>
          <Text className="text-muted-foreground">
            {t('Categories:styleGuide.description', 'Kategori modülü için bileşenler ve stil rehberi')}
          </Text>
          <Divider />
        </div>
        
        <div className="space-y-12">
          {children}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesStyleGuideLayout;
