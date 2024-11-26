import {
  pgTable,
  timestamp,
  uniqueIndex,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import { lower } from "@database/util";

export const users = pgTable(
  "users",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (users) => {
    return [uniqueIndex("emailUniqueIndex").on(lower(users.email))];
  },
);
