
import { oauthLogger } from "@/modules/UserManagement/logging";
import { OAuthProviderEvent } from "./events";

export class GoogleLogger {
  private static instance: GoogleLogger;
  private logger = oauthLogger.createSubLogger("Google");

  private constructor() {}

  public static getInstance(): GoogleLogger {
    if (!GoogleLogger.instance) {
      GoogleLogger.instance = new GoogleLogger();
    }
    return GoogleLogger.instance;
  }

  public logSignInAttempt(): void {
    this.logger.info(`${OAuthProviderEvent.SIGN_IN_ATTEMPT}: Google sign in process started`);
  }

  public logSignInSuccess(userId?: string): void {
    this.logger.info(`${OAuthProviderEvent.SIGN_IN_SUCCESS}: Google sign in successful`, { userId });
  }

  public logSignInFailure(error: Error | string): void {
    const errorMessage = error instanceof Error ? error.message : error;
    this.logger.error(`${OAuthProviderEvent.SIGN_IN_FAILURE}: Google sign in failed`, { error: errorMessage });
  }

  public logNoUrlError(): void {
    this.logger.error(`${OAuthProviderEvent.NO_URL_ERROR}: No URL returned from Google sign in`);
  }

  public logRedirectAttempt(url: string): void {
    this.logger.info(`${OAuthProviderEvent.REDIRECT_ATTEMPT}: Redirecting to Google auth`, { url });
  }

  public logUnexpectedError(error: Error | unknown): void {
    this.logger.error(`${OAuthProviderEvent.UNEXPECTED_ERROR}: Unexpected error during Google sign in`, error);
  }
}
