import type {
	WKApiRevision,
	WKAssignmentParameters,
	WKAssignmentPayload,
	WKLevelProgressionParameters,
	WKResetParameters,
	WKReviewParameters,
	WKReviewPayload,
	WKReviewStatisticParameters,
	WKSpacedRepetitionSystemParameters,
	WKStudyMaterialCreatePayload,
	WKStudyMaterialParameters,
	WKStudyMaterialUpdatePayload,
	WKSubjectParameters,
} from "../v20170710.js";
import { stringifyParameters } from "../v20170710.js";

export class WKRoute {
	#baseUrl = "https://api.wanikani.com/v2";

	#body: string | null;

	#headers: WKRouteHeaders;

	#method: "GET" | "POST" | "PUT";

	#url: string;

	public constructor(init: WKRouteInit) {
		this.#body = null;
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

	public get body(): string | null {
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

	public assignments(idOrParams?: WKAssignmentParameters | number): this;
	public assignments(idOrParams: number, action: "start", payload?: WKAssignmentPayload): this;
	public assignments(
		idOrParams?: WKAssignmentParameters | number,
		action?: "start",
		payload?: WKAssignmentPayload,
	): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/assignments`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
			if (action === "start") {
				this.#method = "PUT";
				this.#url += "/start";
				this.#body = payload ? JSON.stringify(payload) : JSON.stringify({});
			}
		} else {
			if (action === "start") {
				throw new TypeError("Action 'start' is not a valid action for Assignment Collections.");
			}
			if (typeof payload !== "undefined") {
				throw new TypeError("Unexpected Assignment Payload when getting an Assignment Collection.");
			}
			if (typeof idOrParams !== "undefined") {
				this.#url += stringifyParameters(idOrParams);
			}
		}
		this.#toggleRequestContent();
		return this;
	}

	public levelProgressions(idOrParams?: WKLevelProgressionParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/level_progressions`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public resets(idOrParams?: WKResetParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/resets`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public reviews(idOrParams?: WKReviewParameters | number): this;
	public reviews(idOrParams: "create", payload: WKReviewPayload): this;
	public reviews(idOrParams?: WKReviewParameters | number | "create", payload?: WKReviewPayload): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/reviews`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			if (typeof payload !== "undefined") {
				throw new TypeError("Unexpected Review Payload when getting a Review.");
			}
			this.#url += `/${idOrParams}`;
		} else if (idOrParams === "create") {
			if (typeof payload === "undefined") {
				throw new TypeError("Missing Review Payload when creating a Review.");
			}
			this.#method = "POST";
			this.#body = JSON.stringify(payload);
		} else if (typeof idOrParams !== "undefined") {
			if (typeof payload !== "undefined") {
				throw new TypeError("Unexpected Review Payload when getting a Review Collection.");
			}
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public reviewStatistics(idOrParams?: WKReviewStatisticParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/review_statistics`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public spacedRepetitionSystems(idOrParams?: WKSpacedRepetitionSystemParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/spaced_repetition_systems`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public srs(idOrParams?: WKSpacedRepetitionSystemParameters | number): this {
		return this.spacedRepetitionSystems(idOrParams);
	}

	public studyMaterials(idOrParams?: WKStudyMaterialParameters | number): this;
	public studyMaterials(
		idOrParams: number,
		actionOrCreatePayload: "update",
		payload: WKStudyMaterialUpdatePayload,
	): this;
	public studyMaterials(idOrParams: "create", actionOrCreatePayload: WKStudyMaterialCreatePayload): this;
	public studyMaterials(
		idOrParams?: WKStudyMaterialParameters | number | "create",
		actionOrCreatePayload?: WKStudyMaterialCreatePayload | "update",
		updatePayload?: WKStudyMaterialUpdatePayload,
	): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/study_materials`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
			if (actionOrCreatePayload === "update") {
				if (typeof updatePayload === "undefined") {
					throw new TypeError("Payload required to update Study Materials.");
				}
				this.#method = "PUT";
				this.#body = JSON.stringify(updatePayload);
			} else if (typeof actionOrCreatePayload !== "undefined") {
				throw new TypeError("Unexpected payload when updating a Study Material.");
			}
		} else if (idOrParams === "create") {
			this.#method = "POST";
			if (typeof actionOrCreatePayload === "undefined" || typeof actionOrCreatePayload === "string") {
				throw new TypeError("Payload required to create Study Materials.");
			}
			this.#body = JSON.stringify(actionOrCreatePayload);
		} else if (typeof idOrParams !== "undefined") {
			if (typeof actionOrCreatePayload !== "undefined" || typeof updatePayload !== "undefined") {
				throw new TypeError("Unexpected additional parameters when getting a Study Material Collection.");
			}
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	public subjects(idOrParams?: WKSubjectParameters | number): this {
		this.#method = "GET";
		this.#url = `${this.#baseUrl}/subjects`;
		this.#body = null;
		if (typeof idOrParams === "number") {
			this.#url += `/${idOrParams}`;
		} else if (typeof idOrParams !== "undefined") {
			this.#url += stringifyParameters(idOrParams);
		}
		this.#toggleRequestContent();
		return this;
	}

	#toggleRequestContent(): void {
		if (this.#method === "POST" || this.#method === "PUT") {
			this.#headers["Content-Type"] = "application/json";
		} else {
			delete this.#headers["Content-Type"];
			this.#body = null;
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
