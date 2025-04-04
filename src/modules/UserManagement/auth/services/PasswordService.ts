
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class PasswordService {
  private static logger = LoggerService.getInstance("UserManagement.PasswordService");

  /**
   * Kullanıcının şifresini günceller
   */
  static async changePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.logger.debug("Şifre güncelleme işlemi başlatıldı");

      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        this.logger.error("Şifre güncellenirken hata oluştu", error);
        return {
          success: false,
          error: error.message
        };
      }

      this.logger.debug("Şifre başarıyla güncellendi");
      return {
        success: true
      };
    } catch (error) {
      this.logger.error("Şifre güncellenirken beklenmeyen bir hata oluştu", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu"
      };
    }
  }
}
