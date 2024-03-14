import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface dataUrl {
	name: string;
	url: string;
	logo?: string;
}

interface sidebarProps {
	className?: string;
	data: dataUrl[];
}

export const Sidebar: React.FC<sidebarProps> = ({ className, data }) => {
	const pathname = usePathname();
	const [hoverStates, setHoverStates] = React.useState<boolean[]>(
		new Array(data.length).fill(false)
	);

	const handleMouseEnter = (index: number) => {
		const newHoverStates = [...hoverStates];
		newHoverStates[index] = true;
		setHoverStates(newHoverStates);
	};

	const handleMouseLeave = (index: number) => {
		const newHoverStates = [...hoverStates];
		newHoverStates[index] = false;
		setHoverStates(newHoverStates);
	};
	return (
		<div className={cn(className)}>
			{data.map((item, index) => (
				<Link
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={() => handleMouseLeave(index)}
					key={index}
					href={item.url}
					className={cn(
						"relative px-6 py-2 flex justify-center items-start w-full",
						{
							"bg-blue-400 rounded": pathname === item.url,
						}
					)}>
					{item.logo && <Image src={item.logo} alt={item.name} />}

					<motion.span
						initial={{
							color: "white",
						}}
						animate={{
							color: hoverStates[index] && item.name ? "white" : "black",
						}}
						transition={{
							duration: 0.3,
						}}
						className={cn("z-10")}>
						{item.name}
					</motion.span>

					{pathname !== item.url && (
						<motion.span
							initial={{
								width: "4px",
								color: "blue",
							}}
							animate={{
								width: hoverStates[index] && item.name ? "100%" : "4px",
								color: hoverStates[index] && item.name ? "white" : "blue",
							}}
							transition={{
								duration: 0.3,
							}}
							className='absolute top-0 -left-0 h-full -z-5 bg-blue-400 rounded'></motion.span>
					)}
				</Link>
			))}
		</div>
	);
};
