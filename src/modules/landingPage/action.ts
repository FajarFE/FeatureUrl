"use server";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import * as table from "@/schema";
import { custom } from "zod";
import { revalidatePath } from "next/cache";
type ResponseState = {
	status: string;
	message: string;
	url?: string;
	customUrl?: string;
	publicUrl?: boolean;
};
export async function createGuest(
	prevState: ResponseState,
	formData: FormData
): Promise<ResponseState> {
	let urlIdentifier = generateRandomString();
	const customUrl = formData.get("customUrl") as string | undefined;
	const PublicUrl = formData.get("publicUrl") === "true"; // Convert to boolean
	let urlExist = await db
		.select()
		.from(table.shortlink)
		.where(eq(table.shortlink.shortUrl, urlIdentifier));
	console.log(urlExist);
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
				publicUrl: PublicUrl ? true : false,
			})
			.returning({ id: table.shortlink.id });
		if (shortlink.length === 0) {
			response = { status: "error", message: "Could not create shortlink" };
		} else {
			response = { status: "success", message: "ok", url: urlIdentifier };
		}
	} else {
		const existCustomUrl = await db
			.select()
			.from(table.shortlink)
			.where(eq(table.shortlink.shortUrl, customUrl));
		if (existCustomUrl.length > 0) {
			response = { status: "error", message: "Custom URL already exists" };
		} else {
			const shortlink = await db
				.insert(table.shortlink)
				.values({
					shortUrl: customUrl,
					longUrl: formData.get("url") as string,
					publicUrl: PublicUrl ? true : false,
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
	}
	revalidatePath("/");
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
