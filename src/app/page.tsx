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
import { createGuest } from "./action";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/auth";

const formSchema = z.object({
	url: z.string().url(),
});
const initialState = {
	status: "",
	message: "",
	url: "",
};

export default function Home() {
	const { toast } = useToast();

	const handlerCopyButton = () => {
		//get href from state and copy to clipboard
		navigator.clipboard.writeText(window.location.hostname + "/" + state.url);

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

	return (
		<main className='w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6'>
			<span></span>
			<header className='flex items-center justify-center mb-8'>
				<Link className='flex items-center' href='#'>
					<span className='sr-only'>ShortLink</span>
				</Link>
			</header>
			<section className='w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800'>
				<h2 className='text-2xl font-bold text-center text-gray-800 dark:text-white'>
					Shorten Your Link
				</h2>
				<Form {...form}>
					<form action={formAction}>
						<span className='sr-only'>Long URL</span>
						<Input
							className='w-full'
							id='url'
							name='url'
							placeholder='Enter the long URL'
							required
							type='url'
						/>
						<Button className='w-full mt-4' type='submit'>
							Shorten
						</Button>
					</form>
				</Form>
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
		</main>
	);
}
