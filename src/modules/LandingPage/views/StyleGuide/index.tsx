
import React from 'react';
import StyleGuideLayout from './StyleGuideLayout';
import ColorsSection from './sections/ColorsSection';
import TypographySection from './sections/TypographySection';
import ButtonsSection from './sections/ButtonsSection';
import BadgesSection from './sections/BadgesSection';
import IconsSection from './sections/IconsSection';
import CardsSection from './sections/CardsSection';
import BackgroundsSection from './sections/BackgroundsSection';
import SectionExamplesSection from './sections/SectionExamplesSection';

const StyleGuidePage: React.FC = () => {
  return (
    <StyleGuideLayout>
      <ColorsSection />
      <TypographySection />
      <ButtonsSection />
      <BadgesSection />
      <IconsSection />
      <CardsSection />
      <BackgroundsSection />
      <SectionExamplesSection />
    </StyleGuideLayout>
  );
};

export default StyleGuidePage;
