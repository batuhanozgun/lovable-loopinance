
import React from 'react';
import { Button } from '@/components/ui/button';
import { Section, Heading, Divider } from '@/modules/LandingPage/styles';
import { Star } from 'lucide-react';

const ButtonsSection: React.FC = () => {
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-4">Butonlar</Heading>
      <Divider className="mb-4" />
      
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="gradient">Gradient</Button>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center">
        <Button size="lg">Large</Button>
        <Button>Default</Button>
        <Button size="sm">Small</Button>
        <Button size="icon"><Star className="h-4 w-4" /></Button>
      </div>
    </Section>
  );
};

export default ButtonsSection;
