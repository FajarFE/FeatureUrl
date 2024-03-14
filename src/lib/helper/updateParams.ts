import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export const HelperUseParams = () => {
	const searchParams = useSearchParams();
	return useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			if (
				value === undefined ||
				value === null ||
				value === "" ||
				value === "1"
			) {
				params.delete(name);
			}
			return params.toString();
		},
		[searchParams]
	);
};
