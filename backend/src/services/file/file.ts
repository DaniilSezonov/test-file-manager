

import FileModel from "@database/models/file.model";
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
      console.log(file);
      await Bun.write(filePath, file);
      const createdFile = await FileModel.createFile(uuid, file.size)
      return {
        status: Statuses.OK,
        result: createdFile,
      }
  }
}

export default FileService