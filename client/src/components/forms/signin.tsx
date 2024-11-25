import TextInput from "@components/inputs/text";
import { FC, useState } from "react";
import backend from "@backend";
import DefaultButton from "@components/buttons/default";
import { useNavigate } from "react-router-dom";
import { getError } from "../../util";
import Cookie from "js-cookie";

const SignInForm: FC = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { data, error } = await backend.users.signin.post({email: login, password});
		if (error) {
			const msg = getError(error);
			if (msg) setErrorMsg(msg);
		}
		if (data) {
			const { token } = data;
			Cookie.set("auth", token);
			window.location.reload();
		}
	}
	return (
		<>
			<div className="flex h-[1.5rem] justify-center text-sm text-red-500 items-center">{errorMsg}</div>
			<form className="w-full h-full flex flex-col p-3 tb:p-5 dk:p-8 gap-6 text-lg tb:text-xl dk:text-3xl" onSubmit={submitForm}>
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
				<DefaultButton type="submit" className=" hover:border-">Login</DefaultButton>
				<DefaultButton style="secondary" onClick={() => navigate("/signup")}>Register</DefaultButton>
			</form>
		</>
	)
}

export default SignInForm;