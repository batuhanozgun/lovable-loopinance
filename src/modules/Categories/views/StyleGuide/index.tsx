
import React from 'react';
import { useTranslation } from 'react-i18next';
import CategoriesStyleGuideLayout from './CategoriesStyleGuideLayout';
import TypographySection from './sections/TypographySection';
import ColorsSection from './sections/ColorsSection';

const CategoriesStyleGuideView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <CategoriesStyleGuideLayout>
      <div className="space-y-16">
        <TypographySection />
        <ColorsSection />
      </div>
    </CategoriesStyleGuideLayout>
  );
};

export default CategoriesStyleGuideView;
