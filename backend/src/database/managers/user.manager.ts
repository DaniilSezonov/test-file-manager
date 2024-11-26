import db from "@database/connection";
import { users } from "@database/schema/user/user.schema";
import { catalogs } from "@database/schema/catalog/catalog.schema";
import { eq } from "drizzle-orm";

const UserManager = {
  isEmailExists: async (email: string) => {
    const usersCount = await db.$count(users, eq(users.email, email));
    return usersCount !== 0;
  },
  createUser: async (email: string, password: string, name: string) => {
    return db.transaction(async (tx) => {
      const user = (
        await tx
          .insert(users)
          .values({ email, password, name })
          .returning({ id: users.id, email: users.email })
      )?.[0];
      if (user) {
        const rootCatalog = (
          await tx
            .insert(catalogs)
            .values({ name: user.id.toString(), isRoot: true, owner: user.id })
            .returning({
              id: catalogs.id,
              name: catalogs.name,
              isRoot: catalogs.isRoot,
            })
        )?.[0];
        if (rootCatalog?.id) {
          return user;
        }
      }
    });
  },
  getUserById: async (id: string) => {
    return (
      await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(id)))
    )?.[0];
  },
  getUserByEmail: async (email: string) => {
    return (await db.select().from(users).where(eq(users.email, email)))?.[0];
  },
};

export default UserManager;
