import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import userRoutes from "./routes/user.routes";
import fileRoutes from "./routes/file.routes";
import catalogRoutes from "./routes/catalog.routes";

const app = new Elysia()
  .use(cors({origin: "localhost:5173"}))
  .use(swagger())
  .use(userRoutes)
  .use(fileRoutes)
  .use(catalogRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
export { app };
export type App = typeof app;