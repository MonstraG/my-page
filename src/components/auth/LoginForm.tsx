import { FormControl } from "@/ui/FormControl/FormControl";
import { MyLink } from "@/ui/MyLink/MyLink";
import type { FC } from "react";
import { PasswordFormControl } from "@/components/auth/PasswordFormControl";
import { MyForm } from "@/components/Form/MyForm";
import { Button } from "@/ui/Button/Button";
import type { MyFormState } from "@/components/Form/MyFormContext";
import nodeCrypto from "node:crypto";
import nodeSqlite from "node:sqlite";

function formDataGetString(formData: FormData, key: string): string | undefined {
	const value = formData.get(key);
	if (!value) {
		return undefined;
	}
	if (typeof value !== "string") {
		return undefined;
	}
	return value;
}

interface Schema {
	username: string;
	password: string;
}

interface User {
	id: string;
	username: string;
	normalizedUsername: string;
	passwordHash: string;
	passwordNonce: string;
}

const db = new nodeSqlite.DatabaseSync("data.sqlite", { enableForeignKeyConstraints: true });

function normalizePassword(password: string): string {
	return password.normalize("NFC").trim();
}

function checkPasswordMatch(user: User, password: string): boolean {
	const normalizedPassword = normalizePassword(password);
	const hashed = hashPassword(password, user.passwordNonce);
	return normalizedPassword === hashed;
}

function hashPassword(password: string, nonce: string): string {
	return nodeCrypto
		.argon2Sync("argon2id", {
			message: password,
			nonce: nonce,
			parallelism: 4,
			tagLength: 64,
			memory: 65_536,
			passes: 3,
		})
		.toString("hex");
}

function normalizeUsername(input: string): string {
	return input.normalize("NFC").trim().toLowerCase();
}

function createUser(username: string, password: string): User {
	const nonce = nodeCrypto.randomBytes(16).toString("hex");
	return {
		id: crypto.randomUUID(),
		username,
		normalizedUsername: normalizeUsername(username),
		passwordHash: hashPassword(password, nonce),
		passwordNonce: nonce,
	};
}

async function loginAction(
	_state: MyFormState<Schema> | undefined,
	formData: FormData,
): Promise<MyFormState<Schema>> {
	"use server";
	const username = formDataGetString(formData, "username");
	const password = formDataGetString(formData, "password");

	if (!username || !password) {
		return {
			defaultValues: {
				username,
			},
			errors: {
				username: !username ? "Field required" : undefined,
				password: !password ? "Field required" : undefined,
			},
		};
	}

	db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT,
  normalizedUsername TEXT,
  passwordHash TEXT,
  passwordNonce TEXT
) STRICT;`);

	const user = createUser("lol", "kek");

	const stmt = db.prepare(
		`INSERT INTO users (id, username, normalizedUsername, passwordHash, passwordNonce)
VALUES (?, ?, ?, ?, ?)`,
	);
	stmt.run(
		user.id,
		user.username,
		user.normalizedUsername,
		user.passwordHash,
		user.passwordNonce,
	);

	const statement = db.prepare("SELECT * FROM users").all() as User[];

	console.log(statement);

	// const user = db.users.find((u: User) => u.normalizedUsername === normalizedUsername);
	// if (!user || !checkPasswordMatch(user, password)) {
	// 	return {
	// 		defaultValues: {
	// 			username,
	// 		},
	// 		error: "Wrong username or password",
	// 	};
	// }

	return {
		defaultValues: {
			username,
		},
		error: "Not implemented",
		errors: {
			password: "bad!",
		},
	};
}

export const LoginForm: FC = () => (
	<MyForm initialState={undefined} action={loginAction}>
		<FormControl label="Username" type="text" name="username" required />

		<PasswordFormControl label="Password" name="password" required />

		<Button type="submit">Login</Button>

		<MyLink href="/forgot-password">Forgot password?</MyLink>
	</MyForm>
);
