const formSchema = z.object({
	url: z.string().url(),
});
const initialState = {
	status: "",
	message: "",
	url: "",
};

export default function Home() {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}
