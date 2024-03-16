"use client";
import { ListUrl } from "@/components/ListURL";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { FaRegCopy, FaShare } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGuest } from "./action";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/auth";
import { BaseLayout } from "@/components/BaseLayout";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { hostname } from "os";
import { PaginationComp } from "@/components/Pagination";

const formSchema = z.object({
	url: z.string().url(),
	customUrl: z.string().url(),
});
const initialState = {
	status: "",
	message: "",
	url: "",
	customUrl: "",
};

interface ListData {
	longUrl: string;
	shortUrl: string;
	hits: number;
	count: number;
}

interface Data {
	data: ListData[];
	limit: number;
	total: number;
	page: number;
	onclick?: (page: number) => void;
	nextParams?: string;
	prevParams?: string;
	pageNumber: string;
	safePageNumber: number;
	numberOfPages: number;
}

export const AdminModule: React.FC<Data> = ({
	data,
	limit,
	total,
	page,
	nextParams,
	prevParams,
	pageNumber,
	safePageNumber,
	numberOfPages,
}) => {
	const { toast } = useToast();
	const [customLink, setCustomLink] = useState(false);
	const handlerCopyButton = () => {
		navigator.clipboard.writeText(window.location.hostname + "/" + state.url);
		toast({
			description: "Link copied to clipboard!",
			className:
				"bg-green-500 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
		});
		console.log("Copied!");
	};
	const handlerCopyButtonCustomUrl = () => {
		navigator.clipboard.writeText(
			window.location.hostname + "/" + state.customUrl
		);
		toast({
			description: "Link copied to clipboard!",
			className:
				"bg-green-500 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
		});
		console.log("Copied!");
	};
	const handlerCopyButtonList = (link: string) => {
		navigator.clipboard.writeText(window.location.hostname + "/" + link);
		toast({
			description: `Link ${window.location.hostname}/${link} copied to clipboard!`,
			className:
				"bg-green-500 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
		});
		console.log("Copied!");
	};
	const [state, formAction] = useFormState(createGuest, initialState);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	useEffect(() => {
		if (state.status === "error") {
			toast({
				description: state.message,
				className:
					"bg-red-500 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
			});
		} else if (state.status === "success") {
			toast({
				description: "Shortlink created successfully!",
				className:
					"bg-green-500 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
			});
		}
		console.log(state);
	}, [state]);

	return (
		<BaseLayout>
			<Form {...form}>
				<form className='flex w-full gap-5 h-auto mb-10' action={formAction}>
					<div className='flex flex-col w-full gap-5'>
						<div className='relative w-full flex '>
							<span className='sr-only'>Long URL</span>
							<Input
								className='w-full focus:outline-none shadow-md'
								id='url'
								name='url'
								placeholder='Enter the long URL'
								required
								type='url'
							/>
							<Button className=' top-0 right-0 w-20 absolute' type='submit'>
								Shorten
							</Button>
						</div>
						{customLink && (
							<div className='relative w-full flex'>
								<span className='sr-only'>Custom URL</span>
								<Input
									className='w-full focus:outline-none shadow-md'
									id='customUrl'
									name='customUrl'
									placeholder='Enter Custom Link'
									required
									type='customUrl'
								/>
							</div>
						)}
					</div>
					<div className='w-[20%] h-[41px] rounded-md  shadow-lg '>
						<Button
							onClick={() => {
								setCustomLink(!customLink);
							}}
							type='button'
							className='w-full  top-0 right-0 '>
							Custom Link
						</Button>
					</div>
				</form>
			</Form>
			<div className='flex flex-col gap-10'>
				<Table className='bg-gray-100 rounded-lg shadow-lg'>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[800px] py-6  text-black font-bold'>
								Original Url{" "}
							</TableHead>
							<TableHead className='py-6 text-black font-bold'>
								Short Link
							</TableHead>
							<TableHead className='py-6 text-black font-bold'>
								Clicks
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((link, index) => (
							<TableRow key={index}>
								<TableCell className='font-medium'>
									<div className='flex justify-between items-center w-full '>
										<div>{link.longUrl}</div>
										<Link
											href={link.longUrl}
											className='w-8 h-8 bg-white rounded-md flex justify-center items-center shadow-md'>
											<FaShare color='black ' size={15} />
										</Link>
									</div>
								</TableCell>
								<TableCell>
									<div className='flex justify-between items-center w-full '>
										<div>{link.shortUrl}</div>
										<div className='flex justify-center items-center gap-5'>
											<Link
												href={link.shortUrl}
												className='w-8 h-8 bg-white rounded-md flex justify-center items-center shadow-md'>
												<FaShare color='black ' size={15} />
											</Link>
											<Button
												size='sm'
												variant='outline'
												onClick={() => handlerCopyButtonList(link.shortUrl)}>
												<FaRegCopy />
											</Button>
										</div>
									</div>
								</TableCell>
								<TableCell>{link.hits}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{/* {data.length > 0 && (
					<>
						<PaginationComp
							limit={limit}
							total={total}
							page={page}
							pageNumber={pageNumber}
							safePageNumber={safePageNumber}
							numberOfPages={numberOfPages}
						/>
					</>
				)} */}
			</div>
			{state.url && (
				<>
					<div className='mt-4 flex items-center flex-col justify-start bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
						<h2 className='text-xl font-bold text-center text-gray-800 dark:text-white'>
							Your Short Link
						</h2>
						<div className='flex justify-between items-center w-full mt-4 rounded-md border-gray-400 border-2 p-2'>
							<span className='font-mono text-sm text-gray-800 dark:text-gray-200'>
								{window.location.hostname + "/" + state.url}
							</span>
							<Button size='sm' variant='outline' onClick={handlerCopyButton}>
								Copy
							</Button>
						</div>
					</div>
				</>
			)}
			{state.customUrl && (
				<>
					<div className='mt-4 flex items-center flex-col justify-start bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
						<h2 className='text-xl font-bold text-center text-gray-800 dark:text-white'>
							Your Short Link
						</h2>
						<div className='flex justify-between items-center w-full mt-4 rounded-md border-gray-400 border-2 p-2'>
							<span className='font-mono text-sm text-gray-800 dark:text-gray-200'>
								{window.location.hostname + "/" + state.customUrl}
							</span>
							<Button
								size='sm'
								variant='outline'
								onClick={handlerCopyButtonCustomUrl}>
								Copy
							</Button>
						</div>
					</div>
				</>
			)}
		</BaseLayout>
	);
};
