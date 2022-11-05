import type {
	WKAssignment,
	WKAssignmentData,
	WKAssignmentParameters,
	WKKanji,
	WKKanjiData,
	WKLevelProgression,
	WKLevelProgressionData,
	WKLevelProgressionParameters,
	WKRadical,
	WKRadicalData,
	WKReset,
	WKResetData,
	WKResetParameters,
	WKReview,
	WKReviewData,
	WKReviewParameters,
	WKReviewStatistic,
	WKReviewStatisticData,
	WKReviewStatisticParameters,
	WKSpacedRepetitionSystem,
	WKSpacedRepetitionSystemData,
	WKSpacedRepetitionSystemParameters,
	WKStartedAssignmentData,
	WKStudyMaterial,
	WKStudyMaterialData,
	WKStudyMaterialParameters,
	WKSubject,
	WKSubjectData,
	WKSubjectParameters,
	WKSummaryData,
	WKUpdatedAssignmentData,
	WKUserData,
	WKVocabulary,
	WKVocabularyData,
	WKVoiceActor,
	WKVoiceActorData,
	WKVoiceActorParameters,
} from "../v20170710.js";
import type { Brand } from "../internal/index.js";

/**
 * All known WaniKani API revisions, created when breaking changes are introduced to the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#revisions-aka-versioning}
 * @category Base
 */
export type WKApiRevision = "20170710";

/**
 * A constant representing the WaniKani API revision. This will match the revision module being imported from, or the
 * latest revision when importing from the root module.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#revisions-aka-versioning}
 * @category Base
 */
export const WK_API_REVISION: WKApiRevision = "20170710";

/**
 * The common properties across all Collection items from the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 * @category Base
 * @category Collections
 */
export interface WKCollection {
	/**
	 * The kind of object returned
	 */
	object: "collection";

	/**
	 * The URL of the request. For collections, that will contain all the filters and options you've passed to the API.
	 */
	url: string;

	/**
	 * Pagination Info for the collection.
	 */
	pages: {
		/**
		 * The URL of the next page of results. If there are no more results, the value is `null`.
		 */
		next_url: string | null;

		/**
		 * The URL of the previous page of results. If there are no results at all or no previous page to go to, the value
		 * is `null`.
		 */
		previous_url: string | null;

		/**
		 * Maximum number of items delivered per page for this collection.
		 */
		per_page: number;
	};

	/**
	 * The total number of items in the collection.
	 */
	total_count: number;

	/**
	 * For collections, this is the timestamp of the most recently updated resource in the specified scope and is not
	 * limited by pagination. If no items were returned for the specified scope, then this will be `null`.
	 */
	data_updated_at: WKDatableString | null;

	/**
	 * The resource's data, dependent on the collection's resource type.
	 */
	data:
		| WKAssignment[]
		| WKKanji[]
		| WKLevelProgression[]
		| WKRadical[]
		| WKReset[]
		| WKReview[]
		| WKReviewStatistic[]
		| WKSpacedRepetitionSystem[]
		| WKStudyMaterial[]
		| WKSubject[]
		| WKVocabulary[]
		| WKVoiceActor[];
}

/**
 * Query string parameters that can be sent to any WaniKani API collection endpoint.
 *
 * @category Base
 * @category Parameters
 */
export interface WKCollectionParameters {
	/**
	 * Get a collection's next page containing `pages.per_page` resources after the given ID.
	 *
	 * This will take precedence over `page_before_id` if both are specified.
	 */
	page_after_id?: number;

	/**
	 * Get a collection's previous page containing `pages.per_page` resources before the given ID.
	 *
	 * The `page_after_id` parameter takes precedence over this if it is specified alongside this parameter.
	 */
	page_before_id?: number;
}

/**
 * A `string` sent to/returned from the WaniKani API that can be converted into a JavaScript `Date` object
 *
 * @category Base
 */
export type WKDatableString = Brand<string, "WKDatableString">;

/**
 * An error response returned by the WaniKani API.
 *
 * @category Base
 */
export interface WKError {
	/**
	 * A message string that describes the error.
	 */
	error?: string;

	/**
	 * An HTTP status code indicating the type of error.
	 */
	code: number;
}

/**
 * The maximum batch size for lessons in the WaniKani app.
 *
 * @category Base
 */
export type WKMaxLessonBatchSize = 10;

