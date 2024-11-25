import db from "@database/connection";
import { eq, and } from "drizzle-orm";

import { catalogs } from "@database/schema/catalog/catalog.schema";

const CatalogModel = {
    createCatalog: async () => {

    },
    getCatalogById: async (id: number) => {
      return (await db
        .select().from(catalogs).where(eq(catalogs.id, id)))?.[0];
    },
    getRootUserCatalog: async (userId: number) => {
      return (
        await db.select().from(catalogs).where(and(eq(catalogs.owner, userId), eq(catalogs.isRoot, true))))?.[0];
    }
  }
  
  export default CatalogModel;