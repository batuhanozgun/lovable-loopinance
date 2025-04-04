
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader/index';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter/index';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  Mail,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Menu,
  X,
  Check,
  PlusCircle,
  BarChart3,
  Lock,
  Sparkles,
  Rotate3D,
  ArrowDownRight,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Loader,
  Trash,
  Edit,
  MoreHorizontal,
  ExternalLink,
  Copy
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
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Text Alignment</Text>
                  <div className="space-y-2">
                    <Text align="left" className="border-l-2 border-primary pl-2">Left aligned text</Text>
                    <Text align="center" className="border-l-2 border-primary border-r-2 px-2">Center aligned text</Text>
                    <Text align="right" className="border-r-2 border-primary pr-2">Right aligned text</Text>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Icons Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Icons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Common UI Icons</Text>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {[
                      { icon: <User />, name: "User" },
                      { icon: <Settings />, name: "Settings" },
                      { icon: <Bell />, name: "Bell" },
                      { icon: <Search />, name: "Search" },
                      { icon: <Menu />, name: "Menu" },
                      { icon: <X />, name: "X (Close)" },
                      { icon: <Check />, name: "Check" },
                      { icon: <Home />, name: "Home" },
                      { icon: <Calendar />, name: "Calendar" },
                      { icon: <Mail />, name: "Mail" },
                      { icon: <PlusCircle />, name: "PlusCircle" },
                      { icon: <Trash />, name: "Trash" }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-3 border rounded-md text-center gap-2">
                        <div className="text-primary">{item.icon}</div>
                        <Text size="xs">{item.name}</Text>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Navigation Icons</Text>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {[
                      { icon: <ArrowRight />, name: "ArrowRight" },
                      { icon: <ArrowLeft />, name: "ArrowLeft" },
                      { icon: <ArrowUp />, name: "ArrowUp" },
                      { icon: <ArrowDown />, name: "ArrowDown" },
                      { icon: <ChevronRight />, name: "ChevronRight" },
                      { icon: <ChevronLeft />, name: "ChevronLeft" },
                      { icon: <ChevronUp />, name: "ChevronUp" },
                      { icon: <ChevronDown />, name: "ChevronDown" },
                      { icon: <ExternalLink />, name: "ExternalLink" }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-3 border rounded-md text-center gap-2">
                        <div className="text-primary">{item.icon}</div>
                        <Text size="xs">{item.name}</Text>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Feature Icons</Text>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {[
                      { icon: <BarChart3 />, name: "BarChart3" },
                      { icon: <Lock />, name: "Lock" },
                      { icon: <Sparkles />, name: "Sparkles" },
                      { icon: <Rotate3D />, name: "Rotate3D" },
                      { icon: <ArrowDownRight />, name: "ArrowDownRight" },
                      { icon: <CheckCircle />, name: "CheckCircle" },
                      { icon: <Star />, name: "Star" },
                      { icon: <Box />, name: "Box" },
                      { icon: <Edit />, name: "Edit" }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-3 border rounded-md text-center gap-2">
                        <div className="text-primary">{item.icon}</div>
                        <Text size="xs">{item.name}</Text>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Icon Wrappers</Text>
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
                  
                  <div className="mt-4">
                    <Text variant="muted" weight="medium" className="mb-2">Button With Icons</Text>
                    <div className="flex flex-wrap gap-4">
                      <Button>
                        <PlusCircle className="mr-1 h-4 w-4" /> Create
                      </Button>
                      <Button variant="outline">
                        <ArrowRight className="ml-1 h-4 w-4" /> Continue
                      </Button>
                      <Button variant="ghost" className="group">
                        View <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Text variant="muted" weight="medium" className="mb-2">Button Sizes</Text>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon"><Settings className="h-4 w-4" /></Button>
                    </div>
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
                  
                  <div className="mt-4">
                    <Text variant="muted" weight="medium" className="mb-2">Badge Sizes</Text>
                    <div className="flex flex-wrap gap-4 items-center">
                      <StyleBadge variant="default" size="sm">Small</StyleBadge>
                      <StyleBadge variant="default" size="md">Medium</StyleBadge>
                      <StyleBadge variant="default" size="lg">Large</StyleBadge>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Text variant="muted" weight="medium" className="mb-2">Badge With Icons</Text>
                    <div className="flex flex-wrap gap-4 items-center">
                      <StyleBadge variant="default">
                        <span className="flex items-center">
                          <CheckCircle className="mr-1 h-3 w-3" /> Verified
                        </span>
                      </StyleBadge>
                      <StyleBadge variant="outline">
                        <span className="flex items-center">
                          <Star className="mr-1 h-3 w-3" /> Featured
                        </span>
                      </StyleBadge>
                    </div>
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
                  
                  <div className="mt-6">
                    <Text variant="muted" weight="medium" className="mb-4">Card Variations</Text>
                    <Grid cols={3} gap="md">
                      <FeatureCard hover="shadow">
                        <div className="flex items-start">
                          <IconWrapper variant="primary" size="md" background="primary" className="mb-3">
                            <Lock />
                          </IconWrapper>
                        </div>
                        <Heading level="h4" className="mb-2">Shadow Hover Card</Heading>
                        <Text variant="muted" size="sm">This card shows shadow on hover.</Text>
                      </FeatureCard>
                      
                      <FeatureCard hover="both" className={backgrounds.glass.medium}>
                        <div className="flex items-start">
                          <IconWrapper variant="primary" size="md" background="primary" className="mb-3">
                            <BarChart3 />
                          </IconWrapper>
                        </div>
                        <Heading level="h4" className="mb-2">Glass Background</Heading>
                        <Text variant="muted" size="sm">Card with glass background effect.</Text>
                      </FeatureCard>
                      
                      <FeatureCard hover="lift" className={cn("border-l-4 border-primary", backgrounds.pattern.grid)}>
                        <div className="flex items-start">
                          <IconWrapper variant="primary" size="md" background="primary" className="mb-3">
                            <Sparkles />
                          </IconWrapper>
                        </div>
                        <Heading level="h4" className="mb-2">Pattern Background</Heading>
                        <Text variant="muted" size="sm">Card with pattern background and accent border.</Text>
                      </FeatureCard>
                    </Grid>
                  </div>
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
                    <div>
                      <Link href="#" variant="default" underline="always">Always Underlined Link</Link>
                    </div>
                    <div>
                      <Link href="#" variant="primary" external>
                        <span className="flex items-center">
                          External Link <ExternalLink className="ml-1 h-3 w-3" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Interactive Components</Text>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Button className="group">
                        <span className="flex items-center">
                          Next <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Button>
                      
                      <Button variant="outline" className="group">
                        <span className="flex items-center">
                          <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back
                        </span>
                      </Button>
                      
                      <Button variant="ghost" className="relative overflow-hidden group">
                        <span className="relative z-10">Hover Effect</span>
                        <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button disabled>Disabled Button</Button>
                      <Button variant="outline" disabled>Disabled Outline</Button>
                      <div className="relative">
                        <Button>
                          <span className="flex items-center">
                            <Loader className="mr-1 h-4 w-4 animate-spin" /> Loading...
                          </span>
                        </Button>
                      </div>
                    </div>
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
                      <Text>Pattern Background (Grid)</Text>
                    </div>
                    <div className={`h-24 rounded-md ${backgrounds.pattern.dots} flex items-center justify-center border`}>
                      <Text>Pattern Background (Dots)</Text>
                    </div>
                    <div className={`h-24 rounded-md ${backgrounds.glass.medium} flex items-center justify-center border`}>
                      <Text>Glass Background</Text>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Container Sizes</Text>
                  <div className="space-y-8">
                    <div>
                      <Text size="sm" weight="medium" className="mb-2">Narrow Container</Text>
                      <div className={`${containers.narrow} h-16 bg-muted/30 flex items-center justify-center border border-dashed border-primary/50 rounded-md`}>
                        <Text size="sm">max-w-3xl mx-auto px-4</Text>
                      </div>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-2">Default Container</Text>
                      <div className={`${containers.default} h-16 bg-muted/30 flex items-center justify-center border border-dashed border-primary/50 rounded-md`}>
                        <Text size="sm">max-w-5xl mx-auto px-4</Text>
                      </div>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-2">Wide Container</Text>
                      <div className={`${containers.wide} h-16 bg-muted/30 flex items-center justify-center border border-dashed border-primary/50 rounded-md`}>
                        <Text size="sm">max-w-7xl mx-auto px-4</Text>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Responsive Layout</Text>
                  <div className="space-y-4">
                    <div className="border p-4 rounded-md">
                      <Text size="sm" weight="medium" className="mb-2">Mobile First Design</Text>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="h-16 bg-muted/50 flex items-center justify-center rounded">
                            <Text size="xs">Item {item}</Text>
                          </div>
                        ))}
                      </div>
                      <Text size="xs" className="mt-2 text-muted-foreground">Resize browser to see the responsive behavior</Text>
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
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Transitions & Animations</Text>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="border rounded-md p-4 hover:-translate-y-1 transition-transform duration-300">
                      <Text size="sm" weight="medium" className="mb-1">Transform on Hover</Text>
                      <Text size="xs" variant="muted">Hover to see the effect</Text>
                    </div>
                    
                    <div className="border rounded-md p-4 hover:shadow-lg transition-shadow duration-300">
                      <Text size="sm" weight="medium" className="mb-1">Shadow on Hover</Text>
                      <Text size="xs" variant="muted">Hover to see the effect</Text>
                    </div>
                    
                    <div className="border border-primary/0 rounded-md p-4 hover:border-primary/100 transition-colors duration-300">
                      <Text size="sm" weight="medium" className="mb-1">Border on Hover</Text>
                      <Text size="xs" variant="muted">Hover to see the effect</Text>
                    </div>
                    
                    <div className="border rounded-md p-4 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <div className="relative">
                        <Text size="sm" weight="medium" className="mb-1">Overlay Animation</Text>
                        <Text size="xs" variant="muted">Hover to see the effect</Text>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)] opacity-0 hover:opacity-40 transition-opacity duration-500"></div>
                      <div className="relative">
                        <Text size="sm" weight="medium" className="mb-1">Gradient Overlay</Text>
                        <Text size="xs" variant="muted">Hover to see the effect</Text>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern bg-muted/50 opacity-0 hover:opacity-30 transition-opacity duration-500"></div>
                      <div className="relative">
                        <Text size="sm" weight="medium" className="mb-1">Pattern Reveal</Text>
                        <Text size="xs" variant="muted">Hover to see the effect</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Landing Page Component Examples */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Landing Page Component Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Feature Cards</Text>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        icon: <BarChart3 className="h-5 w-5 text-primary" />,
                        title: "Easy Tracking",
                        description: "Monitor your finances with intuitive dashboards and reports."
                      },
                      {
                        icon: <Rotate3D className="h-5 w-5 text-primary" />,
                        title: "Seamless Sync",
                        description: "Sync data across all your devices in real-time."
                      },
                      {
                        icon: <Lock className="h-5 w-5 text-primary" />,
                        title: "Bank-Level Security",
                        description: "Your data is protected with the highest security standards."
                      }
                    ].map((feature, index) => (
                      <Card 
                        key={index} 
                        className="p-4 border border-border/40 bg-background/90 hover:shadow-md transition-all hover:border-border/60 hover:-translate-y-0.5 duration-300"
                      >
                        <div className="flex flex-col h-full">
                          <div className="rounded-full bg-primary/10 dark:bg-primary/5 w-8 h-8 flex items-center justify-center mb-3">
                            {feature.icon}
                          </div>
                          <h3 className="text-sm font-semibold mb-1.5">{feature.title}</h3>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">CTA Section</Text>
                  <section className="py-6 px-4 relative overflow-hidden rounded-lg">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-blue-50/50 to-cyan-50/80 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-slate-900/80 backdrop-blur-[2px]"></div>
                    
                    <div className="relative z-10">
                      <Card className="px-5 py-6 border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
                        <div className="flex flex-col items-center text-center">
                          <div className="inline-flex items-center justify-center mb-3 gap-1.5">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-xs font-medium text-primary">Get Started</span>
                          </div>
                          
                          <h2 className="text-base font-bold mb-2 text-foreground">Ready to manage your finances?</h2>
                          
                          <p className="text-xs text-muted-foreground mb-4 max-w-xl mx-auto">
                            Join thousands of users who have simplified their financial management.
                          </p>
                          
                          <Button size="sm" className="group shadow-sm px-3 py-1.5 h-8">
                            Sign up now
                            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </section>
                </div>
                
                <Divider />
                
                <div>
                  <Text variant="muted" weight="medium" className="mb-4">Navigation Components</Text>
                  
                  <div className="space-y-6">
                    <div className="p-4 border rounded-md">
                      <Text size="sm" weight="medium" className="mb-3">Header Mobile Menu Button</Text>
                      <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-md hover:bg-muted/50 transition-colors">
                          <Menu size={20} />
                        </button>
                        <button className="p-2 rounded-md hover:bg-muted/50 transition-colors">
                          <X size={20} />
                        </button>
                        <div className="text-xs text-muted-foreground">← Mobile menu toggle buttons</div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <Text size="sm" weight="medium" className="mb-3">Navigation Link Examples</Text>
                      <div className="flex flex-col space-y-2">
                        <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
                        <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
                        <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
                        <Link to="#" className="text-sm font-medium text-primary">Style Guide (active)</Link>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <Text size="sm" weight="medium" className="mb-3">Mobile Navigation</Text>
                      <div className="bg-background border-t border-border/20 p-4 w-full rounded">
                        <nav className="flex flex-col space-y-4">
                          <Link 
                            to="#" 
                            className="px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            Home
                          </Link>
                          <Link 
                            to="#" 
                            className="px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            Features
                          </Link>
                          <Link 
                            to="#" 
                            className="px-2 py-1 rounded-md bg-muted/50 text-primary transition-colors"
                          >
                            Style Guide
                          </Link>
                          <Link 
                            to="#" 
                            className="px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            About
                          </Link>
                        </nav>
                      </div>
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
