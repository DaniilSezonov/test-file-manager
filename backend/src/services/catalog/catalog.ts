import CatalogModel from "@database/models/catalog.model";
import { Statuses, ServiceMethodResult } from "@services/index";

const CatalogService = {
  getRootUserCatalog: async (id: string):
    Promise<ServiceMethodResult<{
      id: number;
      name: string;
      createdAt: Date;
      owner: number;
      isRoot: boolean | null;
    }>> => {
      const currentUserRootCatalog = await CatalogModel.getRootUserCatalog(parseFloat(id))
      return {
        status: Statuses.OK,
        result: currentUserRootCatalog,
      }
  }
}

export default CatalogService