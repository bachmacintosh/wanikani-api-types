import * as v from "valibot";
import { ApiRevision, stringifyParameters } from "../base/v20170710.js";
import { AssignmentParameters, AssignmentPayload } from "../assignments/v20170710.js";
import { ReviewParameters, ReviewPayload } from "../reviews/v20170710.js";
import {
  StudyMaterialCreatePayload,
  StudyMaterialParameters,
  StudyMaterialUpdatePayload,
} from "../study-materials/v20170710.js";
import { LevelProgressionParameters } from "../level-progressions/v20170710.js";
import { ResetParameters } from "../resets/v20170710.js";
import { ReviewStatisticParameters } from "../review-statistics/v20170710.js";
import { SpacedRepetitionSystemParameters } from "../spaced-repetition-systems/v20170710.js";
import { SubjectParameters } from "../subjects/v20170710.js";
import { UserPreferencesPayload } from "../user/v20170710.js";
import { VoiceActorParameters } from "../voice-actors/v20170710.js";

/**
 * An object containing all information needed to make a request to the WaniKani API using any HTTP API/Library.
 *
 * @see {@link ApiRequestFactory}
 * @category Requests
 */
export interface ApiRequest {
  /** The request body, either `null` for GET requests, or a `string` for POST and PUT requests. */
  body: string | null;
  /** The request headers, including both standard and user-set headers. */
  headers: ApiRequestHeaders;
  /** The request's HTTP method. */
  method: "GET" | "POST" | "PUT";
  /** The full URL where the request will be sent to. */
  url: string;
}

/**
 * A factory for preparing requests to the WaniKani API, with methods that return an {@link ApiRequest} that can be used
 * in any HTTP library/package to make the request.
 *
 * @category Requests
 */
export class ApiRequestFactory {
  /**
   * Types of Assignment Requests available in the WaniKani API.
   */
  public readonly assignments = {
    /**
     * Get an Assignment or Assignment Collection from the WaniKani API.
     * @param idOrParams The Assignment ID for individual Assignments, or parameters for Assignment Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Assignment(s) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: AssignmentParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/assignments`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(AssignmentParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },

    /**
     * Start an Assignment (i.e. move from Lessons to Reviews) via the WaniKani API.
     * @param assignmentId The Assignment ID to start.
     * @param payload The payload to send when starting the Assignment.
     * @param options Options for making PUT requests to the API.
     * @returns A Start Assignment Request usable in any HTTP API/Library.
     */
    start: (assignmentId: number, payload: AssignmentPayload, options?: ApiRequestOptions): ApiRequest => {
      const validatedPayload = v.parse(AssignmentPayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(validatedPayload),
        headers,
        method: "PUT",
        url: `${this.baseUrl}/assignments/${assignmentId}/start`,
      };
      return request;
    },
  };

  /** The base URL of the WaniKani API */
  public readonly baseUrl = "https://api.wanikani.com/v2";

