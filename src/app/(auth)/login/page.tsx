import type { Metadata, NextPage } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
	title: "Login",
	description: "This page exists only to test various ui elements in local development",
};

const LoginPage: NextPage = () => {
	return (
		<main>
			<h1>Login</h1>
			<LoginForm />
		</main>
	);
};

export default LoginPage;
