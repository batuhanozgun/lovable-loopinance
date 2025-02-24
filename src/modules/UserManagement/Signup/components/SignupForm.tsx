
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { validateSignupInput } from "../validators/ValidateSignupInput";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setLoading(true);
      const validationResult = validateSignupInput({ email, password });
      if (!validationResult.success) {
        toast({
          variant: "destructive",
          title: "Hata",
          description: validationResult.error.message,
        });
        return;
      }

      await signUp.create({
        emailAddress: email,
        password,
      });

      toast({
        title: "Başarılı",
        description: "Hesabınız oluşturuldu. Yönlendiriliyorsunuz...",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Kayıt işlemi sırasında bir hata oluştu.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Kaydediliyor..." : "Kayıt Ol"}
      </Button>
    </form>
  );
};
