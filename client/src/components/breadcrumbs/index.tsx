import classNames from "classnames";
import { FC } from "react";

type BreadcrumbsProps = {
  path: {
    id: string;
    name: string;
  }[];
  onBackButtonClick: () => void;
  className?: string;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  path,
  onBackButtonClick,
  className,
}) => {
  return (
    <div className={classNames("flex gap-2 items-center", className)}>
      <div
        onClick={() => onBackButtonClick()}
        className="text-xl font-semibold cursor-pointer select-none pr-2"
      >
        {"<--"}
      </div>
      {path.map((item) => (
        <span className="text-xl select-none">{item.name}</span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
