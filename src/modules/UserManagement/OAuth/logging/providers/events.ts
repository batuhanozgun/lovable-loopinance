
export enum OAuthProviderEvent {
  SIGN_IN_ATTEMPT = "oauth_sign_in_attempt",
  SIGN_IN_SUCCESS = "oauth_sign_in_success",
  SIGN_IN_FAILURE = "oauth_sign_in_failure",
  NO_URL_ERROR = "oauth_no_url_error",
  REDIRECT_ATTEMPT = "oauth_redirect_attempt",
  UNEXPECTED_ERROR = "oauth_unexpected_error"
}
