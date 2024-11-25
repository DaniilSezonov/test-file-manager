import { pgTable, timestamp, uniqueIndex, integer, varchar, real } from "drizzle-orm/pg-core";

export const files = pgTable(
    'files',
    {
        id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
        name: varchar('name', { length: 256 }).notNull(),
        size: real('size').notNull(),
        uploadedAt: timestamp('uploadedAt').notNull().defaultNow(),
    },
)