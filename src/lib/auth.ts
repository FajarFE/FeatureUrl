import { drizzle } from "drizzle-orm/postgres-js";
import NextAuth, { type Session, type User } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/drizzle";

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, user }: { session: Session; user?: User }) {
			return { ...session, ...user };
		},
	},
});
