
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Heading } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import CategoriesStyleGuideLayout from './CategoriesStyleGuideLayout';
import ColorsSection from './sections/ColorsSection';
import BadgesSection from './sections/BadgesSection';
import CardsSection from './sections/CardsSection';
import TypographySection from './sections/TypographySection';
import ButtonsSection from './sections/ButtonsSection';

const CategoriesStyleGuideView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <CategoriesStyleGuideLayout>
      <ColorsSection />
      <BadgesSection />
      <CardsSection />
      <TypographySection />
      <ButtonsSection />
    </CategoriesStyleGuideLayout>
  );
};

export default CategoriesStyleGuideView;
