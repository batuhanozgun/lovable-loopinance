
import { supabase } from "@/lib/supabase";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class LoginService {
  private static logger = LoggerService.getInstance();

  static async login(email: string, password: string) {
    this.logger.debug("Supabase ile giriş denemesi yapılıyor", { email });
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      this.logger.error("Supabase giriş işlemi başarısız", error, { email });
      throw error;
    }

    this.logger.debug("Supabase giriş işlemi başarılı", { email });
  }
}
