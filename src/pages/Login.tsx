
import { Login } from "@/modules/UserManagement/Login/views/LoginView";
import { useEffect } from "react";
import { initLoginTranslations } from "@/modules/UserManagement/Login/i18n";

const LoginPage = () => {
  useEffect(() => {
    // Initialize Login translations
    initLoginTranslations();
  }, []);
  
  return <Login />;
};

export default LoginPage;
