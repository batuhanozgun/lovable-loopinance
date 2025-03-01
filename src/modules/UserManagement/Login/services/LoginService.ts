
import { supabase } from "@/integrations/supabase/client";
import { LoginLogger } from "../logging/LoginLogger";

export class LoginService {
  static async login(email: string, password: string) {
    LoginLogger.debug("Attempting to login with Supabase", { email });
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      LoginLogger.error("Supabase login failed", error, { email });
      throw error;
    }

    LoginLogger.debug("Supabase login successful", { email });
  }
}
