import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/schema/**/*.schema.ts',
  out: './src/database/migrations',
  dialect: "postgresql", 
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE!,
    port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
    ssl: false,
  },
} satisfies Config;