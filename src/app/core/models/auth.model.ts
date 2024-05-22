export class AuthModel {
  accessToken: string;
  token: string;

  constructor(accessToken: string, token: string,) {
    this.accessToken = accessToken;
    this.token = token;
  }
}
