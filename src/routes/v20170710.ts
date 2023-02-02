import type { WKApiRevision } from "../v20170710.js";

export class WKRoute {
	#baseUrl = "https://api.wanikani.com/v2/";

	#body: string | null;

	#headers: Headers;

	#url: string;

	#method: "GET" | "POST" | "PUT";

	public constructor(init: WKRouteInit) {
		this.#body = null;
		this.#headers = new Headers({
			Authorization: `Bearer ${init.apiKey}`,
		});
		this.#method = "GET";
		this.#url = this.#baseUrl;

		if (typeof init.revision !== "undefined") {
			this.#headers.append("Wanikani-Revision", init.revision);
		}
	}

	public get baseUrl(): string {
		return this.#baseUrl;
	}

	public get body(): string | null {
		return this.#body;
	}

	public get method(): string {
		return this.#method;
	}

	public get url(): string {
		return this.#url;
	}
}

export interface WKRouteInit {
	apiKey: string;
	revision?: WKApiRevision;
}
