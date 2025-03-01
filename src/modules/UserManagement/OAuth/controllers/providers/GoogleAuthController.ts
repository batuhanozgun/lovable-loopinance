
import { GoogleAuthService } from "../../services/providers/GoogleAuthService";
import { RedirectService } from "../../services/redirect/RedirectService";
import { GoogleLogger } from "../../logging/providers/GoogleLogger";
import { GoogleToasts } from "../../notifications/providers/GoogleToasts";

export class GoogleAuthController {
  static async handleSignIn(): Promise<{ success: boolean, error?: string }> {
    const googleAuthService = GoogleAuthService.getInstance();
    const redirectService = RedirectService.getInstance();
    const logger = GoogleLogger.getInstance();
    
    try {
      logger.logSignInAttempt();
      
      const result = await googleAuthService.signIn();
      
      if (!result.success || !result.url) {
        logger.logNoUrlError();
        GoogleToasts.showNoUrlError();
        return { success: false, error: "Could not get Google sign in URL" };
      }
      
      logger.logRedirectAttempt(result.url);
      redirectService.redirect(result.url);
      
      return { success: true };
    } catch (error) {
      logger.logUnexpectedError(error);
      
      // Determine if we're on signup or login page for correct error message
      const isSignupPage = window.location.pathname.includes('signup');
      
      GoogleToasts.showSignInError(
        error instanceof Error ? error : undefined,
        isSignupPage
      );
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "OAuth process failed",
      };
    }
  }
}
