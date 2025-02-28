
export interface IOAuthConfig {
  provider: 'google' | 'facebook' | 'github';
  redirectTo?: string;
}

export interface IOAuthResponse {
  provider: string;
  url: string;
}
