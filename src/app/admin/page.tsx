"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminModule } from "@/module/admin";
import { db } from "@/lib/drizzle";
import {
	ColumnBaseConfig,
	ColumnDataType,
	SelectedFieldsFlat,
	asc,
	desc,
	eq,
	gt,
	gte,
	ilike,
	like,
	lt,
	lte,
	sql,
} from "drizzle-orm";
import { shortlink } from "@/schema";
import Link from "next/link";
import { count } from "drizzle-orm";
import { parse } from "path";
import { useEffect } from "react";
import { PgColumn } from "drizzle-orm/pg-core";

interface SearchParamsProps {
	searchParams: {
		page: string;
		search: string;
	};
}

export default async function Dashboard({ searchParams }: SearchParamsProps) {
	const pageNumber = searchParams.page ?? 1;
	const shortData = searchParams.search ?? null;
	const numberOfItems = 2;
	const offsetItems = (Number(pageNumber) - 1) * numberOfItems;
	const allLinks = await db
		.select()
		.from(shortlink)
		.limit(numberOfItems)
		.offset(offsetItems)
		.where(
			shortData !== null
				? ilike(shortlink.longUrl, `%${shortData}%`)
				: undefined
		)
		.groupBy(
			shortlink.id,
			shortlink.longUrl,
			shortlink.shortUrl,
			shortlink.hits
		);
	console.log(allLinks);
	const prevSearchParams = new URLSearchParams();
	const nextSearchParams = new URLSearchParams();
	const numberOfPages = Math.ceil(allLinks.length / numberOfItems);
	let safePageNumber = 1;
	// if (parseInt(pageNumber) < 1) {
	// 	redirect("/admin");
	// } else if (parseInt(pageNumber) > numberOfPages) {
	// 	redirect("/admin");
	// } else {
	// 	safePageNumber = parseInt(pageNumber);
	// }
	if (parseInt(pageNumber) > 2) {
		prevSearchParams.set("page", `${parseInt(pageNumber) - 1}`);
	} else {
		prevSearchParams.delete("page");
	}

	if (safePageNumber > 0) {
		if (safePageNumber === numberOfPages) {
			nextSearchParams.set("page", `${numberOfPages}`);
		} else {
			nextSearchParams.set("page", `${safePageNumber + 1}`);
		}
	} else {
		nextSearchParams.delete("page");
	}

	console.log(allLinks);
	const authsss = await auth();
	if (!authsss) {
		return redirect("/login");
	}
	console.log(allLinks);
	return (
		<>
			<AdminModule
				data={allLinks as any}
				limit={numberOfItems}
				total={allLinks.length}
				page={safePageNumber}
				pageNumber={pageNumber}
				safePageNumber={safePageNumber}
				numberOfPages={numberOfPages}
			/>
		</>
	);
}
