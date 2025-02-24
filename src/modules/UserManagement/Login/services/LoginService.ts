
import { supabase } from "@/lib/supabase";

export class LoginService {
  static async login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  }
}
