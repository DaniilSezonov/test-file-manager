import classNames from "classnames";
import { FC } from "react";

type DirectoryControlMenuProps = {
  className?: string;
};

const DirectoryControlMenu: FC<DirectoryControlMenuProps> = ({ className }) => {
  return (
    <div className={classNames("flex gap-4", className)}>
      <div className="p-2 bg-slate-950">Create Catalog</div>
      <div className="p-2 bg-slate-950">Upload File</div>
    </div>
  );
};

export default DirectoryControlMenu;
