
import { ISubscription } from "./ISubscription";

export interface ISubscriptionResponse {
  success: boolean;
  subscription?: ISubscription;
  error?: string;
}

export interface ISubscriptionListResponse {
  success: boolean;
  subscriptions?: ISubscription[];
  error?: string;
}

export interface IUpdateSubscriptionResponse {
  success: boolean;
  updated?: boolean;
  subscription?: ISubscription;
  error?: string;
}
