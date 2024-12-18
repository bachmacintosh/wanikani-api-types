import { type ApiRevision, stringifyParameters } from "../base/v20170710.js";
import type { WKAssignmentParameters, WKAssignmentPayload } from "../assignments/v20170710.js";
import type { WKReviewParameters, WKReviewPayload } from "../reviews/v20170710.js";
import type {
  WKStudyMaterialCreatePayload,
  WKStudyMaterialParameters,
  WKStudyMaterialUpdatePayload,
} from "../study-materials/v20170710.js";
import type { WKLevelProgressionParameters } from "../level-progressions/v20170710.js";
import type { WKResetParameters } from "../resets/v20170710.js";
import type { WKReviewStatisticParameters } from "../review-statistics/v20170710.js";
import type { WKSpacedRepetitionSystemParameters } from "../spaced-repetition-systems/v20170710.js";
import type { WKSubjectParameters } from "../subjects/v20170710.js";
import type { WKUserPreferencesPayload } from "../user/v20170710.js";
import type { WKVoiceActorParameters } from "../voice-actors/v20170710.js";

const baseUrl = "https://api.wanikani.com/v2";

/**
 * An object containing all information needed to make a request to the WaniKani API using any HTTP API/Library.
 *
 * @see {@link WKRequestFactory}
 * @category Requests
 */
export interface WKRequest {
  /** The request body, either `null` for GET requests, or a `string` for POST and PUT requests. */
  body: string | null;
  /** The request headers, including both standard and user-set headers. */
  headers: WKRequestHeaders;
  /** The request's HTTP method. */
  method: "GET" | "POST" | "PUT";
  /** The full URL where the request will be sent to. */
  url: string;
}

/**
 * A factory for preparing requests to the WaniKani API, with methods that return a {@link WKRequest} that can be used
 * in any HTTP API/Library to make the request.
 *
 * @category Requests
 */
export class WKRequestFactory {
  /**
   * The headers set on factory initialization, excluding anything in the `customHeaders` property in
   * {@link WKRequestFactoryInit}.
   */
  private readonly _initHeaders: WKRequestHeaders;

  /**
   * The headers that will be added to any GET requests returned by the factory.
   */
  private _getHeaders: WKRequestHeaders;

  /**
   * The headers that will be added to any POST and PUT requests returned by the factory.
   */
  private _postPutHeaders: WKRequestHeaders;

  /**
   * Initialize the Request Factory.
   * @param init Initialization options for the factory.
   */
  public constructor(init: WKRequestFactoryInit) {
    this._initHeaders = {
      Authorization: `Bearer ${init.apiToken}`,
      "Wanikani-Revision": init.revision ?? "20170710",
    };
    this._getHeaders = { ...this._initHeaders };
    this._postPutHeaders = { ...this._initHeaders };
    if (typeof init.customHeaders !== "undefined") {
      for (const [key, value] of Object.entries(init.customHeaders)) {
        WKRequestFactory.validateHeader(key, value);
        this._getHeaders[key] = value;
        this._postPutHeaders[key] = value;
      }
    }
    this._postPutHeaders["Content-Type"] = "application/json";
  }

