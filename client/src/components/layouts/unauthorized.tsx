import { FC, PropsWithChildren } from "react";

type UnauthorizedLayoutProps = {
  title?: string;
};
const UnauthorizedLayout: FC<PropsWithChildren<UnauthorizedLayoutProps>> = ({
  children,
  title,
}) => {
  return (
    <div className="bg-gray-900 w-[100vw] h-[100vh] flex justify-center items-center flex-col">
      <div className="p-1">{title}</div>
      <div className="basis-2/6 min-w-[50%] border-[2px] rounded border-solid border-gray-100">
        {children}
      </div>
    </div>
  );
};

export default UnauthorizedLayout;