/**
 * The maximum batch size for lessons in the WaniKani app; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const WK_MAX_LESSON_BATCH_SIZE: WKMaxLessonBatchSize = 10;

/**
 * The maximum level provided by WaniKani; used to calculate level ranges.
 *
 * @category Base
 */
export type WKMaxLevels = 60;

/**
 * The maximum level provided by WaniKani; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const WK_MAX_LEVELS: WKMaxLevels = 60;

/**
 * The maximum number of SRS Stages used in WaniKani's reviews.
 *
 * @category Base
 */
export type WKMaxSrsReviewStages = 8;

/**
 * The maximum number of SRS Stages used in WaniKani's reviews; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const WK_MAX_SRS_REVIEW_STAGES: WKMaxSrsReviewStages = 8;

/**
 * The maximum number of SRS Stages used in WaniKani's SRS; used to calculate SRS Stage ranges.
 *
 * @category Base
 */
export type WKMaxSrsStages = 9;

/**
 * The maximum number of SRS Stages used in WaniKani's SRS; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const WK_MAX_SRS_STAGES: WKMaxSrsStages = 9;

/**
 * The maximum number of SRS Stages used in WaniKani's SRS, minus one; used to calculate SRS Stage ranges for reviews.
 *
 * @category Base
 * @deprecated Use {@link WKMaxSrsReviewStages} instead.
 */
export type WKMaxSrsStagesMinusOne = 8;

/**
 * The minimum batch size for lessons in the WaniKani app.
 *
 * @category Base
 */
export type WKMinLessonBatchSize = 3;

/**
 * The minimum batch size for lessons in the WaniKani app; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const WK_MIN_LESSON_BATCH_SIZE: WKMinLessonBatchSize = 3;

/**
 * The lowest number of levels that a WaniKani user has access to, when they are on a free subscription.
 *
 * @category Base
 */
export type WKMinLevels = 3;

/**
 * The lowest number of levels that a WaniKani user has access to, when they are on a free subscription; exported for
 * use in lieu of a Magic Number.
 *
 * @category Base
 */
export const WK_MIN_LEVELS: WKMinLevels = 3;

/**
 * All types of parameters that can be passed to various endpoints across the WaniKani API.
 *
 * @category Base
 * @category Parameters
 */
export type WKParameters =
	| WKAssignmentParameters
	| WKLevelProgressionParameters
	| WKResetParameters
	| WKReviewParameters
	| WKReviewStatisticParameters
	| WKSpacedRepetitionSystemParameters
	| WKStudyMaterialParameters
	| WKSubjectParameters
	| WKVoiceActorParameters;

/**
 * The common properties across all Reports from the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 *
 * @category Base
 * @category Reports
 */
export interface WKReport {
	/**
	 * The kind of object returned
	 */
	object: "report";

	/**
	 * The URL of the requested report.
	 */
	url: string;

	/**
	 * The last time the report was updated, in ISO-8601 format.
	 */
	data_updated_at: WKDatableString;

	/**
	 * The report's data, dependent on the particular report.
	 */
	data: WKSummaryData;
}

/**
 * The common properties across all Resources from the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 *
 * @category Base
 * @category Resources
 */
export interface WKResource {
	/**
	 * A unique identifying number present on all Resources except a User
	 * resource, where it is present the `data` object.
	 */
	id?: number;

	/**
	 * The kind of object returned.
	 */
	object: WKResourceType | WKSubjectType;

	/**
	 * The URL of the requested resource.
	 */
	url: string;

	/**
	 * For a resource, this is the last time that particular resource was updated.
	 */
	data_updated_at: WKDatableString;

	/**
	 * The resource's data, dependent on the particular type of resource.
	 */
	data:
		| WKAssignmentData
		| WKKanjiData
		| WKLevelProgressionData
		| WKRadicalData
		| WKResetData
		| WKReviewData
		| WKReviewStatisticData
		| WKSpacedRepetitionSystemData
		| WKStartedAssignmentData
		| WKStudyMaterialData
		| WKSubjectData
		| WKUpdatedAssignmentData
		| WKUserData
		| WKVocabularyData
		| WKVoiceActorData;
}

/**
 * The types of resources used on WaniKani and its API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 * @category Base
 */
