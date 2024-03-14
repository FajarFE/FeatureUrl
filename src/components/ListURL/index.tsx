"use server";
import { db } from "@/lib/drizzle";
import { shortlink } from "@/schema";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const ListUrl = async () => {
	const allLinks = await db.select().from(shortlink);
	console.log(allLinks);
	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Original Url</TableHead>
					<TableHead>Short Link</TableHead>
					<TableHead>Clicks</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{allLinks.map((link, index) => (
					<TableRow key={index}>
						<TableCell className='font-medium'>{link.longUrl}</TableCell>
						<TableCell>{link.shortUrl}</TableCell>
						<TableCell>{link.hits}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