  /**
   * Types of Level Progression Requests available in the WaniKani API.
   */
  public readonly levelProgressions = {
    /**
     * Get a Level Progression or Level Progression Collection from the WaniKani API.
     * @param idOrParams The Level Progression ID for individual Level Progressions, or parameters for Level
     * Progression Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Level Progression(s) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: LevelProgressionParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/level_progressions`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(LevelProgressionParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },
  };

  /**
   * Types of Reset Requests available in the WaniKani API.
   */
  public readonly resets = {
    /**
     * Get a Reset or Reset Collection from the WaniKani API.
     * @param idOrParams The Reset ID for individual Resets, or parameters for Reset Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Reset(s) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: ResetParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/resets`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(ResetParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },
  };

  /**
   * Types of Review Statistic Requests available in the WaniKani API.
   */
  public readonly reviewStatistics = {
    /**
     * Get a Review Statistic or Review Statistic Collection from the WaniKani API.
     * @param idOrParams The Review Statistic ID for individual Review Statistics, or parameters for Review Statistic
     * Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Review Statistic(s) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: ReviewStatisticParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/review_statistics`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(ReviewStatisticParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },
  };

  /**
   * Types of Review Requests available in the WaniKani API.
   */
  public readonly reviews = {
    /**
     * Create a new Review via the WaniKani API.
     * @param payload The payload to send when creating the Review.
     * @param options Options for making POST requests to the API.
     * @returns A Create Review Request usabile in any HTTP API/Library.
     */
    create: (payload: ReviewPayload, options?: ApiRequestOptions): ApiRequest => {
      const validatedPayload = v.parse(ReviewPayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options !== "undefined") {
        if (typeof options.customHeaders !== "undefined") {
          for (const [key, value] of Object.entries(options.customHeaders)) {
            ApiRequestFactory._validateHeader(key, value);
            headers[key] = value;
          }
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(validatedPayload),
        headers,
        method: "POST",
        url: `${this.baseUrl}/reviews`,
      };
      return request;
    },

    /**
     * Get a Review or Review Collection from the WaniKani API.
     * @param idOrParams The Review ID for individual Reviews, or parameters for Review Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Review(s) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: ReviewParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/reviews`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(ReviewParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },
  };

  /**
   * Types of Spaced Repetition System (SRS) Requests available in the WaniKani API.
   */
  public readonly spacedRepetitionSystems = {
    /**
     * Get a Spaced Repetition System (SRS) or Spaced Repetition System (SRS) Collection from the WaniKani API.
     * @param idOrParams The Spaced Repetition System (SRS) ID for individual Spaced Repetition Systems (SRS), or
     * parameters for Spaced Repetition System (SRS) Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Spaced Repetition System(s) (SRS) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: SpacedRepetitionSystemParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/spaced_repetition_systems`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(SpacedRepetitionSystemParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },
  };

  /**
   * Types of Study Material Requests available in the WaniKani API.
   */
  public readonly studyMaterials = {
    /**
     * Get a Study Material or Study Material Collection from the WaniKani API.
     * @param idOrParams The Study Material ID for individual Study Materials, or parameters for Study Material
     * Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Study Material(s) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: StudyMaterialParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/study_materials`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(StudyMaterialParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },

    /**
     * Create a new Study Material for a given Subject via the WaniKani API.
     * @param payload The payload to send when creating the new Study Material.
     * @param options Options for making POST requests to the API.
     * @returns A Create Study Material Request usabile in any HTTP API/Library.
     */
    create: (payload: StudyMaterialCreatePayload, options?: ApiRequestOptions): ApiRequest => {
      const validatedPayload = v.parse(StudyMaterialCreatePayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options !== "undefined") {
        if (typeof options.customHeaders !== "undefined") {
          for (const [key, value] of Object.entries(options.customHeaders)) {
            ApiRequestFactory._validateHeader(key, value);
            headers[key] = value;
          }
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(validatedPayload),
        headers,
        method: "POST",
        url: `${this.baseUrl}/study_materials`,
      };
      return request;
    },

    /**
     * Update a Study Material for a given Subject.
     * @param studyMaterialId The Study Material ID to update.
     * @param payload The payload to send when updating the Study Material.
     * @param options Options for making PUT requests to the API.
     * @returns An Update Study Material Request usabile in any HTTP API/Library.
     */
    update: (studyMaterialId: number, payload: StudyMaterialUpdatePayload, options?: ApiRequestOptions): ApiRequest => {
      const validatedPayload = v.parse(StudyMaterialUpdatePayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options !== "undefined") {
        if (typeof options.customHeaders !== "undefined") {
          for (const [key, value] of Object.entries(options.customHeaders)) {
            ApiRequestFactory._validateHeader(key, value);
            headers[key] = value;
          }
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(validatedPayload),
        headers,
        method: "PUT",
        url: `${this.baseUrl}/study_materials/${studyMaterialId}`,
      };
      return request;
    },
  };

  /**
   * Types of Subject Requests available in the WaniKani API.
   */
  public readonly subjects = {
    /**
     * Get a Subject or Subject Collection from the WaniKani API.
     * @param idOrParams The Subject ID for individual Subjects, or parameters for Subject Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Subject(s) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: SubjectParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/subjects`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(SubjectParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },
  };

  /**
   * Types of Summary Requests available in the WaniKani API.
   */
  public readonly summary = {
    /**
     * Get a summary of a user's available and upcoming lessons/reviews from the WaniKani API.
     *
     * @param options Options for making GET requests to the API.
     * @returns A Get Summary Request usabile in any HTTP API/Library.
     */
    get: (options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/summary`,
      };
      return request;
    },
  };

  /**
   * Types of User Requests available in the WaniKani API.
   */
  public readonly user = {
    /**
     * Get a user's information from the WaniKani API.
     *
     * @param options Options for making GET requests to the API.
     * @returns A Get User Request usabile in any HTTP API/Library.
     */
    get: (options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/user`,
      };
      return request;
    },

    /**
     * Update a User's Preferences via the WaniKani API.
     *
     * @param payload The payload containing changed Preferences to send for the update.
     * @param options Options for making PUT requests to the API.
     * @returns An Update User Preferences Request usabile in any HTTP API/Library.
     */
    updatePreferences: (payload: UserPreferencesPayload, options?: ApiRequestOptions): ApiRequest => {
      const validatedPayload = v.parse(UserPreferencesPayload, payload);
      const headers = { ...this._postPutHeaders };
      if (typeof options !== "undefined") {
        if (typeof options.customHeaders !== "undefined") {
          for (const [key, value] of Object.entries(options.customHeaders)) {
            ApiRequestFactory._validateHeader(key, value);
            headers[key] = value;
          }
        }
      }
      const request: ApiRequest = {
        body: JSON.stringify(validatedPayload),
        headers,
        method: "PUT",
        url: `${this.baseUrl}/user`,
      };
      return request;
    },
  };

  /**
   * Types of Voice Actor Requests available in the WaniKani API.
   */
  public readonly voiceActors = {
    /**
     * Get a Voice Actor or Voice Actor Collection from the WaniKani API.
     * @param idOrParams The Voice Actor ID for individual Voice Actors, or parameters for Voice Actor Collections.
     * @param options Options for making GET requests to the API.
     * @returns A Get Voice Actor(s) Request usabile in any HTTP API/Library.
     */
    get: (idOrParams?: VoiceActorParameters | number, options?: ApiRequestOptions): ApiRequest => {
      const headers = { ...this._getHeaders };
      if (typeof options?.customHeaders !== "undefined") {
        for (const [key, value] of Object.entries(options.customHeaders)) {
          ApiRequestFactory._validateHeader(key, value);
          headers[key] = value;
        }
      }
      const request: ApiRequest = {
        body: null,
        headers,
        method: "GET",
        url: `${this.baseUrl}/voice_actors`,
      };
      if (typeof idOrParams === "number") {
        request.url += `/${idOrParams}`;
      } else if (typeof idOrParams !== "undefined") {
        const validatedParameters = v.parse(VoiceActorParameters, idOrParams);
        request.url += stringifyParameters(validatedParameters);
      }
      return request;
    },
  };

  /**
   * The headers set on factory initialization, excluding anything in the `customHeaders` property in
   * {@link ApiRequestFactoryInit}.
   */
  private readonly _initHeaders: ApiRequestHeaders;

  /**
   * The headers that will be added to any GET requests returned by the factory.
   */
  private _getHeaders: ApiRequestHeaders;

  /**
   * The headers that will be added to any POST and PUT requests returned by the factory.
   */
  private _postPutHeaders: ApiRequestHeaders;

  /**
   * Initialize the Request Factory.
   * @param init Initialization options for the factory.
   */
  public constructor(init: ApiRequestFactoryInit) {
    this._initHeaders = {
      authorization: `Bearer ${init.apiToken}`,
      "wanikani-revision": init.revision ?? "20170710",
    };
    this._getHeaders = { ...this._initHeaders };
    this._postPutHeaders = { ...this._initHeaders };
    if (typeof init.customHeaders !== "undefined") {
      for (const [key, value] of Object.entries(init.customHeaders)) {
        ApiRequestFactory._validateHeader(key, value);
        this._getHeaders[key] = value;
        this._postPutHeaders[key] = value;
      }
    }
    this._postPutHeaders["content-type"] = "application/json";
  }

  /**
   * Validates custom-set headers to make sure type checking isn't circumvented.
   * @param key The header key, e.g. `Accpet` or `X-Forwarded-For`
   * @param value The header value, e.g. `application/json` or `192.168.1.1`
   * @throws A `TypeError` if there is an attempt to improperly set type-checked headers.
   * @internal
   */
  private static _validateHeader(key: string, value: string): void {
    if (key.toLowerCase() === "authorization") {
      throw new TypeError("WaniKani API Token should be set via setApiToken() method.");
    } else if (key.toLowerCase() === "wanikani-revision") {
      throw new TypeError("WaniKani API Revision should be set via setApiRevision() method.");
    } else if (
      (key.toLowerCase() === "accept" || key.toLowerCase() === "content-type") &&
      value !== "application/json"
    ) {
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
      ApiRequestFactory._validateHeader(key, value);
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
    const validRevision = v.parse(ApiRevision, revision);
    this._initHeaders["wanikani-revision"] = validRevision;
    this._getHeaders["wanikani-revision"] = validRevision;
    this._postPutHeaders["wanikani-revision"] = validRevision;
    return this;
  }

  /**
   * Sets a new WaniKani API Token to use in requests returned by the factory.
   * @param token The new WaniKani API Token to use.
   * @returns The factory, with the newly set WaniKani API Token.
   */
  public setApiToken(token: string): this {
    this._initHeaders.authorization = `Bearer ${token}`;
    this._getHeaders.authorization = `Bearer ${token}`;
    this._postPutHeaders.authorization = `Bearer ${token}`;
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
      ApiRequestFactory._validateHeader(key, value);
      this._getHeaders[key] = value;
      this._postPutHeaders[key] = value;
    }
    this._postPutHeaders["content-type"] = "application/json";
    return this;
  }
}

/**
 * Initialization options for a {@link ApiRequestFactory}.
 *
 * @category Requests
 */
export interface ApiRequestFactoryInit {
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
export interface ApiRequestOptions {
  /** Custom headers to add to this request only. */
  customHeaders?: Record<string, string>;
}

/**
 * Generally expected HTTP headers when making requests to the WaniKani API.
 *
 * @category Requests
 */
export interface ApiRequestHeaders {
  /** HTTP Authorization header, using a Bearer Token. */
  authorization: `Bearer ${string}`;
  /** The WaniKani API Revision. */
  "wanikani-revision": ApiRevision;
  [customHeaders: string]: string;
  /** The client should accept JSON as that is how the WaniKani API's response bodies are formatted. */
  accept?: "application/json";
  /** When making a POST or PUT request, the client should indicate they are sending a JSON request body. */
  "content-type"?: "application/json";
  /** An HTTP Date can be sent to check for data changes, and expect an HTTP Status 304 if there are none. */
  "if-modified-since"?: string;
  /** An HTTP ETag can be sent to check for data changes, and expect an HTTP Status 304 if there are none. */
  "if-none-match"?: string;
  /** A User Agent to better identify who is making the request to the WaniKani API. */
  "user-agent"?: string;
}
