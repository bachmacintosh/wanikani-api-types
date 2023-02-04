import type { WKApiRevision, WKAssignmentParameters, WKAssignmentPayload } from "../v20170710.js";
import { stringifyParameters } from "../v20170710.js";

export class WKRoute {
	#baseUrl = "https://api.wanikani.com/v2";

	#body: string;

	#headers: WKRouteHeaders;

	#method: "GET" | "POST" | "PUT";

	#url: string;

	public constructor(init: WKRouteInit) {
		this.#body = JSON.stringify({});
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

	public get body(): string {
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

	public assignments(
		idOrParams?: WKAssignmentParameters | number,
		action?: "get" | "start",
		payload?: WKAssignmentPayload,
	): this {
		this.#body = JSON.stringify({});
		if (typeof idOrParams === "number") {
			this.#method = "GET";
			this.#url = `${this.#baseUrl}/assignments/${idOrParams}`;
			if (action === "start") {
				this.#method = "PUT";
				this.#url += "/start";
				if (typeof payload !== "undefined") {
					this.#body = JSON.stringify(payload);
				}
			}
		} else {
			this.#method = "GET";
			if (action === "start") {
				throw new TypeError("Action 'start' is not a valid action for Assignment Collections.");
			}
			if (typeof payload !== "undefined") {
				throw new TypeError("Unexpected Assignment Payload when getting an Assignment Collection.");
			}
			if (typeof idOrParams === "undefined") {
				this.#url = `${this.#baseUrl}/assignments`;
			} else {
				this.#url = `${this.#baseUrl}/assignments${stringifyParameters(idOrParams)}`;
			}
		}
		this.#toggleRequestContent();
		return this;
	}

	#toggleRequestContent(): void {
		if (this.#method === "POST" || this.#method === "PUT") {
			this.#headers["Content-Type"] = "application/json";
		} else {
			delete this.#headers["Content-Type"];
			this.#body = JSON.stringify({});
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
