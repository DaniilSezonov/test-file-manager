

import FileManager from "@database/managers/file.manager";
import { Statuses, ServiceMethodResult } from "@services/index";

const BaseFileStorageDir = "storage/";

const FileService = {
  createUserFile: async (userId: string, file: File, catalogId: number):
    Promise<ServiceMethodResult<{
      id: number;
      name: string;
    }>> => {
      if (!catalogId) {
        return {
          status: Statuses.BAD_REQUEST,
        }
      }
      const uuid = crypto.randomUUID();
      const ext = file.type.split("/")?.[1] ?? "";
      const filePath = `${BaseFileStorageDir}${userId}/${uuid}.${ext}`;
      const fileNameOrigin = file.name;
      console.log(file);
      await Bun.write(filePath, file);
      const createdFile = await FileManager.createFile(uuid, fileNameOrigin, file.size)
      return {
        status: Statuses.OK,
        result: createdFile,
      }
  }
}

export default FileService