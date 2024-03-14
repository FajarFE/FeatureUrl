import { Sidebar, Navbar } from "./general";
import React, { useCallback, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { HelperUseParams as useSearchParamsHelper } from "@/lib/helper/updateParams";
export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	const updateSearchParams = useSearchParamsHelper();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<div className='flex flex-col h-screen'>
			<div className='flex flex-1'>
				<Sidebar
					className='w-64 bg-gray-100 dark:bg-gray-800 flex flex-col gap-5 justify-start items-start py-20 px-12'
					data={[
						{
							name: "Dashboard",
							url: "/admin",
						},
						{
							name: "Profile",
							url: "/profile",
						},
					]}
				/>
				<div className='flex flex-col flex-1'>
					<input
						type='text'
						onChange={(e) => {
							router.push(
								`${pathname}?${updateSearchParams("search", e.target.value)}`
							);
						}}
						placeholder='Search'
					/>
					<Navbar
						className='border-b-2 dark:bg-gray-700 flex justify-end items-center p-2 px-10'
						dataProfile={{
							name: "John Doe",
							avatar: "https://avatars.githubusercontent.com/u/48496630?v=4",
						}}
					/>
					<div className='flex-1 p-10'>{children}</div>
				</div>
			</div>
		</div>
	);
};
