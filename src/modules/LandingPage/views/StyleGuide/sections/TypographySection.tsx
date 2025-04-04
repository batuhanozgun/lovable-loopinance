
import React from 'react';
import { Section, Heading, Text, Divider } from '@/modules/LandingPage/styles';

const TypographySection: React.FC = () => {
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-4">Tipografi</Heading>
      <Divider className="mb-4" />
      
      <div className="space-y-4">
        <Heading level="h1">Başlık 1 (h1)</Heading>
        <Heading level="h2">Başlık 2 (h2)</Heading>
        <Heading level="h3">Başlık 3 (h3)</Heading>
        <Heading level="h4">Başlık 4 (h4)</Heading>
        <Heading level="h5">Başlık 5 (h5)</Heading>
        <Heading level="h6">Başlık 6 (h6)</Heading>
        
        <Divider className="my-4" />
        
        <Text size="xl">Text XL</Text>
        <Text size="lg">Text Large</Text>
        <Text size="base">Text Base</Text>
        <Text size="sm">Text Small</Text>
        <Text size="xs">Text XSmall</Text>
        
        <Divider className="my-4" />
        
        <Text weight="bold">Bold Text</Text>
        <Text weight="semibold">Semibold Text</Text>
        <Text weight="medium">Medium Text</Text>
        <Text weight="normal">Normal Text</Text>
        
        <Divider className="my-4" />
        
        <Text variant="default">Default Text</Text>
        <Text variant="muted">Muted Text</Text>
        <Text variant="gradient">Gradient Text</Text>
      </div>
    </Section>
  );
};

export default TypographySection;
