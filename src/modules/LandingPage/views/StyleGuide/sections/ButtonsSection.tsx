
import React from 'react';
import { Button } from '@/components/ui/button';
import { Section, Heading, Divider } from '@/modules/LandingPage/styles';
import { Star, ArrowRight } from 'lucide-react';

const ButtonsSection: React.FC = () => {
  return (
    <Section className="mb-10">
      <Heading level="h2" className="mb-4">Butonlar</Heading>
      <Divider className="mb-4" />
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Buton Varyantları</h3>
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="gradient">Gradient</Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Buton Boyutları</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg">Large</Button>
            <Button>Default</Button>
            <Button size="sm">Small</Button>
            <Button size="icon"><Star className="h-3 w-3" /></Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">İkon İle Butonlar</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button className="group flex items-center gap-2">
              Sağ İkon
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            
            <Button className="group flex items-center gap-2" variant="outline">
              <ArrowRight className="w-4 h-4" />
              Sol İkon
            </Button>
            
            <Button className="group flex items-center gap-2" variant="gradient">
              Gradient Buton
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Özel İkon Renkleri</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button className="group flex items-center gap-2" variant="outline">
              Outline Buton
              <ArrowRight className="w-4 h-4 text-primary" />
            </Button>
            
            <Button className="group flex items-center gap-2" variant="ghost">
              Ghost Buton
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ButtonsSection;
