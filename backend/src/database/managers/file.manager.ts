import db from "@database/connection";
import { eq } from "drizzle-orm";

import { files } from "@database/schema/file/file.schema";
import { relatedFiles } from "@database/schema/file/file.schema";

const FileManager = {
    createFile: async (name: string, verboseName: string, size: number, catalogId: number) => {
      return await db.transaction(async (tx) => {
        const file = (
          await tx
            .insert(files)
            .values({ name, verboseName, size })
            .returning({
              id: files.id,
              name: files.name,
              verboseName: files.verboseName, 
              size: files.size 
            })
        )?.[0]
        if (catalogId) {
          await tx
            .insert(relatedFiles)
            .values({
              catalogId: catalogId,
              itemFile: file.id,
            })
            .returning({ 
              id: relatedFiles.id,
              itemFile: relatedFiles.itemFile,
            })
          return file;
        }
      })
    },
    getFileById: async (id: number) => {
      return (await db
        .select().from(files).where(eq(files.id, id)))?.[0];
    },
  }
  
  export default FileManager;