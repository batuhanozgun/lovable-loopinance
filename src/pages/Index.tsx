
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BarChart3, CreditCard, Home, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthService } from "@/modules/UserManagement/common/services/AuthService";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await AuthService.signOut();
      // Toast ekleme gerekli değil çünkü başarılı çıkış sonrası sayfa değişecek
    } catch (error) {
      console.error("Çıkış yapılırken bir hata oluştu:", error);
      toast({
        title: "Çıkış yapılamadı",
        description: "İşleminiz sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">{t("common:brandName")}</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md px-3 py-2">
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <a href="#" className="flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md px-3 py-2">
            <BarChart3 size={18} />
            <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md px-3 py-2">
            <Settings size={18} />
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md px-3 py-2">
            <User size={18} />
            <span>Profile</span>
          </a>
        </nav>
        <div className="p-4 border-t border-sidebar-border flex flex-col gap-2">
          <LanguageSelector className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground" />
          <ThemeToggle className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground" />
          <Button 
            variant="outline" 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground gap-2" 
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            <LogOut size={18} />
            {isLoggingOut ? t("common:loggingOut") : t("common:logout")}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-background">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">{t("common:welcome")}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <h2 className="text-xl font-semibold mb-2">Financial Summary</h2>
              <p className="text-muted-foreground">View your latest financial activities and summaries.</p>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
              <p className="text-muted-foreground">Monitor your recent spending and income patterns.</p>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <h2 className="text-xl font-semibold mb-2">Budget Goals</h2>
              <p className="text-muted-foreground">Track your progress towards financial objectives.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
