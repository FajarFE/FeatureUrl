"use client";
import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
interface PaginationProps {
	page: number;
	total: number;
	limit: number;
	pageNumber: string;
	safePageNumber: number;
	numberOfPages: number;
}
export const PaginationComp: React.FC<PaginationProps> = ({
	page,
	total,
	limit,
	pageNumber,
	safePageNumber,
	numberOfPages,
}) => {
	const pathname = usePathname();
	console.log(pathname);
	const searchParams = useSearchParams();
	const pageParams = searchParams.get("page") || "1";
	const totalPages = Math.ceil(total / limit);
	const router = useRouter();
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	const isFirstPage = page === 1;
	const isLastPage = page === totalPages;
	const handlePage = (number: number) => {
		router.push(`${pathname}?page=${number}`, { scroll: false });
	};
	const nextParamsPage = () => {
		if (parseInt(pageParams) < totalPages) {
			router.push(`${pathname}?page=${parseInt(pageParams) + 1}`, {
				scroll: false,
			});
		}
	};
	const prevParamsPage = () => {
		if (parseInt(pageParams) > 1) {
			router.push(`${pathname}?page=${parseInt(pageParams) - 1}`, {
				scroll: false,
			});
		}
	};
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						isActive={!isFirstPage}
						onClick={() => prevParamsPage()}
						className={`${
							parseInt(pageNumber) < 2 ? " cursor-not-allowed" : ""
						} `}
					/>
				</PaginationItem>
				{pages.map((p) => {
					if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
						return (
							<PaginationItem key={p}>
								<PaginationLink
									onClick={() => {
										handlePage(p);
									}}
									isActive={p === page}>
									{p}
								</PaginationLink>
							</PaginationItem>
						);
					}

					if (p === page - 2 || p === page + 2) {
						return (
							<PaginationEllipsis key={p}>
								<span>...</span>
							</PaginationEllipsis>
						);
					}

					return null;
				})}
				<PaginationItem className=''>
					<PaginationNext
						className={`${
							safePageNumber >= numberOfPages ? " cursor-not-allowed " : ""
						}`}
						isActive={!isLastPage}
						onClick={() => nextParamsPage()}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
