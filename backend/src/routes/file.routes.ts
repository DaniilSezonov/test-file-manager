import Elysia, { t } from "elysia";
import authPlugin from "../plugins/auth";
import FileService from "@services/file/file";


export default new Elysia({ name: "file" })
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
          const { result } = await FileService.createUserFile(userId, file, parseFloat(catalogId))
          return result;
        }

      }, {
        body: t.Object({
          file: t.File({
            error: "File load error.",
            writeOnly: true,
          }),
          catalogId: t.String({
            error: "Invalid catalog id."
          }),
        }),
        type: "multipart/form-data",
        detail: {
          description: "Upload file",
          tags: ["FileRoutes"],
        }
      }),
      // .delete("/")
  )