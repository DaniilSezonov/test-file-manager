import classNames from "classnames";
import { FC } from "react";

type TextInputType = "text" | "password";

type TextInputProps = {
  type?: TextInputType;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({ type = "text", className, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className={classNames("p-2 text-gray-500 ", className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default TextInput;