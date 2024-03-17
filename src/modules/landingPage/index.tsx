"use client";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { BackgroundCellAnimation } from "./component/heroSection/backgroundCell";
import { GatauLink } from "./component";
import { type Data, ListData } from "./component";
import Link from "next/link";
import { NavbarRoot } from "@/components/BaseLayout/navbarRoot/index";
import {
	useScroll,
	useTransform,
	motion,
	useMotionValueEvent,
} from "framer-motion";
import { z } from "zod";
import { cn } from "@/lib/utils";

export const LandingPage = ({ data }: Data) => {
	const dataProduct = [
		{
			name: "Dashboard",
			url: "/admin",
		},
		{
			name: "Profile",
			url: "/profile",
		},
	];
	const [valueMotion, setValueMotion] = useState(0);
	const [indexHover, setIndexHover] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const DataLayout = [
		{
			name: "1",
			url: "/admin",
		},
		{
			name: "2",
			url: "/profile",
		},
		{
			name: "3",
			url: "/admin",
		},
		{
			name: "3",
			url: "/admin",
		},
		{
			name: "3",
			url: "/admin",
		},
	];
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (window && window.innerWidth < 768) {
			setIsMobile(true);
		}
	}, []);

	const scaleX = useTransform(
		scrollYProgress,
		[0, 0.3],
		[1.2, isMobile ? 1 : 1.5]
	);
	const scaleY = useTransform(
		scrollYProgress,
		[0, 0.3],
		[0.6, isMobile ? 1 : 1.5]
	);

	const translate = useTransform(scrollYProgress, [0, 0.3], [0, -600]);
	// const translateProduct = useTransform(scrollYProgress, [0, 5], [0, 400]);
	const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
	const zIndex = useTransform(scrollYProgress, [0, 0.3], [0, 10]);
	const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
	const textOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
	const textTransformDescription = useTransform(
		scrollYProgress,
		[0, 0.3],
		[0, 100]
	);
	const textOpacityDescription = useTransform(
		scrollYProgress,
		[0, 0.3, 0.5],
		[0, 10, 0.4]
	);
	const translateProduct04 = useTransform(scrollYProgress, [0, 1], [0, -360]);
	const translateProduct13 = useTransform(scrollYProgress, [0, 0.8], [0, -180]);
	const translateProduct2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

	const translation = useTransform(scrollYProgress, [0, 5], [0, -400]);

	const getTranslateProduct = (index: number) => {
		if (index === 1 || index === 3) {
			return translateProduct13;
		} else if (index === 0 || index === 4) {
			return translateProduct04;
		} else {
			return translateProduct2;
		}
	};

	const getZIndex = (index: number, isHovered: boolean, indexHover: number) => {
		if (isHovered && index === indexHover) {
			return 50;
		} else {
			if (index === 1 || index === 3) {
				return 10;
			} else if (index === 0 || index === 4) {
				return 5;
			} else {
				return 15;
			}
		}
	};

	const getTransform = (index: number) => {
		if (index === 1 || index === 3) {
			return 20;
		} else if (index === 0 || index === 4) {
			return 10;
		} else {
			return;
		}
	};

	const getTop = (index: number) => {
		if (DataLayout.length > 3) {
			index % 0 === 0 ? 0 : index % 2 ? 200 : index === 2 ? 70 : 990;
		} else {
			index % 0 === 0 ? 0 : index % 2 ? 400 : index === 2 ? 70 : 2990;
		}
	};

	console.log(isHovered, indexHover);
	return (
		<>
			<div ref={ref} className='bg-slate-950 '>
				<div className='container w-full h-auto mx-auto w max-7xl relative'>
					<NavbarRoot className='absolute z-[202]' data={DataLayout} />
					<div className='block w-full h-full'>
						<BackgroundCellAnimation />
					</div>
					<div className='absolute top-20 w-full h-full mb-20'>
						<div className='relative w-full h-screen max-h-[700px] '>
							<div className=' grid grid-cols-12 max-w-7xl h-full  mx-auto '>
								<div className=' col-span-6 w-full h-full justify-center flex-col items-start gap-3 flex pb-20'>
									<span className='z-[200] relative text-lg md:text-lg flex justify-start items-start font-bold text-left p-2 rounded-lg border-4 border-gradient-to-b from-neutral-50 to-neutral-400 border-opacity-50 '>
										<span className='z-[200] text-lg md:text-md flex justify-center items-center font-bold text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'>
											crotlink.ad/linkAnda
										</span>
									</span>

									<h1 className=' z-[200] text-lg md:text-4xl flex justify-center items-center font-bold text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'>
										Sekarang Memperpendek Link Jadi Mudah: Nikmati Shortlink
										Gratis dan Selamanya!
									</h1>
									<p className='z-[200] font-normal text-sm text-neutral-300  text-left'>
										Jadikan berbagi tautan lebih sederhana dan efisien! Dengan
										layanan shortlink kami, nikmati gratis dan tak terbatas.
										Perpendek tautan Anda sekarang dan gunakan selamanya.
										Simplifikasi pengalaman online Anda dengan kami!
									</p>
									<Link
										href='#'
										className=' z-[200] text-lg md:text-md rounded-lg flex px-4 py-2 justify-center items-center font-bold  text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mt-8'>
										<span className='text-lg md:text-lg flex justify-center items-center font-bold text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-800 bg-opacity-50'>
											Perpendek Link Anda
										</span>
									</Link>
								</div>
								<div className='col-span-6 relative'>
									<motion.div
										style={{ translateY: translate }}
										className='absolute z-[200] top-[90px] left-[200px]'>
										<GatauLink data={data} />
									</motion.div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full h-screen bg-gradient-to-b relative overflow-hidden from-slate-950 to-slate-700'>
					<Meteors className='mt-40' number={100} />
					<div
						className='absolute h-[600px] w-screen pointer-events-none -top-24 z-[2]  bg-slate-950 '
						style={{
							maskImage: "linear-gradient(black, transparent)",
						}}></div>
					<div className='gap-4 flex flex-col'>
						<motion.h2
							style={{
								translateY: textTransformDescription,
								opacity: textOpacityDescription,
								zIndex: 10,
							}}
							className=' relative  text-md md:text-lg flex justify-center items-center font-bold text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-100'>
							OWKOADOAODAODAODOD
						</motion.h2>
						<motion.h2
							style={{
								translateY: textTransform,
								opacity: textOpacity,
								zIndex: 10,
							}}
							className=' relative  text-lg md:text-4xl flex justify-center items-center font-bold text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-100'>
							OWKOADOAODAODAODOD
						</motion.h2>
					</div>{" "}
					<div
						className='absolute h-[600px] w-screen pointer-events-none bottom-0 z-[40]  bg-slate-950 '
						style={{
							maskImage: "linear-gradient(transparent, black 90%)",
						}}></div>
					<div className='flex flex-row h-full justify-center items-center gap-3  relative '>
						{DataLayout.map((item, index: number) => {
							return (
								<div
									onMouseEnter={() => {
										setIndexHover(index);
										setIsHovered(true);
									}}
									onMouseLeave={() => {
										setIndexHover(0);
										setIsHovered(false);
									}}
									style={{ zIndex: getZIndex(index, isHovered, indexHover) }}
									className='h-[500px] relative [perspective:800px] bottom-[40px] w-[500px]'
									key={index}>
									<motion.div
										style={{
											translateY: getTranslateProduct(index),
											transformStyle: "preserve-3d",
											transformOrigin: "top",
											rotateX: rotate,
											top: `${
												index % 0 === 0
													? 0
													: index % 2
													? 120
													: index === 2
													? 0
													: 200
											}px`,
											left: `${
												index === 1
													? 70
													: index === 0
													? 140
													: index === 4
													? -140
													: index === 3
													? -70
													: 0
											}px`,
										}}
										className='absolute bg-white rounded-2xl shadow-lg w-full h-full '>
										{index}
										{item.name}
									</motion.div>
								</div>
							);
						})}
					</div>
				</div>
				<div className='h-screen w-full bg-gradient-to-b from-slate-950 from-25%  to-slate-700  '>
					awodkoawd
				</div>
			</div>
		</>
	);
};

export const Meteors = ({
	number,
	className,
}: {
	number?: number;
	className?: string;
}) => {
	const meteors = new Array(number || 20).fill(true);
	return (
		<>
			{meteors.map((el, idx) => (
				<span
					key={"meteor" + idx}
					className={cn(
						"animate-meteor-effect absolute top-1/2 z-[1] left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
						"before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[100px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
						className
					)}
					style={{
						top: 0,
						left: Math.floor(Math.random() * (2000 - -2000) + -2000) + "px",
						animationDelay: Math.random() * (10 - 0.2) + 2 + "s",
						animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
					}}></span>
			))}
		</>
	);
};
