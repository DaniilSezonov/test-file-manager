import db from "@database/connection";
import { eq } from "drizzle-orm";

import { files } from "@database/schema/file/file.schema";

const FileModel = {
    createFile: async (name: string, size: number) => {
      return (await db
        .insert(files)
        .values({ name, size })
        .returning({ id: files.id, name: files.name, size: files.size })
        .execute())?.[0]
    },
    getFileById: async (id: number) => {
      return (await db
        .select().from(files).where(eq(files.id, id)))?.[0];
    },
  }
  
  export default FileModel;