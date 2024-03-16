import { useCallback, useContext, useEffect, useState } from "react";
import { QrStyleContext } from "@/context/index";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FaQrcode } from "react-icons/fa";
import { Button } from "../ui/button";

interface qrcodeProps {
	className?: string;
	children?: React.ReactNode;
	value: string;
}
export const ChangeQrCodeModal = ({
	className,
	children,
	value,
}: qrcodeProps) => {
	const { dispatch } = useContext(QrStyleContext);

	const handleChangeQrCode = (value: string) => {
		dispatch({ type: "SET_QR_VALUE", payload: { value: value } });
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger
					onClick={() => {
						handleChangeQrCode(value);
					}}>
					<FaQrcode />
				</DialogTrigger>
				<DialogContent className='flex flex-col w-auto z-[200]'>
					<div className='p-5 rounded-full flex justify-center items-center'>
						{children}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};
