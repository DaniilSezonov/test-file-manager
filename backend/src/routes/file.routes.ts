import Elysia, { t } from "elysia";
import authPlugin from "../plugins/auth";
import FileService from "@services/file/file";


export default new Elysia({ name: "user" })
  .use(authPlugin)
  .group("/files", (app) =>
    app
      .get("/", async () => [], {
        detail: {
          description: "List file",
          tags: ["FileRoutes"]
        },
      })
      .post("/", async ({ body, userId }) => {
        if (userId) {
          const { file, catalogId } = body;
          const { result } = await FileService.createUserFile(userId, file, catalogId)
          return result;
        }

      }, {
        body: t.Object({
          file: t.File(),
          catalogId: t.Number(),
        }),
        type: "multipart/form-data",
        detail: {
          description: "Upload file",
          tags: ["FileRoutes"],
        }
      }),
      // .delete("/")
  )