
import React from 'react';
import { Section, Heading, Divider, Text, Grid } from '@/modules/LandingPage/styles';
import * as tokens from '@/modules/LandingPage/constants/tokens';

const BackgroundsSection: React.FC = () => {
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-4">Arkaplanlar</Heading>
      <Divider className="mb-4" />
      
      <Grid cols={2} gap="md">
        <div className={`${tokens.backgrounds.gradient.primary} p-6 rounded-lg`}>
          <Text className="text-white">Gradient Primary</Text>
        </div>
        
        <div className={`${tokens.backgrounds.gradient.secondary} p-6 rounded-lg`}>
          <Text>Gradient Secondary</Text>
        </div>
        
        <div className={`${tokens.backgrounds.pattern.grid} p-6 rounded-lg border`}>
          <Text>Pattern Grid</Text>
        </div>
        
        <div className={`${tokens.backgrounds.pattern.dots} p-6 rounded-lg border`}>
          <Text>Pattern Dots</Text>
        </div>
        
        <div className={`${tokens.backgrounds.glass.light} p-6 rounded-lg border`}>
          <Text>Glass Light</Text>
        </div>
        
        <div className={`${tokens.backgrounds.glass.strong} p-6 rounded-lg border`}>
          <Text>Glass Strong</Text>
        </div>
      </Grid>
    </Section>
  );
};

export default BackgroundsSection;
