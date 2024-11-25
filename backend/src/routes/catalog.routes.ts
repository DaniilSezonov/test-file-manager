import Elysia, { t } from "elysia";
import CatalogService from "@services/catalog/catalog";
import { Statuses } from "@services/index";
import authPlugin from "../plugins/auth";

export default new Elysia({ name: "catalog" })
  .use(authPlugin)
  .group("/catalog", (app) =>
    app
      .get("/", async ({ cookie, userId }) => {
        if (userId) {
          const rootCatalog = await CatalogService.getRootUserCatalog(userId);
          if (rootCatalog.status === Statuses.OK) {
            return rootCatalog;
          } 
        }
      },
      {
        detail: {
          description: "List catalog",
          tags: ["CatalogRoutes"]
        },
      })
      .post("/", async () => [], {
        detail: {
          description: "Create catalog",
          tags: ["CatalogRoutes"]
        }
      }),
      // .delete("/")
  )