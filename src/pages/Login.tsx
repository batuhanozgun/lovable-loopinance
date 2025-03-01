
import { Login } from "@/modules/UserManagement/Login/views/LoginView";
import { useEffect } from "react";
import { initLoginTranslations } from "@/modules/UserManagement/Login/i18n";

const LoginPage = () => {
  useEffect(() => {
    // Login çevirilerini başlat
    initLoginTranslations();
  }, []);
  
  return <Login />;
};

export default LoginPage;
