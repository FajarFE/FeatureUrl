"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/components/ui/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputAccessUrl } from "./action";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

type ResponseState = {
	accessUrl?: string | null;
	message?: string;
	url?: string;
	Parameter?: string | null;
};

export default function Home() {
	const { link } = useParams();
	return (
		<>
			<form action={InputAccessUrl}>
				<Input type='hidden' name='Parameter' value={link} />
				<Input type='text' name='accessUrl' placeholder='Enter Access Url' />
			</form>
		</>
	);
}
