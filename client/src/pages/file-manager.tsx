import backend from "@backend";
import AuthorizedLayout from "@components/layouts/authorized";
import { FC, useEffect, useMemo, useState } from "react";
import useAsync from "../hooks/async";
import CatalogCard from "@components/cards/catalog";
import FileCard from "@components/cards/file";
import Breadcrumbs from "@components/breadcrumbs";
import DirectoryControlMenu from "@components/menu/directory-control";

const FileManagerPage: FC = () => {
  const [currentPath, setCurrentPath] = useState<
    { id: string; name: string }[]
  >([]);
  const { value: currentUser, execute: fetchCurrentUser } = useAsync(
    async () => {
      return await backend.users.current.get({
        fetch: { credentials: "include" },
      });
    },
  );
  const { value: currentCatalogContent, execute: fetchCurrentCatalogContent } =
    useAsync(async (id: string) => {
      if (!id) return;
      return await backend.catalog
        .id({ id: id })
        .get({ fetch: { credentials: "include" } });
    });
  useEffect(() => {
    void fetchCurrentUser();
  }, []);
  const currentCatalog = useMemo(
    () =>
      currentCatalogContent?.data?.id
        ? {
            id: currentCatalogContent?.data?.id,
            name: currentCatalogContent?.data?.name,
          }
        : {
            id: currentUser?.data?.rootCatalog?.id,
            name: currentUser?.data?.rootCatalog?.name,
          },
    [currentCatalogContent?.data?.id, currentUser],
  );
  console.log(currentCatalog);
  useEffect(() => {
    if (currentUser?.data?.rootCatalog.id) {
      fetchCurrentCatalogContent(currentUser.data?.rootCatalog.id);
      setCurrentPath([{ id: currentUser.data?.rootCatalog?.id, name: "/" }]);
    }
  }, [currentUser]);
  console.log(currentPath);
  const [uploadedFiles, setUploadedFiles] = useState<{
    id: number;
    name: string;
    size: number;
    verboseName: string;
  }[]>([]);
  return (
    <AuthorizedLayout userName={currentUser?.data?.name}>
      <DirectoryControlMenu
        className="py-4 w-full"
        onFileUploaded={(data) => {
          setUploadedFiles((prev) => prev.concat(data));
        }}
        currentCatalogId={currentCatalog.id} 
      />
      <Breadcrumbs
        className="pb-6"
        path={currentPath}
        onBackButtonClick={() => {
          setCurrentPath((value) => {
            if (value.length > 1) {
              value.pop();
            }
            const actualPath = value[value.length - 1];
            fetchCurrentCatalogContent(actualPath.id);
            return value;
          });
        }}
      />
      <div className="grid justify-items-start grid-flow-col justify-start gap-4">
        {currentCatalogContent?.data?.contains?.catalogs.map((item: any) => (
          <CatalogCard
            key={item.id}
            name={item.name}
            id={item.id}
            onOpen={() => {
              setCurrentPath((prev) =>
                prev.concat({ id: item.id, name: item.name }),
              );
              fetchCurrentCatalogContent(item.id);
            }}
          />
        ))}
        {currentCatalogContent?.data?.contains?.files.map((item: any) => (
          <FileCard
            key={item.id}
            id={item.id}
            name={item.name}
            size={item.size}
            extension={item.verboseName.split(".")?.[1] ?? undefined}
          />
        ))}
        {uploadedFiles.map((item) => (
          <FileCard
            key={item.id}
            id={item.id}
            name={item.name}
            size={item.size}
            extension={item.verboseName.split(".")?.[1] ?? undefined}
          />
        ))}
      </div>
    </AuthorizedLayout>
  );
};

export default FileManagerPage;
