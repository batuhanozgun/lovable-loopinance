
import { supabase } from "@/lib/supabase";

export class AuthService {
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static onAuthStateChange(callback: (isAuthenticated: boolean) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(!!session);
    });
  }
}