  /**
   * Returns a collection of requests pertaining to Assignments on the WaniKani API.
   */
  public get assignments(): WKAssignmentRequests {
    return {
      get: (idOrParams?: WKAssignmentParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/assignments`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
      start: (assignmentId: number, payload: WKAssignmentPayload, options?: WKRequestPostPutOptions): WKRequest => {
        // TODO: Validate Payload
        const headers = { ...this._postPutHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: JSON.stringify(payload),
          headers,
          method: "PUT",
          url: `${baseUrl}/assignments/${assignmentId}/start`,
        };
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Level Progressions on the WaniKani API.
   */
  public get levelProgressions(): WKLevelProgressionRequests {
    return {
      get: (idOrParams?: WKLevelProgressionParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/level_progressions`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Resets on the WaniKani API.
   */
  public get resets(): WKResetRequests {
    return {
      get: (idOrParams?: WKResetParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/resets`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Reviews on the WaniKani API.
   */
  public get reviews(): WKReviewRequests {
    return {
      create: (payload: WKReviewPayload, options?: WKRequestPostPutOptions): WKRequest => {
        // TODO: Validate Payload
        const headers = { ...this._postPutHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: JSON.stringify(payload),
          headers,
          method: "POST",
          url: `${baseUrl}/reviews`,
        };
        return request;
      },
      get: (idOrParams?: WKReviewParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/reviews`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Review Statistics on the WaniKani API.
   */
  public get reviewStatistics(): WKReviewStatisticRequests {
    return {
      get: (idOrParams?: WKReviewStatisticParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/review_statistics`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Spaced Repetition Systems (SRS) on the WaniKani API.
   */
  public get spacedRepetitionSystems(): WKSpacedRepetitionSystemRequests {
    return {
      get: (idOrParams?: WKSpacedRepetitionSystemParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/spaced_repetition_systems`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Spaced Repetition Systems (SRS) on the WaniKani API.
   */
  public get srs(): WKSpacedRepetitionSystemRequests {
    return this.spacedRepetitionSystems;
  }

  /**
   * Returns a collection of requests pertaining to Study Materials on the WaniKani API.
   */
  public get studyMaterials(): WKStudyMaterialRequests {
    return {
      get: (idOrParams?: WKStudyMaterialParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/study_materials`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
      create: (payload: WKStudyMaterialCreatePayload, options?: WKRequestPostPutOptions): WKRequest => {
        // TODO: Validate Payload
        const headers = { ...this._postPutHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: JSON.stringify(payload),
          headers,
          method: "POST",
          url: `${baseUrl}/study_materials`,
        };
        return request;
      },
      update: (
        studyMaterialId: number,
        payload: WKStudyMaterialUpdatePayload,
        options?: WKRequestPostPutOptions,
      ): WKRequest => {
        // TODO: Validate Payload
        const headers = { ...this._postPutHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: JSON.stringify(payload),
          headers,
          method: "PUT",
          url: `${baseUrl}/study_materials/${studyMaterialId}`,
        };
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Subjects on the WaniKani API.
   */
  public get subjects(): WKSubjectRequests {
    return {
      get: (idOrParams?: WKSubjectParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/subjects`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Summaries on the WaniKani API.
   */
  public get summary(): WKSummaryRequests {
    return {
      get: (options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/summary`,
        };
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Users on the WaniKani API.
   */
  public get user(): WKUserRequests {
    return {
      get: (options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/user`,
        };
        return request;
      },
      updatePreferences: (payload: WKUserPreferencesPayload, options?: WKRequestPostPutOptions): WKRequest => {
        // TODO: Validate Payload
        const headers = { ...this._postPutHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: JSON.stringify(payload),
          headers,
          method: "PUT",
          url: `${baseUrl}/user`,
        };
        return request;
      },
    };
  }

  /**
   * Returns a collection of requests pertaining to Voice Actors on the WaniKani API.
   */
  public get voiceActors(): WKVoiceActorRequests {
    return {
      get: (idOrParams?: WKVoiceActorParameters | number, options?: WKRequestGetOptions): WKRequest => {
        const headers = { ...this._getHeaders };
        if (typeof options !== "undefined") {
          if (typeof options.ifModifiedSince !== "undefined") {
            headers["If-Modified-Since"] = options.ifModifiedSince;
          }
          if (typeof options.ifNoneMatch !== "undefined") {
            headers["If-None-Match"] = options.ifNoneMatch;
          }
          if (typeof options.customHeaders !== "undefined") {
            for (const [key, value] of Object.entries(options.customHeaders)) {
              WKRequestFactory.validateHeader(key, value);
              headers[key] = value;
            }
          }
        }
        const request: WKRequest = {
          body: null,
          headers,
          method: "GET",
          url: `${baseUrl}/voice_actors`,
        };
        if (typeof idOrParams === "number") {
          request.url += `/${idOrParams}`;
        } else if (typeof idOrParams !== "undefined") {
          // TODO: Validate Parameters
          request.url += stringifyParameters(idOrParams);
        }
        return request;
      },
    };
  }

  /**
   * Validates custom-set headers to make sure type checking isn't circumvented.
   * @param key The header key, e.g. `Accpet` or `X-Forwarded-For`
   * @param value The header value, e.g. `application/json` or `192.168.1.1`
   * @throws A `TypeError` if there is an attempt to improperly set type-checked headers.
   */
  public static validateHeader(key: string, value: string): void {
    if (key === "Authorization") {
      throw new TypeError("WaniKani API Token should be set via setApiToken() method.");
    } else if (key === "Wanikani-Revision") {
      throw new TypeError("WaniKani API Revision should be set via setApiRevision() method.");
    } else if ((key === "Accept" || key === "Content-Type") && value !== "application/json") {
      throw new TypeError(`The "${key}" header must be set to "application/json" .`);
    }
  }

  /**
   * Add additional custom headers to be used in all requests generated by the factory.
   * @param headers An object containing HTTP headers and their values.
   * @returns The factory, with the added custom headers.
   */
  public addCustomHeaders(headers: Record<string, string>): this {
    for (const [key, value] of Object.entries(headers)) {
      WKRequestFactory.validateHeader(key, value);
      this._getHeaders[key] = value;
      this._postPutHeaders[key] = value;
    }
    return this;
  }

  /**
   * Sets a new WaniKani API Revision to use in requests returned by the factory.
   * @param revision The WaniKani API Revision to use.
   * @returns The factory, with the newly set WaniKani API Revision.
   */
  public setApiRevision(revision: ApiRevision): this {
    this._initHeaders["Wanikani-Revision"] = revision;
    this._getHeaders["Wanikani-Revision"] = revision;
    this._postPutHeaders["Wanikani-Revision"] = revision;
    return this;
  }

  /**
   * Sets a new WaniKani API Token to use in requests returned by the factory.
   * @param token The new WaniKani API Token to use.
   * @returns The factory, with the newly set WaniKani API Token.
   */
  public setApiToken(token: string): this {
    this._initHeaders.Authorization = `Bearer ${token}`;
    this._getHeaders.Authorization = `Bearer ${token}`;
    this._postPutHeaders.Authorization = `Bearer ${token}`;
    return this;
  }

  /**
   * Sets the custom headers for all requests gerated by the factory to those passed to this function, removing any
   * previously set custom headers, and keeping API Revision and Token settings.
   * @param headers An object containing HTTP headers and their values.
   * @returns The factory, with the only custom headers being those passed to this function.
   */
  public setCustomHeaders(headers: Record<string, string>): this {
    this._getHeaders = { ...this._initHeaders };
    this._postPutHeaders = { ...this._initHeaders };
    for (const [key, value] of Object.entries(headers)) {
      WKRequestFactory.validateHeader(key, value);
      this._getHeaders[key] = value;
      this._postPutHeaders[key] = value;
    }
    this._postPutHeaders["Content-Type"] = "application/json";
    return this;
  }
}

/**
 * Initialization options for a {@link WKRequestFactory}.
 *
 * @category Requests
 */
export interface WKRequestFactoryInit {
  /** The WaniKani API Token to use in the requests. */
  apiToken: string;
  /** Any additional headers to be added to all requests. */
  customHeaders?: Record<string, string>;
  /**
   * The WaniKani API Revision to use in the requests; if not set, the factory will default to the current API Revision.
   */
  revision?: ApiRevision;
}

/**
 * Options for making GET Requests to the WaniKani API.
 *
 * @category Requests
 */
export interface WKRequestGetOptions {
  /** Custom headers to add to this request only. */
  customHeaders?: Record<string, string>;
  /** Adds an `If-Modified-Since` header to the request. */
  ifModifiedSince?: string;
  /** Adds an `If-None-Match` header to the request. */
  ifNoneMatch?: string;
}

/**
 * Generally expected HTTP headers when making requests to the WaniKani API.
 *
 * @category Requests
 */
export interface WKRequestHeaders {
  /** HTTP Authorization header, using a Bearer Token. */
  Authorization: `Bearer ${string}`;
  /** The WaniKani API Revision. */
  "Wanikani-Revision": ApiRevision;
  [customHeaders: string]: string;
  /** The client should accept JSON as that is how the WaniKani API's response bodies are formatted. */
  Accept?: "application/json";
  /** When making a POST or PUT request, the client should indicate they are sending a JSON request body. */
  "Content-Type"?: "application/json";
  /** An HTTP Date can be sent to check for data changes, and expect an HTTP Status 304 if there are none. */
  "If-Modified-Since"?: string;
  /** An HTTP ETag can be sent to check for data changes, and expect an HTTP Status 304 if there are none. */
  "If-None-Match"?: string;
  /** A User Agent to better identify who is making the request to the WaniKani API. */
  "User-Agent"?: string;
}

/**
 * Options for making POST and PUT Requests to the WaniKani API.
 *
 * @category Requests
 */
export interface WKRequestPostPutOptions {
  /** Custom headers to add to this request only. */
  customHeaders?: Record<string, string>;
}

/**
 * Types of Assignment Requests available in the WaniKani API.
 *
 * @category Assignments
 * @category Requests
 */
export interface WKAssignmentRequests {
  /**
   * Get an Assignment or Assignment Collection from the WaniKani API.
   * @param idOrParams The Assignment ID for individual Assignments, or parameters for Assignment Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Assignment(s) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKAssignmentParameters | number, options?: WKRequestGetOptions) => WKRequest;

  /**
   * Start an Assignment (i.e. move from Lessons to Reviews) via the WaniKani API.
   * @param id The Assignment ID to start.
   * @param payload The payload to send when starting the Assignment.
   * @param options Options for making PUT requests to the API.
   * @returns A Start Assignment Request usable in any HTTP API/Library.
   */
  start: (id: number, payload: WKAssignmentPayload, options?: WKRequestPostPutOptions) => WKRequest;
}

/**
 * Types of Level Progression Requests available in the WaniKani API.
 *
 * @category Level Progressions
 * @category Requests
 */
export interface WKLevelProgressionRequests {
  /**
   * Get a Level Progression or Level Progression Collection from the WaniKani API.
   * @param idOrParams The Level Progression ID for individual Level Progressions, or parameters for Level
   * Progression Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Level Progression(s) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKLevelProgressionParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Reset Requests available in the WaniKani API.
 *
 * @category Requests
 * @category Resets
 */
export interface WKResetRequests {
  /**
   * Get a Reset or Reset Collection from the WaniKani API.
   * @param idOrParams The Reset ID for individual Resets, or parameters for Reset Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Reset(s) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKResetParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Review Requests available in the WaniKani API.
 *
 * @category Requests
 * @category Reviews
 */
export interface WKReviewRequests {
  /**
   * Create a new Review via the WaniKani API.
   * @param payload The payload to send when creating the Review.
   * @param options Options for making POST requests to the API.
   * @returns A Create Review Request usabile in any HTTP API/Library.
   */
  create: (payload: WKReviewPayload, options?: WKRequestPostPutOptions) => WKRequest;
  /**
   * Get a Review or Review Collection from the WaniKani API.
   * @param idOrParams The Review ID for individual Reviews, or parameters for Review Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Review(s) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKReviewParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Review Statistic Requests available in the WaniKani API.
 *
 * @category Requests
 * @category Review Statistics
 */
export interface WKReviewStatisticRequests {
  /**
   * Get a Review Statistic or Review Statistic Collection from the WaniKani API.
   * @param idOrParams The Review Statistic ID for individual Review Statistics, or parameters for Review Statistic
   * Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Review Statistic(s) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKReviewStatisticParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Spaced Repetition System (SRS) Requests available in the WaniKani API.
 *
 * @category Requests
 * @category Spaced Repetition Systems
 */
export interface WKSpacedRepetitionSystemRequests {
  /**
   * Get a Spaced Repetition System (SRS) or Spaced Repetition System (SRS) Collection from the WaniKani API.
   * @param idOrParams The Spaced Repetition System (SRS) ID for individual Spaced Repetition Systems (SRS), or
   * parameters for Spaced Repetition System (SRS) Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Spaced Repetition System(s) (SRS) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKSpacedRepetitionSystemParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Study Material Requests available in the WaniKani API.
 *
 * @category Requests
 * @category Study Materials
 */
export interface WKStudyMaterialRequests {
  /**
   * Create a new Study Material for a given Subject via the WaniKani API.
   * @param payload The payload to send when creating the new Study Material.
   * @param options Options for making POST requests to the API.
   * @returns A Create Study Material Request usabile in any HTTP API/Library.
   */
  create: (payload: WKStudyMaterialCreatePayload, options?: WKRequestPostPutOptions) => WKRequest;
  /**
   * Get a Study Material or Study Material Collection from the WaniKani API.
   * @param idOrParams The Study Material ID for individual Study Materials, or parameters for Study Material
   * Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Study Material(s) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKStudyMaterialParameters | number, options?: WKRequestGetOptions) => WKRequest;

  /**
   * Update a Study Material for a given Subject.
   * @param id The Study Material ID to update.
   * @param payload The payload to send when updating the Study Material.
   * @param options Options for making PUT requests to the API.
   * @returns An Update Study Material Request usabile in any HTTP API/Library.
   */
  update: (id: number, payload: WKStudyMaterialUpdatePayload, options?: WKRequestPostPutOptions) => WKRequest;
}

/**
 * Types of Subject Requests available in the WaniKani API.
 *
 * @category Requests
 * @category Subjects
 */
export interface WKSubjectRequests {
  /**
   * Get a Subject or Subject Collection from the WaniKani API.
   * @param idOrParams The Subject ID for individual Subjects, or parameters for Subject Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Subject(s) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKSubjectParameters | number, options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of Summary Requests available in the WaniKani API.
 *
 * @category Requests
 * @category Summary
 */
export interface WKSummaryRequests {
  /**
   * Get a summary of a user's available and upcoming lessons/reviews from the WaniKani API.
   *
   * @param options Options for making GET requests to the API.
   * @returns A Get Summary Request usabile in any HTTP API/Library.
   */
  get: (options?: WKRequestGetOptions) => WKRequest;
}

/**
 * Types of User Requests available in the WaniKani API.
 *
 * @category Requests
 * @category User
 */
export interface WKUserRequests {
  /**
   * Get a user's information from the WaniKani API.
   *
   * @param options Options for making GET requests to the API.
   * @returns A Get User Request usabile in any HTTP API/Library.
   */
  get: (options?: WKRequestGetOptions) => WKRequest;

  /**
   * Update a User's Preferences via the WaniKani API.
   *
   * @param payload The payload containing changed Preferences to send for the update.
   * @param options Options for making PUT requests to the API.
   * @returns An Update User Preferences Request usabile in any HTTP API/Library.
   */
  updatePreferences: (payload: WKUserPreferencesPayload, options?: WKRequestPostPutOptions) => WKRequest;
}

/**
 * Types of Voice Actor Requests available in the WaniKani API.
 *
 * @category Requests
 * @category Voice Actors
 */
export interface WKVoiceActorRequests {
  /**
   * Get a Voice Actor or Voice Actor Collection from the WaniKani API.
   * @param idOrParams The Voice Actor ID for individual Voice Actors, or parameters for Voice Actor Collections.
   * @param options Options for making GET requests to the API.
   * @returns A Get Voice Actor(s) Request usabile in any HTTP API/Library.
   */
  get: (idOrParams?: WKVoiceActorParameters | number, options?: WKRequestGetOptions) => WKRequest;
}
