"use server";
import { db } from "@/lib/drizzle";
import { shortlink } from "@/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type ResponseState = {
	accessUrl?: string | null;
	message?: string;
	url?: string;
	Parameter?: string | null;
};

export async function getDatabase() {
	return db;
}

export async function InputAccessUrl(
	formData: FormData
): Promise<ResponseState> {
	const accessUrl = formData.get("accessUrl");
	const Parameter = formData.get("Parameter");
	let response: ResponseState = { message: "error" };
	const database = await getDatabase();
	const dataShortLink = await database
		.select()
		.from(shortlink)
		.where(eq(shortlink.shortUrl, Parameter as string));
	if (dataShortLink[0].accessUrl === accessUrl) {
		return redirect(dataShortLink[0].longUrl);
	}
	return response;
}
