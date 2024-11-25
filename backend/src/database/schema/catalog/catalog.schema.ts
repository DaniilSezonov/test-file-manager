import { pgTable, timestamp, integer, varchar, boolean } from "drizzle-orm/pg-core";
import { users } from "@database/schema/user/user.schema";
import { files } from "@database/schema/file/file.schema";

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

export const containerItemFile = pgTable(
  'containerItemFiles',
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    catalogId: integer("catalogId").references(() => catalogs.id, {onDelete: 'cascade'}).notNull(),
    itemFile: integer("itemFile").references(() => files.id, {onDelete: 'cascade'}).notNull(),
  }
)

export const containerItemCatalog = pgTable(
  'containerItemCatalogs',
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    catalogId: integer("catalogId").references(() => catalogs.id, {onDelete: 'cascade'}).notNull(),
    itemCatalog: integer("itemCatalog").references(() => catalogs.id, {onDelete: 'cascade'}).notNull(),
  }
)