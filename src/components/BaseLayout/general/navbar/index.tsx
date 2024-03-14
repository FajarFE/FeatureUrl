import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface dataProfile {
	name: string;
	avatar: string;
}

interface navbarProps {
	className?: string;
	dataProfile: dataProfile;
}

export const Navbar: React.FC<navbarProps> = ({ className, dataProfile }) => {
	return (
		<div className={cn(className)}>
			<div className='w-10 h-10 rounded-full overflow-hidden'>
				<Image
					src={dataProfile.avatar}
					alt={dataProfile.name}
					layout='responsive'
					width={100}
					height={100}
					className='object-cover'
				/>
			</div>
			<span className='navbar__profile-name'>{dataProfile.name}</span>
		</div>
	);
};
