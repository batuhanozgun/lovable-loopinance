
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Divider } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { headingVariants, textVariants } from '@/modules/Categories/styles/tokens/typography';
import { categorySpacing } from '@/modules/Categories/styles/tokens/spacing';

interface CategoriesStyleGuideLayoutProps {
  children: React.ReactNode;
}

const CategoriesStyleGuideLayout: React.FC<CategoriesStyleGuideLayoutProps> = ({ 
  children 
}) => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <div className="py-3">
      <Container>
        <div className="mb-3">
          <h1 className={cn(headingVariants({ size: 'lg', weight: 'bold', spacing: 'none' }), "mb-1")}>
            {t('Categories:styleGuide.title', 'Kategoriler Stil Kılavuzu')}
          </h1>
          <p className={cn(textVariants({ emphasis: 'low', spacing: 'none' }))}>
            {t('Categories:styleGuide.description', 'Kategori modülü için bileşenler ve stil rehberi')}
          </p>
          <Divider className="mt-2" />
        </div>
        
        <div className="space-y-6">
          {children}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesStyleGuideLayout;
