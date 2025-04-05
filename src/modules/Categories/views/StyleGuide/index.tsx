
import React from 'react';
import { Container } from '@/modules/StyleGuide/components/ui/container';
import { Heading, Text, Divider } from '@/modules/LandingPage/styles';
import { useTranslation } from 'react-i18next';
import CategoriesStyleGuideLayout from './CategoriesStyleGuideLayout';
import TypographySection from './sections/TypographySection';
import PageHeadingsSection from './sections/PageHeadingsSection';

const CategoriesStyleGuideView: React.FC = () => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <CategoriesStyleGuideLayout>
      <div className="space-y-12">
        <div className="p-4 border rounded-md bg-gray-50">
          <Text className="text-muted-foreground">
            Kategori modülü stil rehberi sadeleştirildi. Adım adım yeni bileşenler ekleyeceğiz.
          </Text>
        </div>
        
        <TypographySection />
        <PageHeadingsSection />
      </div>
    </CategoriesStyleGuideLayout>
  );
};

export default CategoriesStyleGuideView;
