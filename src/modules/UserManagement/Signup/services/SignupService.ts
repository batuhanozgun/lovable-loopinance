
import { supabase } from "@/lib/supabase";

export class SignupService {
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      // Önce kullanıcının var olup olmadığını kontrol edelim
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) {
        console.error("User list error:", usersError);
        throw usersError;
      }

      const existingUser = users?.users?.find(user => user.email === email);
      
      if (existingUser) {
        return {
          error: {
            message: "Bu e-posta adresi ile daha önce kayıt olunmuş.",
          },
          data: null,
        };
      }

      return await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
    } catch (error) {
      console.error("SignupService error:", error);
      return {
        error: {
          message: error instanceof Error ? error.message : "Kayıt işlemi sırasında bir hata oluştu.",
        },
        data: null,
      };
    }
  }
}
