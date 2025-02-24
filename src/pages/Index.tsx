
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const Index = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Loopinance'e Hoş Geldiniz
        </h1>
        <p className="text-xl text-gray-600">
          Finansal takibinizi kolaylaştırın
        </p>
        <Button onClick={handleSignOut}>Çıkış Yap</Button>
      </div>
    </div>
  );
};

export default Index;
