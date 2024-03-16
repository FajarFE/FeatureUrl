"use server";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import * as table from "@/schema";
import { custom } from "zod";
type ResponseState = {
	status: string;
	message: string;
	url?: string;
	customUrl?: string;
};
export async function createGuest(
	prevState: ResponseState,
	formData: FormData
): Promise<ResponseState> {
	let urlIdentifier = generateRandomString();
	const customUrl = formData.get("customUrl") as string | undefined;

	let urlExist = await db
		.select()
		.from(table.shortlink)
		.where(eq(table.shortlink.shortUrl, urlIdentifier));
	while (urlExist.length > 0) {
		urlIdentifier = generateRandomString();
		urlExist = await db
			.select()
			.from(table.shortlink)
			.where(eq(table.shortlink.shortUrl, urlIdentifier));
	}
	let response;
	if (customUrl === undefined || customUrl === null) {
		const shortlink = await db
			.insert(table.shortlink)
			.values({
				shortUrl: urlIdentifier,
				longUrl: formData.get("url") as string,
			})
			.returning({ id: table.shortlink.id });
		if (shortlink.length === 0) {
			response = { status: "error", message: "Could not create shortlink" };
		} else {
			response = { status: "success", message: "ok", url: urlIdentifier };
		}
	} else {
		const shortlink = await db
			.insert(table.shortlink)
			.values({
				shortUrl: customUrl,
				longUrl: formData.get("url") as string,
			})
			.returning({ id: table.shortlink.id });
		if (shortlink.length === 0) {
			response = { status: "error", message: "Could not create shortlink" };
		} else {
			response = {
				status: "success",
				message: "ok",
				customUrl: customUrl,
			};
		}
	}

	return response;
}
function generateRandomString(): string {
	const characters =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
	const minLength = 4;
	const maxLength = 6;
	const length =
		Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
	let randomString = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomString += characters[randomIndex];
	}

	return randomString;
}
