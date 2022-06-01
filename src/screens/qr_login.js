import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { QrData } from "../utils/qr_class";

export const QrPage = (props) => {
	const s = io("http://192.168.29.88:3001");
	const qr = new QrData();
	qr.init();
	const [nonce, setNonce] = useState(qr.qrData);
	const [loggedIn, setLoggedIn] = useState(false);

	s.on("connect", () => {
		console.log(`Connected ${s.id}`);
	});
	s.on(nonce, (args) => {
		setLoggedIn(true);
	});

	const getUrlFromNonce = (nonce) => {
		return `http://192.168.29.88:3000/login?token=${nonce}`;
	};

	return (
		<div>
			<div
				className={`${
					loggedIn ? "hidden" : ""
				} flex flex-row bg-red-600 px-10 py-6 rounded-lg`}
			>
				<div className="mr-8 text-center m-auto">Scan the QR Code to Login</div>
				<div className="ml-8 flex-col justify-center align-middle">
					<div>
						<img
							src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${getUrlFromNonce(
								nonce
							)}&chld=L`}
							alt=""
						/>
					</div>
					<div className="text-sm font-light mt-6">{nonce}</div>
				</div>
			</div>
			<div
				className={`${
					!loggedIn ? "hidden" : ""
				} flex flex-row bg-red-600 px-10 py-6 rounded-lg`}
			>
				<div className="px-6 text-center m-auto">You are logged in</div>
			</div>
		</div>
	);
};
