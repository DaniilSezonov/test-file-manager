import backend from "@backend";
import AuthorizedLayout from "@components/layouts/authorized"
import { FC, useEffect, useState } from "react"
import useAsync from "../hooks/async";

const FileManagerPage: FC = () => {
  const [currentCatalog, setCurrentCatalog] = useState<string>();
  const {value: currentUser, execute: fetchCurrentUser} = useAsync(async () => {
    return await backend.users.current.get({fetch: {credentials: "include"}});
  });
  const { value: currentCatalogContent, execute: fetchCurrentCatalogContent } = useAsync(async() => {
    return await backend.catalog.index.get();
  })
  useEffect(() => {
    void fetchCurrentUser();
  }, [])
  console.log(currentUser);
  useEffect(() => {
    if (currentUser?.data?.rootCatalog?.id) {
      setCurrentCatalog(currentUser?.data?.rootCatalog?.id);
    }
  }, [currentUser?.data?.rootCatalog?.id])
  useEffect(() => {
    if (currentCatalog) {
      void fetchCurrentCatalogContent()
    }
  }, [currentCatalog]);
  return (
    <AuthorizedLayout userName={currentUser?.data?.name}>TEST</AuthorizedLayout>
  )
}

export default FileManagerPage;