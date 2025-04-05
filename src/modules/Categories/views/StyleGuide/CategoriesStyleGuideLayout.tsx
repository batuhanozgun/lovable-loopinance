
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Divider } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';

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
        <div className="space-y-2 mb-6">
          <h1 className={cn(headingVariants({ size: 'lg', weight: 'bold' }))}>
            {t('Categories:styleGuide.title', 'Kategoriler Stil Kılavuzu')}
          </h1>
          <p className={cn(textVariants({ emphasis: 'low', spacing: 'none' }))}>
            {t('Categories:styleGuide.description', 'Kategori modülü için bileşenler ve stil rehberi')}
          </p>
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
