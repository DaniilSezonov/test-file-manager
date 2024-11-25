import UserModel from "@database/models/user.model";
import { Statuses, ServiceMethodResult } from "@services/index";

const AuthService = {
  signUp: async (email: string, password: string, name: string):
    Promise<ServiceMethodResult<{
      id: number;
      email: string;
    }>> => {
      if (await UserModel.isEmailExists(email)) {
        return {
          status: Statuses.BAD_REQUEST,
          msg: "Already registered.",
        };
      }
      const hashedPass = await Bun.password.hash(password);
      const result = await UserModel.createUser(email, hashedPass, name);
      return {
        status: Statuses.OK,
        result,
      };
  },
  signIn: async (email: string, password: string): Promise<ServiceMethodResult<{
    password: string;
    id: number;
    email: string;
    name: string | null;
    createdAt: Date;
  }>> => {
    const isEmailExists = await UserModel.isEmailExists(email);
    if (!isEmailExists) {
      return {
        status: Statuses.BAD_REQUEST,
        msg: "Wrong email or password."
      }
    }
    const user = await UserModel.getUserByEmail(email);
    const isPasswordVerified = await Bun.password.verify(password, user.password)
    if (!isPasswordVerified) {
      return {
        status: Statuses.BAD_REQUEST,
        msg: "Wrong email or password."
      }
    }
    return {
      status: Statuses.OK,
      result: user,
    }
  }
}

export default AuthService;