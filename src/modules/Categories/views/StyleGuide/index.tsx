
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Heading } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import CategoriesStyleGuideLayout from './CategoriesStyleGuideLayout';
import ColorsSection from './sections/ColorsSection';
import BadgesSection from './sections/BadgesSection';
import CardsSection from './sections/CardsSection';
import TypographySection from './sections/TypographySection';

const CategoriesStyleGuideView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <CategoriesStyleGuideLayout>
      <ColorsSection />
      <BadgesSection />
      <CardsSection />
      <TypographySection />
    </CategoriesStyleGuideLayout>
  );
};

export default CategoriesStyleGuideView;
