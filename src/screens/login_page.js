import { useEffect, useState } from "react";

export const LoginPage = (props) => {
	const [valid, setValidity] = useState(false);
	const [nonce, setNonce] = useState("");

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const nonce = params.get("token");
		if (nonce !== null) {
			setNonce(nonce);
			setValidity(true);
		} else {
			setValidity(false);
		}
	}, []);

	const performLogin = async () => {
		console.log(`Posting Nonce ${nonce}`);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: "test",
				password: "test",
				token: nonce,
			}),
		};
		const response = await fetch("http://192.168.29.88/login", requestOptions);
		console.log(response.status);
	};

	return (
		<div className="App App-header">
			<div
				className={`flex flex-col justify-center align-middle text-lg ${
					valid ? "" : "hidden"
				}`}
			>
				<div>Welcome</div>
				<div className="mt-4">
					<input
						type="text"
						placeholder="Username"
						className="py-2 px-4 rounded-lg text-red-600 outline-none text-sm"
					/>
				</div>
				<div className="mt-2">
					<input
						type="password"
						placeholder="Password"
						className="py-2 px-4 rounded-lg text-red-600 outline-none text-sm"
					/>
				</div>
				<div className="mt-4">
					<button
						className="text-sm py-2 px-6 bg-red-600 rounded-sm"
						onClick={performLogin}
					>
						Login
					</button>
				</div>
			</div>
			<div className={`${valid ? "hidden" : ""} `}>
				<div className="bg-red-600 py-6 px-10 text-lg rounded-lg">
					Something doesn't seem right
				</div>
			</div>
		</div>
	);
};
