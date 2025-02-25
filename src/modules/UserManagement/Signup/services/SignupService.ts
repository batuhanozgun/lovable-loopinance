
import { supabase } from "@/lib/supabase";

export class SignupService {
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
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
  }
}
