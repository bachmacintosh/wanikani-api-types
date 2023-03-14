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
	WKUserPreferencesPayload,
	WKVoiceActorParameters,
} from "../v20170710.js";
import { stringifyParameters, validateParameters, validatePayload } from "../v20170710.js";

const baseUrl = "https://api.wanikani.com/v2";

export interface WKRequest {
	baseUrl: string;
	body: string | null;
	headers: WKRequestHeaders;
	method: "GET" | "POST" | "PUT";
	url: string;
}

export class WKRequestFactory {
	#assignments: WKAssignmentRequests = {
		get: (idOrParams?: WKAssignmentParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/assignments`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Assignment", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
		start: (id: number, payload: WKAssignmentPayload): WKRequest => {
			validatePayload("PUT /assignments/<id>/start", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "PUT",
				url: `${baseUrl}/assignments/${id}/start`,
			};
			return request;
		},
	};

	#getHeaders: WKRequestHeaders;

	#levelProgressions: WKLevelProgressionRequests = {
		get: (idOrParams?: WKLevelProgressionParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/level_progressions`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Level Progression", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	#postPutHeaders: WKRequestHeaders;

	#resets: WKResetRequests = {
		get: (idOrParams?: WKResetParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/resets`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Reset", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	#reviews: WKReviewRequests = {
		get: (idOrParams?: WKReviewParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/reviews`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Review", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
		create: (payload: WKReviewPayload): WKRequest => {
			validatePayload("POST /reviews", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "POST",
				url: `${baseUrl}/reviews`,
			};
			return request;
		},
	};

	#reviewStatistics: WKReviewStatisticRequests = {
		get: (idOrParams?: WKReviewStatisticParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/review_statistics`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Review Statistic", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	#spacedRepetitionSystems: WKSpacedRepetitionSystemRequests = {
		get: (idOrParams?: WKSpacedRepetitionSystemParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/spaced_repetition_systems`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Spaced Repetition System", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	#studyMaterials: WKStudyMaterialRequests = {
		get: (idOrParams?: WKStudyMaterialParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/study_materials`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Study Material", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
		create: (payload: WKStudyMaterialCreatePayload): WKRequest => {
			validatePayload("POST /study_materials", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "POST",
				url: `${baseUrl}/study_materials`,
			};
			return request;
		},
		update: (id: number, payload: WKStudyMaterialUpdatePayload): WKRequest => {
			validatePayload("PUT /study_materials/<id>", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "PUT",
				url: `${baseUrl}/study_materials/${id}`,
			};
			return request;
		},
	};

	#subjects: WKSubjectRequests = {
		get: (idOrParams?: WKSubjectParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/subjects`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Subject", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	#summary: WKSummaryRequests = {
		get: (options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/summary`,
			};
			return request;
		},
	};

	#user: WKUserRequests = {
		get: (options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/user`,
			};
			return request;
		},
		updatePreferences: (payload: WKUserPreferencesPayload): WKRequest => {
			validatePayload("PUT /user", payload);
			const headers = { ...this.#postPutHeaders };
			const request: WKRequest = {
				baseUrl,
				body: JSON.stringify(payload),
				headers,
				method: "PUT",
				url: `${baseUrl}/user`,
			};
			return request;
		},
	};

	#voiceActors: WKVoiceActorRequests = {
		get: (idOrParams?: WKVoiceActorParameters | number, options?: WKRequestGetOptions): WKRequest => {
			const headers = { ...this.#getHeaders };
			if (typeof options !== "undefined") {
				if (options.ifModifiedSince) {
					headers["If-Modified-Since"] = options.ifModifiedSince;
				}
				if (options.ifNoneMatch) {
					headers["If-None-Match"] = options.ifNoneMatch;
				}
			}
			const request: WKRequest = {
				baseUrl,
				body: null,
				headers,
				method: "GET",
				url: `${baseUrl}/voice_actors`,
			};
			if (typeof idOrParams === "number") {
				request.url += `/${idOrParams}`;
			} else if (typeof idOrParams !== "undefined") {
				validateParameters("Voice Actor", idOrParams);
				request.url += stringifyParameters(idOrParams);
			}
			return request;
		},
	};

	public constructor(init: WKRequestFactoryInit) {
		this.#getHeaders = {
			Authorization: `Bearer ${init.apiKey}`,
			"Wanikani-Revision": init.revision ?? "20170710",
		};
		if (typeof init.revision !== "undefined") {
			this.#getHeaders["Wanikani-Revision"] = init.revision;
		}
		this.#postPutHeaders = { ...this.#getHeaders };
		this.#postPutHeaders["Content-Type"] = "application/json";
	}

	public get assignments(): WKAssignmentRequests {
		return this.#assignments;
	}

	public get levelProgressions(): WKLevelProgressionRequests {
		return this.#levelProgressions;
	}

	public get resets(): WKResetRequests {
		return this.#resets;
	}

	public get reviews(): WKReviewRequests {
		return this.#reviews;
	}

	public get reviewStatistics(): WKReviewStatisticRequests {
		return this.#reviewStatistics;
	}

	public get spacedRepetitionSystems(): WKSpacedRepetitionSystemRequests {
		return this.#spacedRepetitionSystems;
	}

	public get srs(): WKSpacedRepetitionSystemRequests {
		return this.#spacedRepetitionSystems;
	}

	public get studyMaterials(): WKStudyMaterialRequests {
		return this.#studyMaterials;
	}

	public get subjects(): WKSubjectRequests {
		return this.#subjects;
	}

	public get summary(): WKSummaryRequests {
		return this.#summary;
	}

	public get user(): WKUserRequests {
		return this.#user;
	}

	public get voiceActors(): WKVoiceActorRequests {
		return this.#voiceActors;
	}
}

export interface WKRequestFactoryInit {
	apiKey: string;
	revision?: WKApiRevision;
	userAgent?: string;
}

export interface WKRequestGetOptions {
	ifModifiedSince: string;
	ifNoneMatch: string;
}

export interface WKRequestHeaders {
	Authorization: `Bearer ${string}`;
	"Wanikani-Revision": WKApiRevision;
	Accept?: "application/json";
	"Content-Type"?: "application/json";
	"If-Modified-Since"?: string;
	"If-None-Match"?: string;
	"User-Agent"?: string;
	[customHeaders: string]: string;
}

export interface WKAssignmentRequests {
	get: (idOrParams?: WKAssignmentParameters | number, options?: WKRequestGetOptions) => WKRequest;
	start: (id: number, payload: WKAssignmentPayload) => WKRequest;
}

export interface WKLevelProgressionRequests {
	get: (idOrParams?: WKLevelProgressionParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKResetRequests {
	get: (idOrParams?: WKResetParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKReviewRequests {
	get: (idOrParams?: WKReviewParameters | number, options?: WKRequestGetOptions) => WKRequest;
	create: (payload: WKReviewPayload) => WKRequest;
}

export interface WKReviewStatisticRequests {
	get: (idOrParams?: WKReviewStatisticParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKSpacedRepetitionSystemRequests {
	get: (idOrParams?: WKSpacedRepetitionSystemParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKStudyMaterialRequests {
	create: (payload: WKStudyMaterialCreatePayload) => WKRequest;
	get: (idOrParams?: WKStudyMaterialParameters | number, options?: WKRequestGetOptions) => WKRequest;
	update: (id: number, payload: WKStudyMaterialUpdatePayload) => WKRequest;
}

export interface WKSubjectRequests {
	get: (idOrParams?: WKSubjectParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

export interface WKSummaryRequests {
	get: (options?: WKRequestGetOptions) => WKRequest;
}

export interface WKUserRequests {
	get: (options?: WKRequestGetOptions) => WKRequest;
	updatePreferences: (payload: WKUserPreferencesPayload) => WKRequest;
}

export interface WKVoiceActorRequests {
	get: (idOrParams?: WKVoiceActorParameters | number, options?: WKRequestGetOptions) => WKRequest;
}
