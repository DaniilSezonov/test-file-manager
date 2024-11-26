import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const postgresClient = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const DATABASE = drizzle({ client: postgresClient });
export default DATABASE;
