
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoginController } from "../controllers/LoginController";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation(["auth", "common", "errors"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await LoginController.handleLogin({ email, password });

      if (!result.success) {
        toast({
          variant: "destructive",
          title: t("common:error"),
          description: result.error,
        });
        return;
      }

      toast({
        title: t("common:success"),
        description: t("auth:login.success"),
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("common:error"),
        description: error instanceof Error ? error.message : t("errors:loginFailed"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-6">
      <div className="space-y-4">
        <Input
          type="email"
          placeholder={t("auth:login.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled={loading}
        />
        <Input
          type="password"
          placeholder={t("auth:login.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t("auth:login.loading") : t("auth:login.submit")}
      </Button>
    </form>
  );
};
