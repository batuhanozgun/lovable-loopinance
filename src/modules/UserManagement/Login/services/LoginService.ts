
import { supabase } from "@/integrations/supabase/client";
import { loginLogger } from "../../logging";

export class LoginService {
  static async login(email: string, password: string) {
    loginLogger.debug("Attempting to login with Supabase", { email });
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      loginLogger.error("Supabase login failed", error, { email });
      throw error;
    }

    loginLogger.debug("Supabase login successful", { email });
  }
}
