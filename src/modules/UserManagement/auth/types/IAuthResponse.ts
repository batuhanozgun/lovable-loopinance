
export interface IAuthResponse {
  success: boolean;
  user?: any;
  error?: string;
  identities?: any[];
  session?: any;
  url?: string;
}
