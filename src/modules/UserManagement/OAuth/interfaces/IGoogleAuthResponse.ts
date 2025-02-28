
export interface IGoogleUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface IGoogleAuthResponse {
  user: IGoogleUser | null;
  session: any;
  error?: Error;
}
