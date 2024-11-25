import { FC, PropsWithChildren } from "react";
import Cookies from "js-cookie";

const AuthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
  const logout = () => {
    Cookies.remove("auth");
    window.location.reload();
  }
  return (
    <div className="bg-gray-900 w-[100vw] h-[100vh]">
      <div className="h-24 flex py-4 bg-gray-800 flex-row-reverse">
        <div className="h-full flex items-center p-4 cursor-pointer text-lg tb:text-xl dk:text-2xl" onClick={() => logout()}>Logout</div>
      </div>
      <div className="py-6 px-4">
        {children}
      </div>
    </div>
  )
}

export default AuthorizedLayout;