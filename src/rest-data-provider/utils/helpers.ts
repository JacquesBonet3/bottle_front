const loginEndpoint = () => 'auth/login'

const registerEndpoint = () => 'auth/register'

const accessTokenKeyName = 'accessToken'

const onTokenExpiration = 'refreshToken' // logout | refreshToken

export {
  onTokenExpiration,
  accessTokenKeyName,
  registerEndpoint,
  loginEndpoint,
}
