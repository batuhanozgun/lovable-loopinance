
import { LandingView } from "@/modules/LandingPage/views/LandingView";
import { useEffect } from "react";
import { initLandingPageTranslations } from "@/modules/LandingPage/i18n";

const Landing = () => {
  useEffect(() => {
    // Initialize LandingPage translations
    initLandingPageTranslations();
  }, []);
  
  return <LandingView />;
};

export default Landing;
