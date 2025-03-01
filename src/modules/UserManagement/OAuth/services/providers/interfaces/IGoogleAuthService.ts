
import { IOAuthProviderResponse, IOAuthProviderService } from "./IOAuthProviderService";

export interface IGoogleAuthService extends IOAuthProviderService {
  signIn(): Promise<IOAuthProviderResponse>;
}
