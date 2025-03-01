
export interface IOAuthProviderResponse {
  url?: string;
  error?: string;
  success: boolean;
}

export interface IOAuthProviderService {
  signIn(): Promise<IOAuthProviderResponse>;
  getProviderName(): string;
}
