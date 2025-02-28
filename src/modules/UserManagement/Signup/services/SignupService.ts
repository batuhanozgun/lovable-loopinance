
import { supabase } from "@/lib/supabase";
import { SignupFormData } from "../validators/SignupValidator";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class SignupService {
  private static logger = LoggerService.getInstance("SignupService");

  static async register(userData: SignupFormData) {
    this.logger.debug("Kayıt işlemi başlatılıyor", { email: userData.email });

    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
      },
    });

    if (error) {
      this.logger.error("Supabase kayıt hatası", error, { email: userData.email });
      throw error;
    }

    this.logger.info("Kullanıcı başarıyla oluşturuldu", {
      email: userData.email,
      userId: data.user?.id,
    });

    return data;
  }
}
