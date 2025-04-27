import { pgTable, varchar } from "drizzle-orm/pg-core";
import type { User } from "../../core/domain";
import { baseSchema } from "./base_dto";
import { userRoleEnum } from "./user_role_dto";
import { userStatusEnum } from "./user_status_dto";

const userTableName = "users";
export const UserDto = pgTable(userTableName, {
  ...baseSchema,
  username: varchar({ length: 60 }).unique().notNull(),
  password: varchar({ length: 60 }).notNull(),
  role: userRoleEnum().notNull().default("user"),
  status: userStatusEnum().notNull().default("active"),
});

type userDtoTypeQuery = typeof UserDto.$inferSelect;
export const toUserDomain = (user?: userDtoTypeQuery): User | undefined => {
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

type userDtoTypeInsert = typeof UserDto.$inferInsert;
export const fromUserDomain = (user: User): userDtoTypeInsert => {
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
