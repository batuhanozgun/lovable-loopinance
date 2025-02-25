
import { supabase } from "@/lib/supabase";

export class SignupService {
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
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

    return { data, error };
  }

  static async checkExistingUser(email: string) {
    const { data: users } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    return users;
  }
}
