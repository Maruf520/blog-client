export interface User {
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface loggedInUser {
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
  email: string;
}

export interface TokenResponse {
  token: string;
  expiresInSeconds: number;
  user: loggedInUser;
}
