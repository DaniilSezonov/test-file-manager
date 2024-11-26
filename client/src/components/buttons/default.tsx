import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

type ButtonStyle = "primary" | "secondary";
type DefaultButtonProps = {
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  style?: ButtonStyle;
};
const DefaultButton: FC<PropsWithChildren<DefaultButtonProps>> = ({
  onClick,
  children,
  className,
  style = "primary",
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        className,
        "rounded-md p-3 hover:font-semibold hover:shadow-slate-700 hover:shadow-md",
        {
          "bg-gray-200 text-gray-900": style === "primary",
          "bg-gray-500 text-gray-100": style === "secondary",
        },
      )}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
