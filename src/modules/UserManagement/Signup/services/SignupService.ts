
import { supabase } from "@/integrations/supabase/client";

export class SignupService {
  static async checkExistingUser(email: string) {
    const { data: users, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking existing user:", error);
      throw error;
    }

    return {
      exists: !!users,
    };
  }

  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      console.error("SignupService error:", error);
      return {
        success: false,
        error: "Servis hatası / Service error",
      };
    }
  }
}
