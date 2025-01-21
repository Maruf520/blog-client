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

export interface GetPost {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string | null;
  author: Author;
  comments: Comment[];
}

export interface Author {
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
  image: string | null;
  email: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  userId: string;
  postId: string;
}
