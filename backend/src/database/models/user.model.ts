import db from "@database/connection";
import { users } from "@database/schema/user/user.schema";
import { eq } from "drizzle-orm";

const UserModel = {
  isEmailExists: async (email: string) => {
    const usersCount = await db.$count(users, eq(users.email, email));
    return usersCount !== 0;
  },
  createUser: async (email: string, password: string, name: string) => {
    return (await db
      .insert(users)
      .values({ email, password, name})
      .returning({ id: users.id, email: users.email })
      .execute())?.[0]
  },
  getUserById: async (id: number) => {
    return (await db
      .select().from(users).where(eq(users.id, id)))?.[0];
  },
  getUserByEmail: async (email: string) => {
    return (await db
      .select().from(users).where(eq(users.email, email)))?.[0];
  }
}

export default UserModel;