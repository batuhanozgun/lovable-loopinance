
import React, { useEffect } from "react";
import StyleGuidePage from "@/modules/LandingPage/views/StyleGuide";
import { initLandingPageTranslations } from "@/modules/LandingPage/i18n";
import "../i18n/config"; // Import i18n configuration directly

const StyleGuide = () => {
  useEffect(() => {
    // Initialize LandingPage translations
    initLandingPageTranslations();
  }, []);
  
  return <StyleGuidePage />;
};

export default StyleGuide;
