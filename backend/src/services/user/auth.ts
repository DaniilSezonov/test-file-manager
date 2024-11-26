import UserManager from "@database/managers/user.manager";
import { Statuses, ServiceMethodResult } from "@services/index";

const AuthService = {
  signUp: async (
    email: string,
    password: string,
    name: string,
  ): Promise<
    ServiceMethodResult<{
      id: number;
      email: string;
    }>
  > => {
    if (await UserManager.isEmailExists(email)) {
      return {
        status: Statuses.BAD_REQUEST,
        msg: "Already registered.",
      };
    }
    const hashedPass = await Bun.password.hash(password);
    const instance = await UserManager.createUser(email, hashedPass, name);
    return {
      status: Statuses.OK,
      result: instance,
    };
  },
  signIn: async (
    email: string,
    password: string,
  ): Promise<
    ServiceMethodResult<{
      password: string;
      id: number;
      email: string;
      name: string | null;
      createdAt: Date;
    }>
  > => {
    const isEmailExists = await UserManager.isEmailExists(email);
    if (!isEmailExists) {
      return {
        status: Statuses.BAD_REQUEST,
        msg: "Wrong email or password.",
      };
    }
    const user = await UserManager.getUserByEmail(email);
    const isPasswordVerified = await Bun.password.verify(
      password,
      user.password,
    );
    if (!isPasswordVerified) {
      return {
        status: Statuses.BAD_REQUEST,
        msg: "Wrong email or password.",
      };
    }
    return {
      status: Statuses.OK,
      result: user,
    };
  },
};

export default AuthService;
