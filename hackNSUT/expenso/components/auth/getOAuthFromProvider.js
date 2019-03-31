import { AuthSession } from 'expo';
import { authConfig } from 'config';

const { FB_APP_ID, GOOGLE_CLIENT_ID } = authConfig;

export const facebookAuth = async () => {
  const redirectUrl = AuthSession.getRedirectUrl();
  return AuthSession.startAsync({
    authUrl:
      'https://www.facebook.com/v2.8/dialog/oauth?response_type=token'
      + `&client_id=${FB_APP_ID}`
      + '&scopes=email,public_profile'
      + `&redirect_uri=${encodeURIComponent(redirectUrl)}`
  });
};

export const googleAuth = async () => {
  const redirectUrl = AuthSession.getRedirectUrl();
  const AuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?';
  const params = `client_id=${GOOGLE_CLIENT_ID}&`
    + `redirect_uri=${redirectUrl}&`
    + 'response_type=token&'
    + 'scope=profile+email+openid&'
    + 'include_granted_scopes=true&'
    + 'state=state_parameter_passthrough_value';
  const result = await AuthSession.startAsync({
    authUrl: `${AuthUrl}${params}`
  });
  // console.log(result);
  return result;
};
