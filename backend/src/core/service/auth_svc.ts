import {
  UserAlreadyExistsError,
  UserNotFoundError,
  UserPasswordIncorrectError,
  type SignInIn,
  type SignInOut,
  type SignUpIn,
  type SignUpOut,
  type User,
} from "../domain";
import type { UserRepository } from "../repository";

export type AuthSvc = {
  signIn: (input: SignInIn) => Promise<SignInOut>;
  signUp: (input: SignUpIn) => Promise<SignUpOut>;
};

export const authSvc = (userRepository: UserRepository) =>
  ({
    signIn: signIn(userRepository),
    signUp: signUp(userRepository),
  }) satisfies AuthSvc;

const signIn =
  (userRepository: UserRepository) =>
  async (input: SignInIn): Promise<SignInOut> => {
    let user: User | undefined;
    try {
      user = await userRepository.findByUsername(input.username);
    } catch (err) {
      // TODO: handle error
      throw err;
    }

    // TODO: check password hashing
    if (user?.password !== input.password) {
      throw new UserPasswordIncorrectError();
    }

    return {
      token: "token",
      expiresIn: 3600,
      refreshToken: "refreshToken",
      refreshTokenExpiresIn: 7200,
    };
  };

const signUp =
  (userRepository: UserRepository) =>
  async (input: SignUpIn): Promise<SignUpOut> => {
    let user: User | undefined;
    try {
      user = await userRepository.findByUsername(input.username);
    } catch (err) {
      // TODO: handle error
      if (!(err instanceof UserNotFoundError)) {
        throw err;
      }
    } finally {
      if (!!user) {
        throw new UserAlreadyExistsError(input.username);
      }
    }

    // TODO: hash password
    // TODO: generate serial

    user = {
      serial: "serial",
      username: input.username,
      password: input.password,
      role: "user",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      await userRepository.create(user);
    } catch (err) {
      // TODO: handle error
      throw err;
    }

    return {
      user: user,
    };
  };
