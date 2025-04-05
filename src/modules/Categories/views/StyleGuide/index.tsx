
import React from 'react';
import { useTranslation } from 'react-i18next';
import CategoriesStyleGuideLayout from './CategoriesStyleGuideLayout';
import TypographySection from './sections/TypographySection';
import ColorsSection from './sections/ColorsSection';
import { cn } from '@/lib/utils';
import { headingVariants } from '../../../Categories/styles/tokens/typography';

const CategoriesStyleGuideView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <CategoriesStyleGuideLayout>
      <div className="space-y-16">
        <h1 className={cn(headingVariants({ size: 'lg', weight: 'bold', spacing: 'normal' }))}>
          {t('Categories:styleGuide.title', 'Kategoriler Stil Kılavuzu')}
        </h1>
        
        <TypographySection />
        <ColorsSection />
      </div>
    </CategoriesStyleGuideLayout>
  );
};

export default CategoriesStyleGuideView;
