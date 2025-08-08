
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { IGoogleAuthService } from "./interfaces/IGoogleAuthService";
import { IOAuthProviderResponse } from "./interfaces/IOAuthProviderService";

export class GoogleAuthService implements IGoogleAuthService {
  private static instance: GoogleAuthService;
  private logger = LoggerService.getInstance("GoogleAuthService");

  private constructor() {}

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  public getProviderName(): string {
    return "google";
  }

  public async signIn(): Promise<IOAuthProviderResponse> {
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
          error: "Could not get Google sign in URL"
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
        error: error instanceof Error ? error.message : "OAuth process failed"
      };
    }
  }
}
