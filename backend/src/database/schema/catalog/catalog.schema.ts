import { pgTable, timestamp, uniqueIndex, integer, varchar, boolean } from "drizzle-orm/pg-core";
import { users } from "@database/schema/user/user.schema";
import { files } from "@database/schema/file/file.schema";
import { jwt } from '@elysiajs/jwt';

export const catalogs = pgTable(
    'catalogs',
    {
        id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
        name: varchar('name', { length: 256 }).notNull(),
        createdAt: timestamp('uploadedAt').notNull().defaultNow(),
        owner: integer("owner").references(() => users.id, {onDelete: 'cascade'}).notNull(),
        isRoot: boolean("isRoot").default(false),
    },
)

export const container = pgTable(
  'containers',
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    catalog: integer("catalog").references(() => catalogs.id, {onDelete: 'cascade'}),
    file: integer("file").references(() => files.id, {onDelete: 'cascade'}),
  }
)