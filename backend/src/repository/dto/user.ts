import type { User } from "../../core/domain";

// this might be a class, depends on the orm that we use
export type UserDto = {
  id: number;
  serial: string;
  username: string;
  password: string;
  role: "user" | "admin";
  status: "active" | "deactivated";
  createdAt: Date;
  updatedAt: Date;
};

export const toUserDomain = (user?: UserDto): User | undefined => {
  if (!user) {
    return undefined;
  }

  return {
    serial: user.serial,
    username: user.username,
    password: user.password,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const fromUserDomain = (user: User): UserDto => {
  return {
    id: 0, // This will be set by the database
    serial: user.serial,
    username: user.username,
    password: user.password,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
