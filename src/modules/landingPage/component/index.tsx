"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
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
import { createGuest } from "../action";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { shortlink } from "@/schema";
import QrCodeWrapper from "@/components/common/wrappers/qrcodeDisplay";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FaRegCopy, FaShare } from "react-icons/fa";
import { QrStyleProvider } from "@/context";
import { QrCodeOnly } from "@/components/ModalQrCode";
import { ChangeQrCodeModal } from "@/components/ChangeQrCode";
const formSchema = z.object({
	url: z.string().url(),
	publicUrl: z.boolean().default(false),
});
const initialState = {
	status: "",
	message: "",
	url: "",
	publicUrl: false,
	customUrl: "",
};

export interface ListData {
	longUrl: string;
	shortUrl: string;
	hits: number;
}

export interface Data {
	data: ListData[];
}

export const GatauLink = ({ data }: Data) => {
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
	const handlerCopyButtonList = (link: string) => {
		navigator.clipboard.writeText(window.location.hostname + "/" + link);
		toast({
			description: `Link ${window.location.hostname}/${link} copied to clipboard!`,
			className:
				"bg-green-500 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
		});
		console.log("Copied!");
	};
	return (
		<>
			<QrStyleProvider>
				<main className='w-full min-h-screen dark:bg-gray-900 '>
					<header className='flex items-center justify-center'>
						<Link className='flex items-center' href='#'>
							<span className='sr-only'>ShortLink</span>
						</Link>
					</header>
					<section className='w-full max-w-6xl mx-auto  rounded-lg shadow-md dark:bg-gray-800'>
						<Form {...form}>
							<form
								className='flex w-full gap-2 h-auto mb-10'
								action={formAction}>
								<div className='flex flex-col w-full gap-2'>
									<div className='relative w-full flex '>
										<span className='sr-only'>Long URL</span>
										<Input
											className='w-full'
											id='publicUrl'
											name='publicUrl'
											required
											value='true'
											type='hidden'
										/>
										<Input
											className='w-full focus:outline-none shadow-md'
											id='url'
											name='url'
											placeholder='Enter the long URL'
											required
											type='url'
										/>
										<Button
											className=' top-0 right-0 border-2 border-white w-20 absolute'
											type='submit'>
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
								<div className=' h-[41px] rounded-md   shadow-lg '>
									<Button
										onClick={() => {
											setCustomLink(!customLink);
										}}
										type='button'
										className='w-full bg-white text-black top-0 right-0 hover:bg-neutral-400 '>
										Custom Link
									</Button>
								</div>
							</form>
						</Form>
					</section>
					<section className='w-full max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800'>
						<Table className='bg-gray-100 rounded-lg shadow-lg'>
							<TableHeader>
								<TableRow>
									<TableHead className=' py-6 text-center text-black font-bold'>
										Original Url{" "}
									</TableHead>
									<TableHead className='py-6 text-black  text-center font-bold'>
										Short Link
									</TableHead>
									<TableHead className='py-6 text-black  text-center	 font-bold'>
										Clicks
									</TableHead>
									<TableHead className='py-6 text-black  text-center	 font-bold'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.map((link, index) => (
									<TableRow key={index}>
										<TableCell className='font-medium'>
											<div className='flex  justify-between items-center'>
												<Link
													href={link.longUrl}
													rel='noopener noreferrer'
													target='_blank'
													className='w-8 h-8 bg-white rounded-md flex justify-center items-center shadow-md'>
													<FaShare color='black ' size={15} />
												</Link>
											</div>
										</TableCell>
										<TableCell>
											<div className='flex px-5 justify-between items-center w-full  gap-2'>
												<div>
													{window.location.hostname + "/" + link.shortUrl}
												</div>
												<div className='flex justify-center items-center gap-5'>
													<Link
														href={link.shortUrl}
														rel='noopener noreferrer'
														target='_blank'
														className='w-8 h-8 bg-white 
												rounded-md flex justify-center items-center shadow-md'>
														<FaShare color='black ' size={15} />
													</Link>
													<Button
														size='sm'
														variant='outline'
														onClick={() =>
															handlerCopyButtonList(link.shortUrl)
														}>
														<FaRegCopy />
													</Button>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className='flex justify-between items-center w-full '>
												<div>{link.hits}</div>
											</div>
										</TableCell>
										<TableCell>
											<div className='flex justify-between items-center w-full '>
												<ChangeQrCodeModal
													value={
														window.location.hostname + "/" + link.shortUrl
													}>
													<QrCodeOnly className='bg-[#A0153E]' />
												</ChangeQrCodeModal>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</section>
					{state?.url && (
						<section className='w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800'>
							<h2 className='text-xl font-bold text-center text-gray-800 dark:text-white'>
								Your Short Link
							</h2>
							<div className='mt-4 flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
								<span className='font-mono text-sm text-gray-800 dark:text-gray-200'>
									{window.location.hostname + "/" + state.url}
								</span>
								<Button size='sm' variant='outline' onClick={handlerCopyButton}>
									Copy
								</Button>
							</div>
						</section>
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
				</main>
			</QrStyleProvider>
		</>
	);
};
