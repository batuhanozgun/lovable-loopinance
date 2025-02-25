
import { supabase } from "@/lib/supabase";

export class SignupService {
  static async signUp(email: string, password: string) {
    return await supabase.auth.signUp({
      email,
      password,
    });
  }
}
