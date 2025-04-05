
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Heading, Text, Divider } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import CategoriesStyleGuideLayout from './CategoriesStyleGuideLayout';
import TypographySection from './sections/TypographySection';

const CategoriesStyleGuideView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <CategoriesStyleGuideLayout>
      <div className="space-y-12">
        <TypographySection />
      </div>
    </CategoriesStyleGuideLayout>
  );
};

export default CategoriesStyleGuideView;
