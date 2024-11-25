import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

const authPlugin = (app: Elysia) =>
  app
  .use(jwt<"jwt">({
    name: 'jwt',
    secret: process.env.JWT_SECRETS!,
  }))
  .derive(async ({ jwt, cookie: { auth }, set}) => {
    if (!auth.value) {
      set.status = "Unauthorized";
      throw new Error("Access token is missing");
    }
    const decoded = await jwt.verify(auth.value);
    if (!decoded) {
      set.status = "Forbidden";
      throw new Error("Access token is invalid");
    }
    return {userId: decoded.sub}; 
  })

export default authPlugin;