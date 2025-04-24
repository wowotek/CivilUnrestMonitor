import type { SignInIn, SignInOut, SignUpIn, SignUpOut } from "../domain";

export type AuthSvc = {
  signIn: (input: SignInIn) => Promise<SignInOut>;
  signUp: (input: SignUpIn) => Promise<SignUpOut>;
};

export const authSvc = {
  signIn: async (input: SignInIn): Promise<SignInOut> => {
    return {};
  },
  signUp: async (input: SignUpIn): Promise<SignUpOut> => {
    return {};
  },
} satisfies AuthSvc;
