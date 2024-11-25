import db from "@database/connection";
import { eq, and } from "drizzle-orm";

import { catalogs, containerItemCatalog, containerItemFile } from "@database/schema/catalog/catalog.schema";

const CatalogManager = {
    createCatalog: async (name: string, ownerId: number, parentCatalogId?: number) => {
      return await db.transaction(async (tx) => {
        const catalog = (
          await tx
            .insert(catalogs)
            .values({ name, isRoot: false, owner: ownerId })
            .returning({ id: catalogs.id, name: catalogs.name })
        )?.[0]
        if (parentCatalogId) {
          await tx
            .insert(containerItemCatalog)
            .values({
              catalogId: parentCatalogId,
              itemCatalog: catalog.id,
            })
            .returning({ 
              id: containerItemCatalog.id,
              catalogId: containerItemCatalog.catalogId,
              itemCatalog: containerItemCatalog.itemCatalog
            })
          return catalog;
        }
      })
    },
    getCatalogById: async (id: number) => {
      return (await db
        .select().from(catalogs).where(eq(catalogs.id, id)))?.[0];
    },
    getCatalogItems: async (catalogId: number) => {
      const catalog = (await db.select().from(catalogs).where(eq(catalogs.id, catalogId)))?.[0];
      const childCatalogs = await db.select().from(containerItemCatalog).where(eq(containerItemCatalog.catalogId, catalog.id)).leftJoin(catalogs, eq(catalogs.id, containerItemCatalog.itemCatalog))
      // const test = await childCatalogs.leftJoin(catalogs, eq(catalogs.id, catalog.id))
      return childCatalogs;
    },
    getRootUserCatalog: async (userId: number) => {
      return (
        await db.select().from(catalogs).where(and(eq(catalogs.owner, userId), eq(catalogs.isRoot, true))))?.[0];
    }
  }
  
  export default CatalogManager;