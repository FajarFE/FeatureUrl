import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	})
);

export const shortlink = pgTable("shortlink", {
	id: uuid("id").defaultRandom().primaryKey(),
	shortUrl: text("url").notNull(),
	longUrl: text("longUrl").notNull(),
	expires: timestamp("expires", { mode: "date" }),
	accessUrl: text("accessUrl"),
	hits: integer("hits").notNull().default(0),
	userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
	deletedAt: timestamp("deletedAt", { mode: "date" }),
});

export const analytics = pgTable("analytics", {
	id: uuid("id").defaultRandom().primaryKey(),
	shortlinkId: uuid("shortlinkId").references(() => shortlink.id, {
		onDelete: "cascade",
	}),
	ipAddress: text("ip").notNull(),
	visitedAt: timestamp("visitedAt", { mode: "date" }).defaultNow(),
});