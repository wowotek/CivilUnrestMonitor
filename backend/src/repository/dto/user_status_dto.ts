import { pgEnum } from "drizzle-orm/pg-core";

const userStatusEnumName = "user_status";
export const userStatusEnum = pgEnum(userStatusEnumName, [
  "active",
  "deactivated",
]);
