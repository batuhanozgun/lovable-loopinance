
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { IAuthResponse } from "../types/IAuthResponse";
import { ISignupData } from "../types/ISignupData";
import { AuthErrors } from "../errors/AuthErrors";

export class AuthenticationService {
  private static logger = LoggerService.getInstance("AuthenticationService");

  /**
   * Sign up a new user with email and password
   */
  static async signUpWithEmailPassword(
    email: string, 
    password: string, 
    userData: ISignupData
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
          emailRedirectTo: window.location.origin,
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
          error: AuthErrors.NO_USER_RETURNED
        };
      }

      // Check for empty identities (possible repeated signup)
      if (!data.user.identities || data.user.identities.length === 0) {
        return {
          success: false,
          error: AuthErrors.EMAIL_ALREADY_REGISTERED,
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
        error: error instanceof Error ? error.message : AuthErrors.AUTHENTICATION_FAILED
      };
    }
  }

  /**
   * Sign in a user with email and password
   */
  static async signInWithEmailPassword(
    email: string,
    password: string
  ): Promise<IAuthResponse> {
    try {
      this.logger.debug("Attempting to sign in user", { email });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      this.logger.debug("Supabase signin response received", {
        hasError: !!error,
        hasSession: !!data?.session,
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
          error: AuthErrors.NO_USER_RETURNED
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error) {
      this.logger.error("Unexpected error during signin authentication", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : AuthErrors.AUTHENTICATION_FAILED
      };
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<IAuthResponse> {
    try {
      this.logger.debug("Attempting to sign out user");

      const { error } = await supabase.auth.signOut();

      if (error) {
        this.logger.error("Error during sign out", error);
        return {
          success: false,
          error: error.message
        };
      }

      this.logger.info("User signed out successfully");
      return {
        success: true
      };
    } catch (error) {
      this.logger.error("Unexpected error during sign out", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : AuthErrors.SIGNOUT_FAILED
      };
    }
  }

  /**
   * Sign in with Google OAuth
   */
  static async signInWithGoogle(): Promise<IAuthResponse> {
    try {
      this.logger.debug("Google sign in process started");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        this.logger.error("Failed to get Google sign in URL", error);
        return {
          success: false,
          error: error.message
        };
      }
      
      if (!data || !data.url) {
        this.logger.error("No URL returned from Google sign in");
        return {
          success: false,
          error: AuthErrors.NO_OAUTH_URL
        };
      }
      
      this.logger.debug("Google sign in URL obtained", { url: data.url });
      
      return {
        success: true,
        url: data.url
      };
    } catch (error) {
      this.logger.error("Unexpected error during Google sign in", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : AuthErrors.OAUTH_FAILED
      };
    }
  }
}
