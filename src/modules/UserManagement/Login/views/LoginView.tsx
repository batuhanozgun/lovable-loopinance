
import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Typewriter } from "../../common/components/Typewriter";
import { GoogleAuthButton } from "../../OAuth";
import { useEffect } from "react";
import { initLoginTranslations } from "../i18n";

export const Login = () => {
  const { t } = useTranslation(["Login", "common", "OAuth.ui"]);

  // Initialize translations for the Login module
  useEffect(() => {
    initLoginTranslations();
  }, []);

  const typewriterTexts = [
    t("Login:content.typewriter.text1"),
    t("Login:content.typewriter.text2"),
    t("Login:content.typewriter.text3")
  ];

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(250,250,250,1)] via-[rgba(108,154,229,0.7)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]" />
        <Link 
          to="/" 
          className="relative z-20 flex items-center text-lg font-medium transition-opacity hover:opacity-80 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          {t("common:brandName")}
        </Link>
        <div className="relative z-20 mt-auto">
          <Typewriter 
            texts={typewriterTexts} 
            className="font-light text-white dark:text-zinc-100 text-shadow" 
          />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("Login:content.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("Login:content.subtitle")}
            </p>
          </div>
          
          <GoogleAuthButton />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("OAuth.ui:or")}
              </span>
            </div>
          </div>
          
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t("Login:content.noAccount")}{" "}
            <Link
              to="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t("Login:content.createAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
