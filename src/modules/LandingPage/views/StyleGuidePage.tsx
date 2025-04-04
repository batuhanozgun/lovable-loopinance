
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader/index';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter/index';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Import our style components
import {
  Section,
  Container,
  Heading,
  Text,
  FeatureCard,
  Badge as StyleBadge,
  IconWrapper,
  Link,
  Divider,
  Grid
} from '@/modules/LandingPage/styles';

// Import various styling-related constants
import {
  typography,
  text,
  spacing,
  sizes,
  containers,
  borders,
  effects,
  backgrounds,
  cards,
  buttons,
  icons,
  links,
  badges,
  layout,
  zIndex
} from '@/modules/LandingPage/constants/ui';

// Import Lucide Icons for examples
import {
  CheckCircle,
  Star,
  Box,
  User,
  Settings,
  Bell,
  Search,
  Home,
  Calendar,
  Mail
} from 'lucide-react';

const StyleGuidePage: React.FC = () => {
  // Initialize translations
  React.useEffect(() => {
    initLandingPageTranslations();
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation(['LandingPage', 'common']);

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1 pt-16">
        <Section variant="default" background="none">
          <Container size="wide">
            <Heading level="h1" variant="default" align="center" className="mb-4">
              UI Style Guide
            </Heading>
            <Text variant="muted" align="center" className="mb-12 max-w-2xl mx-auto">
              A comprehensive reference of all design tokens and UI components used in the LandingPage module.
            </Text>

            {/* Typography Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Heading Styles</Text>
                  <div className="space-y-4">
                    <Heading level="h1">Heading 1 (H1)</Heading>
                    <Heading level="h2">Heading 2 (H2)</Heading>
                    <Heading level="h3">Heading 3 (H3)</Heading>
                    <Heading level="h4">Heading 4 (H4)</Heading>
                    <Heading level="h5">Heading 5 (H5)</Heading>
                    <Heading level="h6">Heading 6 (H6)</Heading>
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Text Styles</Text>
                  <div className="space-y-4">
                    <Text size="xs">Extra Small Text (xs)</Text>
                    <Text size="sm">Small Text (sm)</Text>
                    <Text size="base">Base Text (base)</Text>
                    <Text size="lg">Large Text (lg)</Text>
                    <Text size="xl">Extra Large Text (xl)</Text>
                    <Text size="2xl">2XL Text (2xl)</Text>
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Text Weights</Text>
                  <div className="space-y-2">
                    <Text weight="normal">Normal weight text</Text>
                    <Text weight="medium">Medium weight text</Text>
                    <Text weight="semibold">Semibold weight text</Text>
                    <Text weight="bold">Bold weight text</Text>
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Text Variants</Text>
                  <div className="space-y-2">
                    <Text variant="default">Default text</Text>
                    <Text variant="muted">Muted text</Text>
                    <Text variant="gradient">Gradient text</Text>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Components Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Buttons</Text>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link">Link Button</Button>
                    <Button variant="gradient">Gradient Button</Button>
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Badges</Text>
                  <div className="flex flex-wrap gap-4">
                    <StyleBadge variant="default">Default Badge</StyleBadge>
                    <StyleBadge variant="outline">Outline Badge</StyleBadge>
                    <StyleBadge variant="secondary">Secondary Badge</StyleBadge>
                    <StyleBadge variant="muted">Muted Badge</StyleBadge>
                    <StyleBadge variant="pill">Pill Badge</StyleBadge>
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Cards</Text>
                  <Grid cols={2} gap="md">
                    <FeatureCard>
                      <Heading level="h3" className="mb-2">Default Feature Card</Heading>
                      <Text variant="muted">This is a default feature card component with hover effects.</Text>
                    </FeatureCard>
                    
                    <FeatureCard hover="lift">
                      <Heading level="h3" className="mb-2">Lift Hover Card</Heading>
                      <Text variant="muted">This card lifts on hover.</Text>
                    </FeatureCard>
                  </Grid>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Links</Text>
                  <div className="space-y-2">
                    <div>
                      <Link href="#" variant="default">Default Link</Link>
                    </div>
                    <div>
                      <Link href="#" variant="primary">Primary Link</Link>
                    </div>
                    <div>
                      <Link href="#" variant="muted">Muted Link</Link>
                    </div>
                    <div>
                      <Link href="#" variant="default" underline="hover">Hover Underline Link</Link>
                    </div>
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Icons</Text>
                  <div className="flex flex-wrap gap-4">
                    <IconWrapper variant="default" size="sm">
                      <CheckCircle />
                    </IconWrapper>
                    <IconWrapper variant="primary" size="md">
                      <Star />
                    </IconWrapper>
                    <IconWrapper variant="muted" size="lg">
                      <Box />
                    </IconWrapper>
                    <IconWrapper variant="gradient" size="lg">
                      <Settings />
                    </IconWrapper>
                    <IconWrapper variant="primary" size="md" background="muted">
                      <Bell />
                    </IconWrapper>
                    <IconWrapper variant="primary" size="md" background="primary">
                      <User />
                    </IconWrapper>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layout Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Layout & Spacing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Spacing Scale</Text>
                  <div className="flex items-end gap-2">
                    {Object.entries(spacing).map(([key, value]) => (
                      <div key={key} className="flex flex-col items-center">
                        <div className={`bg-primary h-${key} w-8`} style={{ height: value }}></div>
                        <Text size="xs" className="mt-1">{key}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Grid Examples</Text>
                  <Grid cols={3} gap="md" className="mb-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="h-20 bg-muted flex items-center justify-center">
                        <Text>Col {item}</Text>
                      </div>
                    ))}
                  </Grid>
                  <Grid cols={4} gap="sm">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="h-16 bg-muted/50 flex items-center justify-center">
                        <Text size="sm">Col {item}</Text>
                      </div>
                    ))}
                  </Grid>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Section Backgrounds</Text>
                  <div className="space-y-4">
                    <div className="h-24 rounded-md bg-muted/30 flex items-center justify-center">
                      <Text>Muted Background</Text>
                    </div>
                    <div className={`h-24 rounded-md ${backgrounds.gradient.primary} flex items-center justify-center`}>
                      <Text className="text-white">Gradient Background</Text>
                    </div>
                    <div className={`h-24 rounded-md ${backgrounds.pattern.grid} flex items-center justify-center border`}>
                      <Text>Pattern Background</Text>
                    </div>
                    <div className={`h-24 rounded-md ${backgrounds.glass.medium} flex items-center justify-center border`}>
                      <Text>Glass Background</Text>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Effects Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Effects & Borders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Border Radius Examples</Text>
                  <div className="flex gap-4 flex-wrap">
                    {Object.entries(borders.radius).map(([key, value]) => (
                      <div 
                        key={key} 
                        className="w-16 h-16 bg-primary/20 border border-primary/30 flex items-center justify-center"
                        style={{ borderRadius: value }}
                      >
                        <Text size="xs">{key}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Shadow Examples</Text>
                  <div className="flex gap-4 flex-wrap">
                    {Object.entries(effects.shadows).map(([key, value]) => (
                      <div 
                        key={key} 
                        className="w-24 h-24 bg-background border rounded-md flex items-center justify-center"
                        style={{ boxShadow: value }}
                      >
                        <Text size="xs">{key}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <Divider />

                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Dividers</Text>
                  <div className="space-y-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24">Default:</div>
                      <Divider className="flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">Muted:</div>
                      <Divider variant="muted" className="flex-1" />
                    </div>
                    <div className="flex items-center gap-2 h-20">
                      <div className="w-24">Vertical:</div>
                      <Divider direction="vertical" className="h-full" />
                      <Text className="ml-4">Content after vertical divider</Text>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      </main>
      <LandingFooter />
    </div>
  );
};

export default StyleGuidePage;
