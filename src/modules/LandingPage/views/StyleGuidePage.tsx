import React from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight, 
  Check, 
  Zap, 
  Star, 
  Shield, 
  Info, 
  AlertCircle, 
  User, 
  Mail,
  Sparkles
} from 'lucide-react';

import {
  Section,
  Container,
  Heading,
  Text,
  Grid,
  FeatureCard,
  IconWrapper,
  Badge,
  Divider
} from '@/modules/LandingPage/styles';

import * as tokens from '@/modules/LandingPage/constants/tokens';

const StyleGuidePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      
      <main className="flex-1 pt-20 pb-12">
        <Container>
          <Heading level="h1" className="mb-6 text-3xl">Style Guide</Heading>
          
          <Text className="mb-8">
            Bu sayfa, uygulamamızın görsel dilini ve bileşen kütüphanesini gösterir.
          </Text>
          
          {/* Renkler */}
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
          
          {/* Tipografi */}
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
          
          {/* Butonlar */}
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
          
          {/* Badges */}
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
          
          {/* IconWrapper */}
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
          
          {/* Cards */}
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
          
          {/* Backgrounds */}
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
          
          {/* Section Examples */}
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
                <Card className="px-5 py-6 md:p-6 border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
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
                    
                    <Button size="sm" className="group shadow-sm px-3 py-1.5 h-8">
                      Action Button
                      <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </Card>
              </Container>
            </Section>
          </Section>
        </Container>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default StyleGuidePage;
