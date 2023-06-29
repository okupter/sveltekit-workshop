declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authUser?: {
				id: string;
				iat: number;
				exp: number;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
