import { FC, PropsWithChildren } from "react";
import Cookies from "js-cookie";

type AuthorizedLayoutProps = {
  userName: string;
};
const AuthorizedLayout: FC<PropsWithChildren<AuthorizedLayoutProps>> = ({
  children,
  userName,
}) => {
  const logout = () => {
    Cookies.remove("auth");
    window.location.reload();
  };
  return (
    <div className="bg-gray-900 w-[100vw] h-[100vh]">
      <div className="h-24 flex py-4 bg-gray-800">
        <div className="h-full shrink-0 flex items-center select-none p-4 text-lg tb:text-xl dk:text-2xl self-start">
          {userName}
        </div>
        <div className="w-full"></div>
        <div
          className="h-full shrink-0 flex items-center p-4 cursor-pointer text-lg tb:text-xl dk:text-2xl self-end"
          onClick={() => logout()}
        >
          Logout
        </div>
      </div>
      <div className="py-6 px-4">{children}</div>
    </div>
  );
};

export default AuthorizedLayout;
