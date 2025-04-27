import { pgEnum } from "drizzle-orm/pg-core";

const userRoleEnumName = "user_role";
export const userRoleEnum = pgEnum(userRoleEnumName, ["user", "admin"]);
