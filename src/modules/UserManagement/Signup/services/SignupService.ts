
import { supabase } from "@/lib/supabase";

export class SignupService {
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      // Önce kullanıcının var olup olmadığını kontrol edelim
      const { data: users } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (users) {
        return {
          error: {
            message: "Bu e-posta adresi ile daha önce kayıt olunmuş.",
          },
          data: null,
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        console.error("Signup error:", error);
        return { error, data: null };
      }

      // Kayıt başarılı olduğunda kullanıcı profilini oluşturalım
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email,
              first_name: firstName,
              last_name: lastName,
            }
          ]);

        if (profileError) {
          console.error("Profile creation error:", profileError);
          return {
            error: {
              message: "Profil oluşturulurken bir hata oluştu.",
            },
            data: null,
          };
        }
      }

      return { data, error: null };
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
