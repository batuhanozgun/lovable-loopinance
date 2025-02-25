
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validateSignupInput } from "../validators/ValidateSignupInput";
import { SignupController } from "../controllers/SignupController";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const validationResult = validateSignupInput({ email, password, firstName, lastName });
      if (!validationResult.success) {
        toast({
          variant: "destructive",
          title: t("common.error"),
          description: validationResult.error.message,
        });
        return;
      }

      const result = await SignupController.handleSignup({ email, password, firstName, lastName });

      if (!result.success) {
        console.error("Signup failed:", result.error);
        toast({
          variant: "destructive",
          title: t("auth.signup.failed"),
          description: result.error,
        });
        return;
      }

      toast({
        title: t("common.success"),
        description: t("auth.signup.success"),
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: t("common.error"),
        description: error instanceof Error ? error.message : t("errors.signupFailed"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder={t("auth.signup.firstName")}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full"
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Input
          type="text"
          placeholder={t("auth.signup.lastName")}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full"
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder={t("auth.signup.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder={t("auth.signup.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t("auth.signup.loading") : t("auth.signup.submit")}
      </Button>
    </form>
  );
};
