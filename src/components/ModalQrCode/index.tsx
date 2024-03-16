import { cn } from "@/lib/utils";
import Details from "../common/wrappers/qrcodeDisplay/details";
import DownloadButton from "../common/wrappers/qrcodeDisplay/downloadButton";
import FileInput from "../common/wrappers/qrcodeDisplay/inputFile";
import ShapesSwitcher from "../common/wrappers/qrcodeDisplay/shapesSwitcher";
import { ColorsTabs } from "../common/wrappers/qrcodeDisplay/tabs/colorsTabs";
import { BsFiletypePng, BsFiletypeSvg } from "react-icons/bs";
import { ColorTypes } from "@/context/colorTypes";
import { QrStyleContext } from "@/context/index";
import QRCodeStyling, {
	CornerDotType,
	CornerSquareType,
	DotType,
	DrawType,
	ErrorCorrectionLevel,
	FileExtension,
	Mode,
	Options,
	TypeNumber,
} from "qr-code-styling";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

type QRCodeProps = {
	className?: string;
};
export const QrCodeOnly = ({ className }: QRCodeProps) => {
	const { state } = useContext(QrStyleContext);

	const toBase64 = (file: File) => {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const [options] = useState<Options>({
		width: 235,
		height: 235,
		type: "svg" as DrawType,
		data: `${state.value}`,
		image: "",
		margin: 10,
		qrOptions: {
			typeNumber: 0 as TypeNumber,
			mode: "Byte" as Mode,
			errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
		},
		imageOptions: {
			hideBackgroundDots: true,
			imageSize: 0.4,
			margin: 5,
			crossOrigin: "anonymous",
		},
		dotsOptions: {
			color: `#FFFFFF` as ColorTypes["colors"],
			type: `rounded` as DotType,
		},
		backgroundOptions: {
			color: `transparent` as ColorTypes["colors"],
		},
	});

	const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			qrCode.append(ref.current);
		}
	}, [qrCode, ref]);

	const onDownloadClickSvg = () => {
		if (!qrCode) return;
		qrCode.download({
			extension: "svg" as FileExtension,
			name: "qr-code",
		});
	};

	useEffect(() => {
		if (!qrCode) return;
		qrCode.update({
			data: `${state.value}`,
		});
	}, [qrCode, state.value]);

	const onDownloadClickPng = () => {
		if (!qrCode) return;
		qrCode.download({
			extension: "png" as FileExtension,
			name: "qr-code",
		});
	};
	return (
		<div className='flex flex-col gap-2 justify-center items-center'>
			<div className={cn(className)} ref={ref} />
			<div className='font-bold'>Download qrCode</div>
			<div className='flex flex-row gap-2'>
				<Button onClick={onDownloadClickPng}>
					{" "}
					<BsFiletypeSvg /> SVG
				</Button>
				<Button onClick={onDownloadClickSvg}>
					{" "}
					<BsFiletypePng /> PNG
				</Button>
			</div>
		</div>
	);
};
