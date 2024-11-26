import { pgTable, timestamp, integer, varchar, real } from "drizzle-orm/pg-core";
import { catalogs } from "../catalog/catalog.schema";

export const files = pgTable(
	'files',
	{
		id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
		name: varchar('name', { length: 256 }).notNull(),
		verboseName: varchar('verboseName', { length: 256 }).notNull(),
		size: real('size').notNull(),
		uploadedAt: timestamp('uploadedAt').notNull().defaultNow(),
		path: varchar('path').notNull(),
	},
)

export const relatedFiles = pgTable(
	'relatedFiles',
	{
		id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
		catalogId: integer("catalogId").references(() => catalogs.id, {onDelete: 'cascade'}).notNull(),
		itemFile: integer("itemFile").references(() => files.id, {onDelete: 'cascade'}).notNull(),
	}
)