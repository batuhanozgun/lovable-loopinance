
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { IRedirectService } from "./interfaces/IRedirectService";

export class RedirectService implements IRedirectService {
  private static instance: RedirectService;
  private logger = LoggerService.getInstance("RedirectService");

  private constructor() {}

  public static getInstance(): RedirectService {
    if (!RedirectService.instance) {
      RedirectService.instance = new RedirectService();
    }
    return RedirectService.instance;
  }

  public redirect(url: string): void {
    this.logger.debug("Redirecting to OAuth provider", { url });
    window.location.href = url;
  }
}
