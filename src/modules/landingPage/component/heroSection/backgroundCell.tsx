"use client";
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { Spotlight } from "./spotLight";
import { SparklesCore } from "./sparkles";

export const BackgroundCellAnimation = () => {
	return (
		<div className='relative h-screen max-h-[750px] bg-slate-950 flex justify-center overflow-hidden'>
			<BackgroundCellCore />
			<Spotlight className='z-[201]' />
			<SparklesCore
				id='tsparticlesfullpage '
				background='transparent '
				minSize={0.6}
				maxSize={1.4}
				particleDensity={100}
				className='w-full h-full -z-3'
				particleColor='#FFFFFF'
			/>
			<div
				className='absolute h-full w-screen pointer-events-none -bottom-2 z-[60]  bg-slate-950 '
				style={{
					maskImage:
						"linear-gradient(90deg, black , transparent, transparent,black ), linear-gradient(transparent,black 70%)",
				}}></div>
		</div>
	);
};

const BackgroundCellCore = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const ref = useRef<any>(null);

	const handleMouseMove = (event: any) => {
		const rect = ref.current && ref.current.getBoundingClientRect();
		setMousePosition({
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		});
	};

	const size = 600;
	return (
		<div
			ref={ref}
			onMouseMove={handleMouseMove}
			className='h-full absolute inset-0 top-[0px] z-[40] -skew-x-12'>
			<div className='absolute h-[40rem] inset-y-0  overflow-hidden'>
				<div
					className='absolute inset-0 z-20 bg-transparent'
					style={{
						maskImage: `radial-gradient(
            ${size / 2}px circle at center,
           white, transparent
          )`,
						WebkitMaskImage: `radial-gradient(
          ${size / 2}px circle at center,
          white, transparent
        )`,
						WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
							mousePosition.y - size / 2
						}px`,
						WebkitMaskSize: `${size}px`,
						maskSize: `${size}px`,
						pointerEvents: "none",
						maskRepeat: "no-repeat",
						WebkitMaskRepeat: "no-repeat",
					}}>
					<Pattern cellClassName='border-blue-800 relative z-[100]' />
				</div>
				<Pattern className='opacity-[0.4]' cellClassName='border-neutral-400' />
			</div>
		</div>
	);
};

const Pattern = ({
	className,
	cellClassName,
}: {
	className?: string;
	cellClassName?: string;
}) => {
	const x = new Array(47).fill(0);
	const y = new Array(30).fill(0);
	const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
	const [clickedCell, setClickedCell] = useState<any>(null);
	console.log(clickedCell);
	const controls = useAnimation();
	useEffect(() => {
		if (clickedCell) {
			controls.start({
				scale: [1, 2, 1],
				transition: {
					duration: 0.8,
					ease: "backOut",
				},
			});
		}
	}, [clickedCell, controls]);
	return (
		<div className={cn("flex flex-row  relative z-30 gap-2", className)}>
			{matrix.map((row, rowIdx) => (
				<div
					key={`matrix-row-${rowIdx}`}
					className='flex flex-col gap-2 relative z-20 border-b rounded-lg'>
					{row.map((column, colIdx) => {
						return (
							<div
								key={`matrix-col-${colIdx}`}
								className={cn(
									"bg-slate-950  z-20 border-l border-b border-[1.4px]  rounded-lg border-neutral-200",
									cellClassName
								)}
								onClick={() => setClickedCell([rowIdx, colIdx])}>
								<motion.div
									initial={{
										opacity: 0,
									}}
									whileHover={{
										opacity: [0, 1, 0.5],
									}}
									transition={{
										duration: 0.5,
										ease: "backOut",
									}}
									animate={controls}
									className='bg-blue-900 h-[80px] w-[70px]'></motion.div>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};
