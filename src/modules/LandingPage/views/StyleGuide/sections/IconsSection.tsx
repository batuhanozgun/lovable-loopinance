
import React from 'react';
import { Section, Heading, Divider, IconWrapper } from '@/modules/LandingPage/styles';
import { User, Mail, Info, Star, Zap } from 'lucide-react';

const IconsSection: React.FC = () => {
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-4">Icon Wrappers</Heading>
      <Divider className="mb-4" />
      
      <div className="flex flex-wrap gap-6 items-center">
        <IconWrapper variant="default" size="md"><User /></IconWrapper>
        <IconWrapper variant="primary" size="md"><Mail /></IconWrapper>
        <IconWrapper variant="muted" size="md"><Info /></IconWrapper>
        <IconWrapper variant="gradient" size="md"><Star /></IconWrapper>
      </div>
      
      <div className="flex flex-wrap gap-6 items-center mt-6">
        <IconWrapper variant="primary" size="xs" background="primary"><Zap /></IconWrapper>
        <IconWrapper variant="primary" size="sm" background="primary"><Zap /></IconWrapper>
        <IconWrapper variant="primary" size="md" background="primary"><Zap /></IconWrapper>
        <IconWrapper variant="primary" size="lg" background="primary"><Zap /></IconWrapper>
      </div>
    </Section>
  );
};

export default IconsSection;
