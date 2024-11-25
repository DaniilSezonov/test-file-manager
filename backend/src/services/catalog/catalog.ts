import CatalogManager from "@database/managers/catalog.manager";
import { Statuses, ServiceMethodResult } from "@services/index";

const CatalogService = {
  createCatalog: async (name: string, ownerId: number, parentCatalogId: number) => {
    const catalog = await CatalogManager.createCatalog(name, ownerId, parentCatalogId);
    return {
      status: Statuses.OK,
      result: catalog,
    }
  },
  getRootUserCatalog: async (userId: string):
    Promise<ServiceMethodResult<{
      id: number;
      name: string;
      createdAt: Date;
      owner: number;
      isRoot: boolean | null;
    }>> => {
      const currentUserRootCatalog = await CatalogManager.getRootUserCatalog(parseFloat(userId))
      return {
        status: Statuses.OK,
        result: currentUserRootCatalog,
      }
  }
}

export default CatalogService