
import React from 'react';
import { Section, Heading, Divider, Badge } from '@/modules/LandingPage/styles';

const BadgesSection: React.FC = () => {
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-4">Badges</Heading>
      <Divider className="mb-4" />
      
      <div className="flex flex-wrap gap-4 items-center">
        <Badge variant="default" size="md">Default</Badge>
        <Badge variant="outline" size="md">Outline</Badge>
        <Badge variant="secondary" size="md">Secondary</Badge>
        <Badge variant="muted" size="md">Muted</Badge>
        <Badge variant="pill" size="md">Pill</Badge>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center mt-4">
        <Badge variant="default" size="sm">Small</Badge>
        <Badge variant="default" size="md">Medium</Badge>
        <Badge variant="default" size="lg">Large</Badge>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center mt-4">
        <Badge variant="default" size="md" rounded="default">Default</Badge>
        <Badge variant="default" size="md" rounded="sm">Small</Badge>
        <Badge variant="default" size="md" rounded="lg">Large</Badge>
        <Badge variant="default" size="md" rounded="full">Full</Badge>
      </div>
    </Section>
  );
};

export default BadgesSection;
