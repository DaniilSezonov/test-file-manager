import Elysia, { t } from "elysia";
import authPlugin from "../plugins/auth";

import AuthService from "@services/user/auth";
import CatalogService from "@services/catalog/catalog";
import UserManager from "@database/managers/user.manager";
import jwt from "@elysiajs/jwt";

export default new Elysia({ name: "auth" })
  .use(
    jwt<"jwt">({
      name: "jwt",
      secret: process.env.JWT_SECRETS!,
    }),
  )
  .group("/auth", (app) =>
    app
      .post(
        "/signup",
        async ({ body, set }) => {
          const { name, email, password } = body;
          const { status, msg, result } = await AuthService.signUp(
            email,
            password,
            name,
          );
          if (status !== 200 && !result) {
            set.status = status;
            throw new Error(msg);
          }
          return result;
        },
        {
          body: t.Object({
            email: t.String({
              format: "email",
              error: "Wrong email format.",
            }),
            name: t.String({
              minLength: 6,
              error: "Name must contains atleast 6 symbols.",
            }),
            password: t.String({
              minLength: 12,
              error: "Password must contains atleast 12 symbols.",
            }),
          }),
          detail: {
            description: "Sign Up",
            tags: ["AuthRoutes"],
          },
        },
      )
      .post(
        "/signin",
        async ({ body, jwt, set }) => {
          const { email, password } = body;
          const { status, msg, result } = await AuthService.signIn(
            email,
            password,
          );
          if (status !== 200) {
            console.log(status);
            set.status = status;
            throw new Error(msg);
          }
          if (result) {
            const token = await jwt.sign({
              sub: result.id.toString(),
            });
            return { token };
          }
        },
        {
          body: t.Object({
            email: t.String({
              format: "email",
              error: "Invalid email format.",
            }),
            password: t.String({ minLength: 12, error: "Wrong password." }),
          }),
          detail: {
            description: "Sign In",
            tags: ["AuthRoutes"],
          },
        },
      ),
  );
