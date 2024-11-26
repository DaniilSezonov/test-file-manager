import db from "@database/connection";
import { eq, and } from "drizzle-orm";

import {
  catalogs,
  relatedCatalogs,
} from "@database/schema/catalog/catalog.schema";
import { files, relatedFiles } from "@database/schema/file/file.schema";

const CatalogManager = {
  createCatalog: async (
    name: string,
    ownerId: number,
    parentCatalogId?: number,
  ) => {
    return await db.transaction(async (tx) => {
      const catalog = (
        await tx
          .insert(catalogs)
          .values({ name, isRoot: false, owner: ownerId })
          .returning({ id: catalogs.id, name: catalogs.name })
      )?.[0];
      if (parentCatalogId) {
        await tx
          .insert(relatedCatalogs)
          .values({
            catalogId: parentCatalogId,
            itemCatalog: catalog.id,
          })
          .returning({
            id: relatedCatalogs.id,
            catalogId: relatedCatalogs.catalogId,
            itemCatalog: relatedCatalogs.itemCatalog,
          });
        return catalog;
      }
    });
  },
  getCatalogById: async (id: number) => {
    return (await db.select().from(catalogs).where(eq(catalogs.id, id)))?.[0];
  },
  getCatalogItems: async (catalogId: number) => {
    const catalog = (
      await db.select().from(catalogs).where(eq(catalogs.id, catalogId))
    )?.[0];
    const childCatalogs = await db
      .select({
        id: catalogs.id,
        name: catalogs.name,
      })
      .from(relatedCatalogs)
      .where(eq(relatedCatalogs.catalogId, catalog.id))
      .innerJoin(catalogs, eq(catalogs.id, relatedCatalogs.itemCatalog));
    const childFiles = await db
      .select({
        id: files.id,
        name: files.name,
        size: files.size,
        verboseName: files.verboseName,
      })
      .from(relatedFiles)
      .where(eq(relatedFiles.catalogId, catalog.id))
      .innerJoin(files, eq(files.id, relatedFiles.itemFile));
    return { catalogs: childCatalogs, files: childFiles };
  },
  renameCatalog: async (catalogId: number, name: string) => {
    return (
      await db.update(catalogs).set({name: name}).where(eq(catalogs.id, catalogId))
    )
  },
  getRootUserCatalog: async (userId: number) => {
    return (
      await db
        .select()
        .from(catalogs)
        .where(and(eq(catalogs.owner, userId), eq(catalogs.isRoot, true)))
    )?.[0];
  },
};

export default CatalogManager;
