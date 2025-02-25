
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export class SignupService {
  static async checkExistingUser(email: string) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000 // We'll get all users and filter on our side since the API doesn't support direct filtering
    });

    if (error) {
      console.error("Error checking existing user:", error);
      throw error;
    }

    // Filter users by email on the client side
    const userExists = data.users.some((user: User) => user.email === email);

    return {
      exists: userExists,
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

