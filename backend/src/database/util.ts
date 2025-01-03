import { SQL, sql } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core/columns";

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
