
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoginController } from "../controllers/LoginController";
import { useTranslation } from "react-i18next";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { t } = useTranslation(["modules:UserManagement.login", "common", "shared:errors"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    
    try {
      const result = await LoginController.handleLogin({
        email: data.email,
        password: data.password
      });
      
      if (result.success) {
        toast({
          title: t("common:success"),
          description: t("messages.success")
        });
        
        // Wait for toast to be visible before redirect
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("common:error"),
        description: error instanceof Error ? error.message : t("errors.failed")
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder={t("form.email")}
            {...register("email", { required: true })}
            className="w-full"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">
              {t("shared:errors.fieldRequired")}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            placeholder={t("form.password")}
            {...register("password", { required: true })}
            className="w-full"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {t("shared:errors.fieldRequired")}
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
