import Elysia, { t } from "elysia";
import CatalogService from "@services/catalog/catalog";
import authPlugin from "../plugins/auth";
import CatalogManager from "@database/managers/catalog.manager";

export default new Elysia({ name: "catalog" })
  .use(authPlugin)
  .group("/catalog", (app) =>
    app
      .get("/id/:id", async ({ params: { id }}) => {
        const catalog = await CatalogManager.getCatalogById(parseFloat(id));
        const { catalogs, files } = await CatalogManager.getCatalogItems(catalog.id);
        return {
          id: catalog.id,
          isRoot: catalog.isRoot,
          name: catalog.name,
          contains: {
            files: files,
            catalogs: catalogs,
          }
        }
      },
      {
        detail: {
          description: "Detail catalog",
          tags: ["CatalogRoutes"]
        },
      })
      .post("/", async ({ userId, body }) => {
        const { name, parentCatalogID } = body;
        if (userId) {
          const { result: catalog } = await CatalogService.createCatalog(
            name,
            parseInt(userId),
            parentCatalogID
          )
          if (catalog)
            return {
              id: catalog.id,
              name: catalog.name,
            }
        }
      },
      {
        body: t.Object({
          name: t.String({minLength: 1}),
          parentCatalogID: t.Integer(),
        }),
        detail: {
          description: "Create catalog",
          tags: ["CatalogRoutes"]
        }
      }),
      // .delete("/")
  )