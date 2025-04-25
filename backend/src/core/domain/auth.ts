import type { User } from "./user";

export type SignInIn = {
  username: string;
  password: string;
};

export type SignInOut = {
  token: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
};

export type SignUpIn = {
  username: string;
  password: string;
};

export type SignUpOut = {
  user: Omit<User, "password">;
};
