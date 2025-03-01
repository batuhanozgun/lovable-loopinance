
import { LandingView } from "@/modules/LandingPage/views/LandingView";
import { useEffect } from "react";
import { initLandingPageTranslations } from "@/modules/LandingPage/i18n";

const Landing = () => {
  useEffect(() => {
    // LandingPage çevirilerini başlat
    initLandingPageTranslations();
  }, []);
  
  return <LandingView />;
};

export default Landing;
