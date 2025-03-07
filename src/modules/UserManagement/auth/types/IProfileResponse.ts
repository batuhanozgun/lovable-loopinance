
import { IUserProfile } from "./IUserProfile";

export interface IProfileResponse {
  success: boolean;
  profile?: IUserProfile;
  error?: string;
}
