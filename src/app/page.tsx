"use server";
import { LandingPage } from "@/modules/landingPage";
import { db } from "@/lib/drizzle";
import { shortlink } from "@/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
	const Data = await db
		.select({
			longUrl: shortlink.longUrl,
			shortUrl: shortlink.shortUrl,
			hits: shortlink.hits,
			publicUrl: shortlink.publicUrl,
		})
		.from(shortlink)
		.where(eq(shortlink.publicUrl, true));
	return (
		<div>
			<LandingPage data={Data} />
		</div>
	);
}
