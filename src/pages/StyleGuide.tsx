
import StyleGuidePage from "@/modules/LandingPage/views/StyleGuidePage";
import { useEffect } from "react";
import { initLandingPageTranslations } from "@/modules/LandingPage/i18n";

const StyleGuide = () => {
  useEffect(() => {
    // Initialize LandingPage translations
    initLandingPageTranslations();
  }, []);
  
  return <StyleGuidePage />;
};

export default StyleGuide;
