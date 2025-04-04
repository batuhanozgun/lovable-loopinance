
import React from 'react';
import { LandingHeader } from '@/modules/LandingPage/components/LandingHeader';
import { LandingFooter } from '@/modules/LandingPage/components/LandingFooter';
import { Container, Heading, Text } from '@/modules/LandingPage/styles';

interface StyleGuideLayoutProps {
  children: React.ReactNode;
}

const StyleGuideLayout: React.FC<StyleGuideLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      
      <main className="flex-1 pt-20 pb-12">
        <Container>
          <Heading level="h1" className="mb-6 text-3xl">Style Guide</Heading>
          
          <Text className="mb-8">
            Bu sayfa, uygulamamızın görsel dilini ve bileşen kütüphanesini gösterir.
          </Text>
          
          {children}
        </Container>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default StyleGuideLayout;
