
import { supabase } from "@/lib/supabase";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class AuthService {
  private static logger = LoggerService.getInstance();

  static async getCurrentUser() {
    this.logger.debug("Mevcut kullanıcı bilgileri alınıyor");
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      this.logger.error("Kullanıcı bilgileri alınamadı", error);
      throw error;
    }
    
    this.logger.debug("Kullanıcı bilgileri başarıyla alındı", { userId: user?.id });
    return user;
  }

  static async signOut() {
    this.logger.debug("Çıkış işlemi başlatıldı");
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      this.logger.error("Çıkış işlemi başarısız oldu", error);
      throw error;
    }
    
    this.logger.info("Kullanıcı başarıyla çıkış yaptı");
  }

  static onAuthStateChange(callback: (isAuthenticated: boolean) => void) {
    this.logger.debug("Auth durumu değişikliği dinleyicisi ekleniyor");
    
    return supabase.auth.onAuthStateChange((event, session) => {
      this.logger.debug("Auth durumu değişti", { event, userId: session?.user.id });
      callback(!!session);
    });
  }

  static async signInWithGoogle() {
    this.logger.debug("Google ile giriş işlemi başlatıldı");
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    
    if (error) {
      this.logger.error("Google ile giriş başarısız oldu", error);
      throw error;
    }
    
    this.logger.info("Google ile giriş işlemi başlatıldı, yönlendirme bekleniyor");
    return data;
  }
}
