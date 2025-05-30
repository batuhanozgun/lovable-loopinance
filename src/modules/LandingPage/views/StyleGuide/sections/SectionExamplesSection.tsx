
import React from 'react';
import { Section, Heading, Divider, Container, Text, Badge, IconWrapper } from '@/modules/LandingPage/styles';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

const SectionExamplesSection: React.FC = () => {
  return (
    <Section className="mb-0">
      <Heading level="h2" className="mb-4">Section Örnekleri</Heading>
      <Divider className="mb-4" />
      
      <Section variant="hero" background="hero" className="mb-4 rounded-lg">
        <Container size="narrow">
          <div className="py-10">
            <Heading level="h2" variant="gradient" align="center" className="mb-3">
              Hero Section
            </Heading>
            <Text align="center" className="mb-4">
              Hero Section örneği
            </Text>
            <div className="flex justify-center">
              <Button>CTA Button</Button>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section variant="feature" background="muted" className="mb-4 rounded-lg">
        <Container size="narrow">
          <div className="py-6">
            <Heading level="h2" align="center" className="mb-3">
              Feature Section
            </Heading>
            <Text align="center" variant="muted">
              Feature Section örneği
            </Text>
          </div>
        </Container>
      </Section>
      
      <Section variant="cta" background="gradient" className="rounded-lg">
        <Container size="narrow">
          <Card variant="glass" className="px-5 py-6 md:p-6">
            <div className="flex flex-col items-center text-center">
              <Badge variant="pill" size="sm" className="mb-3">
                <IconWrapper variant="primary" size="xs" className="mr-1">
                  <Sparkles />
                </IconWrapper>
                <span>Special Offer</span>
              </Badge>
              
              <Heading level="h2" className="text-base font-bold mb-2">
                CTA Section
              </Heading>
              
              <Text variant="muted" size="xs" className="mb-4">
                CTA Section örneği
              </Text>
              
              <Button className="group flex items-center gap-2">
                Action Button
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </Section>
  );
};

export default SectionExamplesSection;
