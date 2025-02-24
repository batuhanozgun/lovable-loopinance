
import { supabase } from "@/lib/supabase";

export class SignupService {
  static async signUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
  }
}
