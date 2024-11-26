import { FC } from "react";
import UnauthorizedLayout from "@components/layouts/unauthorized";
import SignUpForm from "@components/forms/signup";

const SignupPage: FC = () => {
  return (
    <UnauthorizedLayout title="Sign Up">
      <div className="w-full h-full">
        <SignUpForm />
      </div>
    </UnauthorizedLayout>
  );
};

export default SignupPage;
