
import React from 'react';
import { Button } from '@/components/ui/button';
import { Section, Heading, Divider } from '@/modules/LandingPage/styles';
import { Star, ArrowRight } from 'lucide-react';
import { IconButton } from '@/modules/LandingPage/components/common/IconButton';

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
          <h3 className="text-sm font-medium mb-2">Icon Butonlar - Standard Görünüm</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton>
              Default (Mavi İkon)
              <ArrowRight />
            </IconButton>
            
            <IconButton variant="primary">
              Primary (Beyaz İkon)
              <ArrowRight />
            </IconButton>
            
            <IconButton variant="gradient">
              Gradient (Beyaz İkon)
              <ArrowRight />
            </IconButton>
            
            <IconButton variant="outline">
              Outline (Mavi İkon)
              <ArrowRight />
            </IconButton>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">İkon Konumu</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton iconPosition="left">
              <ArrowRight />
              Sol İkon
            </IconButton>
            
            <IconButton>
              Sağ İkon
              <ArrowRight />
            </IconButton>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Özel İkon Renkleri</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton iconVariant="primary">
              Açık Mavi İkon
              <ArrowRight />
            </IconButton>
            
            <IconButton iconVariant="muted">
              Gri İkon
              <ArrowRight />
            </IconButton>
            
            <IconButton variant="primary" iconVariant="gradient">
              Gradient İkon
              <ArrowRight />
            </IconButton>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ButtonsSection;
