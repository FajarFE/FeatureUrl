"use server";
import { db } from "@/lib/drizzle";
import { eq, lt } from "drizzle-orm";
import { shortlink } from "@/schema";
import { redirect } from "next/dist/server/api-utils";
export { db } from "@/lib/drizzle";

type ResponseState = {
	accessUrl?: string | null;
	message?: string;
	url?: string | null;
};

export async function InputAccessUrl(
	prevState: ResponseState,
	params: { link: string },
	formData: FormData
): Promise<ResponseState> {
	const accessUrl = formData.get("accessUrl") as string;
	const link = params.link;
	let response;
	try {
		const dataShortLink = await db
			.select({
				accessUrl: shortlink.accessUrl,
			})
			.from(shortlink)
			.where(eq(shortlink.shortUrl, link))
			.limit(1);

		if (dataShortLink.length > 0 && link === dataShortLink[0].accessUrl) {
			response = { url: dataShortLink[0].accessUrl, message: "ok" };
		} else {
			response = { url: null, message: "error" };
		}
	} catch (error) {
		console.error("Error fetching shortlink:", error);
		response = { url: null, message: "error" };
	}

	return response as ResponseState;
}
