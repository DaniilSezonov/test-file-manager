import TextInput from "@components/inputs/text";
import { FC, useState } from "react";
import backend from "@backend";
import DefaultButton from "@components/buttons/default";
import { useNavigate } from "react-router-dom";

const SignUpForm: FC = () => {
	const navigate = useNavigate();
  const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { data, error, status } = await backend.auth.signup.post({email: login, password, name});
    if (status === 200 && data) {
      navigate("/signin")
    }
    if (status !== 200 && error) {
			const value = error?.value as Record<string, any>;
			if (typeof value === "string") {
				setErrorMsg(value);
			}
			if (value?.message) {
				setErrorMsg(value.message)
			}
			console.log(error.value);
    }
	}
	return (
		<>
			<div className="flex h-[1.5rem] justify-center text-sm text-red-500 items-center">{errorMsg}</div>
			<form className="w-full h-full flex flex-col p-3 tb:p-5 dk:p-8 gap-6 text-lg tb:text-xl dk:text-3xl" onSubmit={submitForm}>
        <TextInput
					type={"text"}
					placeholder={"name"}
					className={"rounded-md"}
					value={name}
					onChange={(event) => {setName(event.target.value)}}
				/>
				<TextInput
					type={"text"}
					placeholder={"login"}
					className={"rounded-md"}
					value={login}
					onChange={(event) => {setLogin(event.target.value)}}
				/>
				<TextInput
					type={"password"}
					placeholder={"password"}
					className={"rounded-md"}
					value={password}
					onChange={(event) => {setPassword(event.target.value)}}
				/>
				<DefaultButton type="submit" className=" hover:border-">Register</DefaultButton>
				<DefaultButton style="secondary" onClick={() => navigate("/signin")}>Sign In</DefaultButton>
			</form>
		</>
	)
}

export default SignUpForm;