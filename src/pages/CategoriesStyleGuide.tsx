
import React, { useEffect } from 'react';
import CategoriesStyleGuideView from '@/modules/Categories/views/StyleGuide';
import { loadTranslations } from '@/modules/Categories/i18n';
import "../i18n/config"; // Import i18n configuration directly

const CategoriesStyleGuide = () => {
  useEffect(() => {
    // Initialize Categories translations
    loadTranslations();
  }, []);
  
  return <CategoriesStyleGuideView />;
};

export default CategoriesStyleGuide;
