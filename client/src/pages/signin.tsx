import { FC } from "react";
import UnauthorizedLayout from "@components/layouts/unauthorized";
import SignInForm from "@components/forms/signin";

const SigninPage: FC = () => {
  return (
    <UnauthorizedLayout title="Sign In">
      <div className="w-full h-full">
        <SignInForm />
      </div>
    </UnauthorizedLayout>
  );
};

export default SigninPage;
