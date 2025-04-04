
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Section, Heading, Divider, Text, Grid, FeatureCard, IconWrapper } from '@/modules/LandingPage/styles';
import { Star, Shield } from 'lucide-react';

const CardsSection: React.FC = () => {
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-4">Cards</Heading>
      <Divider className="mb-4" />
      
      <Grid cols={3} gap="md">
        <Card>
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>Bu bir standart karttır.</Text>
          </CardContent>
        </Card>
        
        <FeatureCard hover="both" rounded="lg">
          <IconWrapper variant="primary" size="md" background="primary" className="mb-3">
            <Star />
          </IconWrapper>
          <Heading level="h3" className="text-sm font-semibold mb-1.5">
            Feature Card
          </Heading>
          <Text variant="muted" size="xs">
            Bu bir özellik kartıdır.
          </Text>
        </FeatureCard>
        
        <FeatureCard hover="shadow" rounded="lg" className="border-primary/40">
          <IconWrapper variant="primary" size="md" background="primary" className="mb-3">
            <Shield />
          </IconWrapper>
          <Heading level="h3" className="text-sm font-semibold mb-1.5">
            Premium Feature
          </Heading>
          <Text variant="muted" size="xs">
            Bu bir premium özellik kartıdır.
          </Text>
        </FeatureCard>
      </Grid>
    </Section>
  );
};

export default CardsSection;
