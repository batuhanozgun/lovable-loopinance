
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SignupController } from "../controllers/SignupController";
import { SignupSchema } from "../validators/SignupValidator";
import { useTranslation } from "react-i18next";

export const SignUp = () => {
  const { t } = useTranslation([
    "UserManagement.signup.ui", 
    "UserManagement.signup.messages", 
    "UserManagement.signup.validation",
    "common", 
    "errors"
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(SignupSchema)
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    
    try {
      const result = await SignupController.handleSignup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      });
      
      if (result.success) {
        // Wait for toast to be visible before redirect
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("common:error"),
        description: error instanceof Error ? error.message : t("UserManagement.signup.messages:error.signupFailed")
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              id="firstName"
              placeholder={t("form.firstName")}
              {...register("firstName")}
              className="w-full"
              disabled={loading}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message?.toString() || t("errors:validation.required")}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Input
              id="lastName"
              placeholder={t("form.lastName")}
              {...register("lastName")}
              className="w-full"
              disabled={loading}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message?.toString() || t("errors:validation.required")}
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder={t("form.email")}
            {...register("email")}
            className="w-full"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">
              {errors.email.message?.toString() || t("errors:validation.invalidEmail")}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            placeholder={t("form.password")}
            {...register("password")}
            className="w-full"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message?.toString() || t("errors:validation.passwordTooShort")}
            </p>
          )}
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t("form.loading") : t("form.submit")}
      </Button>
    </form>
  );
};
