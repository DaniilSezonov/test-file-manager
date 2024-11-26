import backend from "@backend";
import classNames from "classnames";
import { FC, PropsWithChildren, useRef } from "react";

type DirectoryControlMenuProps = {
  className?: string;
  currentCatalogId: string;
  onFileUploaded?: (data: {id: number, name: string, size: number, verboseName: string}) => void;
  onCatalogCreated?: (data: {id: number, name: string}) => void;
};

type MenuItemProps = {
  onClick?: () => void;
}
const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ children, onClick }) => (
  <div
    className="py-2 px-3 bg-slate-950 cursor-pointer hover:scale-105 hover:bg-slate-800"
    onClick={() => onClick?.()}
  >
    {children}
  </div>
);

const DirectoryControlMenu: FC<DirectoryControlMenuProps> = ({ className, currentCatalogId, onFileUploaded, onCatalogCreated }) => {
  const ref = useRef<HTMLInputElement>(null);
  const createCatalog = async () => {
    const catalog = await backend.catalog.index.post({
      name: "New catalog",
      parentCatalogID: parseInt(currentCatalogId),
    },{ fetch: { credentials: "include" }});
    if (catalog.data)
      onCatalogCreated?.(catalog.data);
  }
  return (
    <div className={classNames("flex gap-4", className)}>
      <input
        type="file"
        ref={ref}
        className="hidden" 
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (file) {
            const result = await backend.files.index.post({ file, catalogId: currentCatalogId }, { fetch: { credentials: "include" }})
            onFileUploaded?.(result.data);
          }
        }}
      />
      <MenuItem onClick={() => {
        createCatalog();
      }}>
        Create Catalog
      </MenuItem>
      <MenuItem onClick={() => {
        ref?.current?.click();
      }}>
        Upload File
      </MenuItem>
    </div>
  );
};

export default DirectoryControlMenu;
