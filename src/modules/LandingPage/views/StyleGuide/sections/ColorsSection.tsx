
import React from 'react';
import { Section, Heading, Text, Grid, Divider } from '@/modules/LandingPage/styles';

const ColorsSection: React.FC = () => {
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-4">Renkler</Heading>
      <Divider className="mb-4" />
      
      <Grid cols={4} gap="md">
        <div className="p-4 rounded-md bg-background border">
          <div className="h-16 bg-primary rounded-md mb-2"></div>
          <Text size="sm" weight="medium">Primary</Text>
        </div>
        
        <div className="p-4 rounded-md bg-background border">
          <div className="h-16 bg-secondary rounded-md mb-2"></div>
          <Text size="sm" weight="medium">Secondary</Text>
        </div>
        
        <div className="p-4 rounded-md bg-background border">
          <div className="h-16 bg-muted rounded-md mb-2"></div>
          <Text size="sm" weight="medium">Muted</Text>
        </div>
        
        <div className="p-4 rounded-md bg-background border">
          <div className="h-16 bg-destructive rounded-md mb-2"></div>
          <Text size="sm" weight="medium">Destructive</Text>
        </div>
      </Grid>
    </Section>
  );
};

export default ColorsSection;
