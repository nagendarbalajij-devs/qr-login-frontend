import { nanoid } from "nanoid";

export class QrData {
	init() {
		this.data = nanoid();
	}

	get qrData() {
		return this.data;
	}
}