export type WKResourceType =
	| "assignment"
	| "level_progression"
	| "reset"
	| "review_statistic"
	| "review"
	| "spaced_repetition_system"
	| "study_material"
	| "user"
	| "voice_actor";

/**
 * A non-empty array of WaniKani subject types
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Base
 * @category Subjects
 */
export type WKSubjectTuple = [WKSubjectType, ...WKSubjectType[]];

/**
 * The types of subjects used on WaniKani and its API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Base
 * @category Subjects
 */
export type WKSubjectType = "kanji" | "radical" | "vocabulary";

/**
 * A type guard to determine if a given item is a valid {@link WKDatableString}
 *
 * @param possibleWKDatableString - An unknown item
 * @returns `true` if the item is a valid {@link WKDatableString}, `false` if not
 * @category Base
 */
export function isWKDatableString(possibleWKDatableString: unknown): possibleWKDatableString is WKDatableString {
	const monthsInYear = 12;
	const thirtyDays = 30;
	const thirtyOneDays = 31;
	const monthsWithThirtyDays = ["04", "06", "09", "11"];
	const monthsWithThirtyOneDays = ["01", "03", "05", "07", "08", "10", "12"];
	const february = 2;
	const twentyFourHours = 24;

	const datePattern =
		/(?<year>\d{4})-(?<month>[01]\d)-(?<day>[0-3]\d)T(?<hour>[0-2]\d):(?<minute>[0-5]\d):(?<second>[0-5]\d)\.(?<microsecond>\d{1,6})(?<offset>[+-][0-2]\d:[0-5]\d|Z)/u;
	if (typeof possibleWKDatableString === "string") {
		const matches = datePattern.exec(possibleWKDatableString);
		if (matches === null || typeof matches.groups === "undefined") {
			return false;
		}
		const monthNumber = parseInt(matches.groups.month, 10);
		const dayNumber = parseInt(matches.groups.day, 10);
		const hourNumber = parseInt(matches.groups.hour, 10);
		if (monthNumber > monthsInYear) {
			return false;
		}
		if (monthsWithThirtyDays.includes(matches.groups.month) && dayNumber > thirtyDays) {
			return false;
		}
		if (monthsWithThirtyOneDays.includes(matches.groups.month) && dayNumber > thirtyOneDays) {
			return false;
		}
		if (monthNumber === february && dayNumber >= thirtyDays) {
			return false;
		}
		if (hourNumber >= twentyFourHours) {
			return false;
		}
		if (matches.groups.offset !== "Z") {
			const offsetPattern = /[+-](?<hour>[0-2]\d):(?<minute>[0-5]\d)/u;
			const offsetMatches = offsetPattern.exec(matches.groups.offset);
			if (offsetMatches === null || typeof offsetMatches.groups === "undefined") {
				return false;
			}
			const offsetHourNumber = parseInt(offsetMatches.groups.hour, 10);
			if (offsetHourNumber >= twentyFourHours) {
				return false;
			}
		}
		return true;
	}
	return false;
}

/**
 * Parses a parameter object, for use with the WaniKani API
 *
 * @param params -- An object containing the query string parameters to parse
 * @returns A query string of all the parameters, which can be added to a base URL
 * @category Base
 */
export function stringifyParameters<T extends WKCollectionParameters>(params: T): string {
	if (typeof params !== "object") {
		throw new TypeError();
	}
	if (Object.keys(params).length === 0) {
		return "";
	}

	let firstItem = true;
	let queryString = "";

	/* These boolean parameters are empty, i.e. no true or false, so should only be appended when actually set. */
	const emptyQueryParams = ["immediately_available_for_lessons", "immediately_available_for_review", "in_review"];

	for (const [key, value] of Object.entries(params)) {
		if (emptyQueryParams.includes(key) && typeof value === "boolean") {
			if (value) {
				queryString += firstItem ? "?" : "&";
				queryString += `${key}`;
			}
		} else {
			queryString += firstItem ? "?" : "&";
			if (typeof value === "boolean") {
				queryString += value ? `${key}=true` : `${key}=false`;
			} else if (value instanceof Date && Object.prototype.toString.call(value) === "[object Date]") {
				queryString += `${key}=${value.toISOString()}`;
			} else if (Array.isArray(value) || typeof value === "number" || typeof value === "string") {
				queryString += `${key}=${value.toString()}`;
			}
		}
		firstItem = false;
	}
	return queryString;
}
