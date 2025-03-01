
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { IAuthResponse } from "./interfaces/IAuthResponse";

export class AuthenticationService {
  private static logger = LoggerService.getInstance("AuthenticationService");

  /**
   * Sign up a new user with email and password
   */
  static async signUpWithEmailPassword(
    email: string, 
    password: string, 
    userData: { firstName: string; lastName: string }
  ): Promise<IAuthResponse> {
    try {
      this.logger.debug("Attempting to sign up user", { email, ...userData });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          },
        },
      });

      this.logger.debug("Supabase signup response received", { 
        hasError: !!error, 
        hasUser: !!data?.user,
        errorMessage: error?.message
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: "No user returned from signup"
        };
      }

      // Check for empty identities (possible repeated signup)
      if (!data.user.identities || data.user.identities.length === 0) {
        return {
          success: false,
          error: "Email may already be registered",
          identities: []
        };
      }

      return {
        success: true,
        user: data.user,
        identities: data.user.identities
      };
    } catch (error) {
      this.logger.error("Unexpected error during signup authentication", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Authentication failed"
      };
    }
  }
}
