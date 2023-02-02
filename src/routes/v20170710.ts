import type {
	WKApiRevision,
	WKAssignmentPayload,
	WKReviewPayload,
	WKStudyMaterialCreatePayload,
	WKStudyMaterialUpdatePayload,
} from "../v20170710.js";

export class WKRoute {
	#baseUrl = "https://api.wanikani.com/v2/";

	#bodyObject?: WKAssignmentPayload | WKReviewPayload | WKStudyMaterialCreatePayload | WKStudyMaterialUpdatePayload;

	#bodyString?: string;

	#headers: WKRouteHeaders;

	#method: "GET" | "POST" | "PUT";

	#url: string;

	public constructor(init: WKRouteInit) {
		this.#bodyString = "";
		const headers: WKRouteHeaders = {
			Authorization: `Bearer ${init.apiKey}`,
		};
		if (typeof init.revision !== "undefined") {
			headers["Wanikani-Revision"] = init.revision;
		}
		this.#headers = headers;
		this.#method = "GET";
		this.#url = this.#baseUrl;
	}

	public get baseUrl(): string {
		return this.#baseUrl;
	}

	public get bodyObject():
		| WKAssignmentPayload
		| WKReviewPayload
		| WKStudyMaterialCreatePayload
		| WKStudyMaterialUpdatePayload
		| undefined {
		return this.#bodyObject;
	}

	public get bodyString(): string | undefined {
		return this.#bodyString;
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
