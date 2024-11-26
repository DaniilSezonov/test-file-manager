import Elysia, { t } from "elysia";
import authPlugin from "../plugins/auth";

import CatalogService from "@services/catalog/catalog";
import UserManager from "@database/managers/user.manager";

export default new Elysia({ name: "user" })
  .use(authPlugin)
  .group("/users", (app) =>
    app.get(
      "/current",
      async ({ userId }) => {
        if (userId) {
          const currentUser = await UserManager.getUserById(userId);
          const { result: rootCatalog } =
            await CatalogService.getRootUserCatalog(userId);
          return {
            id: currentUser.id,
            name: currentUser.name,
            createdAt: currentUser.createdAt,
            email: currentUser.email,
            rootCatalog: {
              id: rootCatalog?.id,
              isRoot: rootCatalog?.isRoot,
              name: rootCatalog?.name,
              createdAt: rootCatalog?.createdAt,
            },
          };
        }
      },
      {
        detail: {
          description: "User info",
          tags: ["UserRoutes"],
        },
      },
    ),
  );
