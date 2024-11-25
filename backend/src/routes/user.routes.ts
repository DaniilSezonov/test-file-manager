import Elysia, { error, t } from "elysia";
import AuthService from "@services/user/auth";
import { jwt } from '@elysiajs/jwt';

export default new Elysia({ name: "user" })
  .use(jwt<"jwt">({
    name: 'jwt',
    secret: process.env.JWT_SECRETS! ?? "MY_TEST_SECRET))",
  }))
  .group("/users", (app) =>
    app
      .post("/signup", async ({ body, error }) => {
        const { name, email, password } = body;
        const { status, msg, result } = await AuthService.signUp(email, password, name);
        if (result) {
          return result;
        }
        if (status !== 200 && !result) {
          error(status, msg);
        }
      },
        {
          body: t.Object({
            email: t.String({
              format: "email",
            }),
            name: t.String({
              minLength: 6,
            }),
            password: t.String({ minLength: 12 })
          }),
          detail: {
            description: "Sign Up",
            tags: ["UserRoutes"]
          }
        }
      )
      .post("/signin", async ({ body, error, jwt }) => {
        const { email, password } = body;
        const { status, msg, result } = await AuthService.signIn(email, password);
        if (status !== 200) {
          error(status, msg);
        }
        if (result) {
          const token = await jwt.sign({
            sub: result.id.toString(),
          })
          return {token};
        }
        error(500)
      }, {
        body: t.Object({
          email: t.String({
            format: "email",
          }),
          password: t.String({ minLength: 12 }),
        }),
        detail: {
          description: "Sign In",
          tags: ["UserRoutes"]
        }
      })
  )