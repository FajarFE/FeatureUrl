"use client";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";

export default function Page() {
	return (
		<div>
			<h1>Sign in</h1>
			<button
				onClick={() =>
					signIn("google", { callbackUrl: "http://localhost:3000/admin" })
				}>
				Sign in with{" "}
			</button>
		</div>
	);
}
