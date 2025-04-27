import { char, serial, timestamp } from "drizzle-orm/pg-core";

export const baseSchema = {
  id: serial().primaryKey(),
  serial: char({ length: 22 }).unique().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp(),
};
