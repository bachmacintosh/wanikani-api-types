import type { WKApiRevision, WKAssignmentParameters } from "../v20170710.js";
import { stringifyParameters } from "../v20170710.js";

export class WKRoute {
	#baseUrl = "https://api.wanikani.com/v2";

	#body?: string;

	#headers: WKRouteHeaders;

	#method: "GET" | "POST" | "PUT";

	#url: string;

	public constructor(init: WKRouteInit) {
		this.#headers = {
			Authorization: `Bearer ${init.apiKey}`,
		};
		if (typeof init.revision !== "undefined") {
			this.#headers["Wanikani-Revision"] = init.revision;
		}
		this.#method = "GET";
		this.#url = this.#baseUrl;
	}

	public get baseUrl(): string {
		return this.#baseUrl;
	}

	public get body(): string | undefined {
		return this.#body;
	}

	public get headers(): WKRouteHeaders {
		return this.#headers;
	}

	public get method(): string {
		return this.#method;
	}

	public get url(): string {
		return this.#url;
	}

	public assignments(idOrParams?: WKAssignmentParameters | number, action?: "get" | "start"): this {
		if (typeof idOrParams === "number") {
			this.#method = "GET";
			this.#url = `${this.#baseUrl}/assignments/${idOrParams}`;
			if (action === "start") {
				this.#method = "PUT";
				this.#url += "/start";
			}
		} else {
			this.#method = "GET";
			if (action === "start") {
				throw new TypeError("Action 'start' is not a valid action for Assignment Collections.");
			}
			if (typeof idOrParams === "undefined") {
				this.#url = `${this.#baseUrl}/assignments`;
			} else {
				this.#url = `${this.#baseUrl}/assignments${stringifyParameters(idOrParams)}`;
			}
		}
		this.#toggleContentTypeHeader();
		return this;
	}

	#toggleContentTypeHeader(): void {
		if (this.#method === "POST" || this.#method === "PUT") {
			this.#headers["Content-Type"] = "application/json";
		} else {
			delete this.#headers["Content-Type"];
		}
	}
}

export type WKRouteHeaders = HeadersInit & {
	Authorization: string;
	"Wanikani-Revision"?: WKApiRevision;
	"Content-Type"?: "application/json";
};

export interface WKRouteInit {
	apiKey: string;
	revision?: WKApiRevision;
}
