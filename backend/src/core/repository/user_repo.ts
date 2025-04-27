import type { User } from "../domain/user";

export type UserRepository = {
  create: (input: User) => Promise<void>;
  findByUsername: (username: string) => Promise<User | undefined>;
};
