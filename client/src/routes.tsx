import {
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import { lazy } from "react";
import Cookie from "js-cookie";

const SignIn = lazy(async () => await import("./pages/signin"));
const SignUp = lazy(async () => await import("./pages/signup"));
const FileManager = lazy(async () => await import("./pages/file-manager"));

const unauthorizedRouter = createBrowserRouter([
  {
    path: "/",
    Component: SignIn,
  },
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  }
]);

const authorizedRouter = createBrowserRouter([
  {
    path: "/",
    Component: FileManager,
  },
  {
    path: "*",
    Component: FileManager,
  }
])

export default Cookie.get("auth") ? authorizedRouter : unauthorizedRouter;