import backend from "@backend";
import AuthorizedLayout from "@components/layouts/authorized"
import { FC, useEffect, useState } from "react"
import useAsync from "../hooks/async";
import CatalogCard from "@components/cards/catalog";
import FileCard from "@components/cards/file";
import Breadcrumbs from "@components/breadcrumbs";

const FileManagerPage: FC = () => {
  const [currentCatalog, setCurrentCatalog] = useState<{id: string, name: string}>();
  const {value: currentUser, execute: fetchCurrentUser} = useAsync(async () => {
    return await backend.users.current.get({fetch: {credentials: "include"}});
  });
  const { value: currentCatalogContent, execute: fetchCurrentCatalogContent } = useAsync(async() => {
    return await backend.catalog.id({id: currentCatalog?.id as string}).get({fetch: {credentials: "include"}});
  });
  useEffect(() => {
    void fetchCurrentUser();
  }, [])
  useEffect(() => {
    if (currentUser?.data?.rootCatalog?.id) {
      const { rootCatalog } = currentUser?.data;
      setCurrentCatalog({id: rootCatalog?.id, name: "/"});
    }
  }, [currentUser?.data?.rootCatalog?.id])
  useEffect(() => {
    if (currentCatalog) {
      void fetchCurrentCatalogContent()
    }
  }, [currentCatalog]);
  const [currentPath, setCurrentPath] = useState<{id: string, name: string}[]>([]);
  useEffect(() => {
    if (currentCatalog) {
      if (currentCatalog?.name !== currentPath?.[currentPath?.length - 1]?.name) {
        setCurrentPath((value) => (value.concat({id: currentCatalog?.id, name: currentCatalog?.name})))
      }
    }
  }, [currentCatalog]);
  return (
    <AuthorizedLayout userName={currentUser?.data?.name}>
      <Breadcrumbs className="pb-6" path={currentPath} onBackButtonClick={() => {
        setCurrentPath((value) => {
          if (value.length > 1) {
            value.pop();
          }
          setCurrentCatalog(value?.[value.length - 1]);
          return value;
        })
      }} />
      <div className="grid justify-items-start grid-flow-col justify-start gap-4">
        {currentCatalogContent?.data?.contains?.catalogs.map((item: any) => 
          <CatalogCard
            key={item.id}
            name={item.name}
            id={item.id}
            onOpen={
              () => {
                setCurrentCatalog({id: item.id, name: item.name});
              }}
            />
        )}
        {currentCatalogContent?.data?.contains?.files.map((item: any) => <FileCard id={item.id} name={item.name} size={item.size} extention={item.verboseName.split('.')?.[1] ?? undefined} />)}
      </div>
    </AuthorizedLayout>
  )
}

export default FileManagerPage;