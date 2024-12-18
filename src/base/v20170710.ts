import * as v from "valibot";
import type { WKAssignment, WKAssignmentData, WKAssignmentParameters } from "../assignments/v20170710.js";
import type {
  WKKanaVocabulary,
  WKKanaVocabularyData,
  WKKanji,
  WKKanjiData,
  WKRadical,
  WKRadicalData,
  WKSubject,
  WKSubjectParameters,
  WKVocabulary,
  WKVocabularyData,
} from "../subjects/v20170710.js";
import type {
  WKLevelProgression,
  WKLevelProgressionData,
  WKLevelProgressionParameters,
} from "../level-progressions/v20170710.js";
import type { WKReset, WKResetData, WKResetParameters } from "../resets/v20170710.js";
import type { WKReview, WKReviewData, WKReviewParameters } from "../reviews/v20170710.js";
import type {
  WKReviewStatistic,
  WKReviewStatisticData,
  WKReviewStatisticParameters,
} from "../review-statistics/v20170710.js";
import type {
  WKSpacedRepetitionSystem,
  WKSpacedRepetitionSystemData,
  WKSpacedRepetitionSystemParameters,
} from "../spaced-repetition-systems/v20170710.js";
import type { WKStudyMaterial, WKStudyMaterialData, WKStudyMaterialParameters } from "../study-materials/v20170710.js";
import type { WKVoiceActor, WKVoiceActorData, WKVoiceActorParameters } from "../voice-actors/v20170710.js";
import type { WKSummaryData } from "../summary/v20170710.js";
import type { WKUserData } from "../user/v20170710.js";

/**
 * All known WaniKani API revisions, created when breaking changes are introduced to the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#revisions-aka-versioning}
 * @category Base
 */
export type ApiRevision = "20170710";
export const ApiRevision = v.literal("20170710");

/**
 * A constant representing the WaniKani API revision. This will match the revision module being imported from, or the
 * latest revision when importing from the root module.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#revisions-aka-versioning}
 * @category Base
 */
export const API_REVISION: ApiRevision = "20170710";

/**
 * A `string` sent to/returned from the WaniKani API that can be converted into a JavaScript `Date` object.
 *
 * @category Base
 */
export type DatableString = v.Brand<"DatableString"> & string;
export const DatableString = v.pipe(v.string(), v.isoTimestamp(), v.brand("DatableString"));

/**
 * A number representing a level in WaniKani, from `1` to `60`.
 *
 * @category Base
 */
export type Level = v.Brand<"Level"> & number;
const MaxLevel = 60;
export const Level = v.pipe(v.number(), v.minValue(1), v.maxValue(MaxLevel), v.brand("Level"));

/**
 * The minimum level provided by WaniKani; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const MIN_LEVEL: Level = v.parse(Level, 1);

/**
 * The maximum level provided by WaniKani; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const MAX_LEVEL: Level = v.parse(Level, MaxLevel);

/**
 * The types of resources used on WaniKani and its API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 * @category Base
 */
export type ResourceType =
  | "assignment"
  | "level_progression"
  | "reset"
  | "review_statistic"
  | "review"
  | "spaced_repetition_system"
  | "study_material"
  | "user"
  | "voice_actor";
export const ResourceType = v.picklist([
  "assignment",
  "level_progression",
  "reset",
  "review_statistic",
  "review",
  "spaced_repetition_system",
  "study_material",
  "user",
  "voice_actor",
]);

/**
 * The types of subjects used on WaniKani and its API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Base
 * @category Subjects
 */
export type SubjectType = "kana_vocabulary" | "kanji" | "radical" | "vocabulary";
export const SubjectType = v.picklist(["kana_vocabulary", "kanji", "radical", "vocabulary"]);

/**
 * A non-empty array of WaniKani subject types.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Base
 * @category Subjects
 */
export type SubjectTuple = [SubjectType, ...SubjectType[]];
export const SubjectTuple = v.pipe(v.tupleWithRest([SubjectType], SubjectType), v.nonEmpty());

/**
 * The common properties across all Collection items from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 * @category Base
 * @category Collections
 */
export interface WKCollection {
  /**
   * The resource's data, dependent on the collection's resource type.
   */
  data:
    | WKAssignment[]
    | WKKanaVocabulary[]
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

  /**
   * For collections, this is the timestamp of the most recently updated resource in the specified scope and is not
   * limited by pagination. If no items were returned for the specified scope, then this will be `null`.
   */
  data_updated_at: DatableString | null;

  /**
   * The kind of object returned.
   */
  object: "collection";

  /**
   * Pagination Info for the collection.
   */
  pages: {
    /**
     * The URL of the next page of results. If there are no more results, the value is `null`.
     */
    next_url: string | null;

    /**
     * Maximum number of items delivered per page for this collection.
     */
    per_page: number;

    /**
     * The URL of the previous page of results. If there are no results at all or no previous page to go to, the value
     * is `null`.
     */
    previous_url: string | null;
  };

  /**
   * The total number of items in the collection.
   */
  total_count: number;

  /**
   * The URL of the request. For collections, that will contain all the filters and options you've passed to the API.
   */
  url: string;

  /**
   * A collection will never have a `code` property.
   */
  code?: never;

  /**
   * A collection will never have an `error` property.
   */
  error?: never;
}

/**
 * Query string parameters that can be sent to any WaniKani API collection endpoint.
 *
 * @see {@link stringifyParameters}
 * @category Base
 * @category Parameters
 */
export interface WKCollectionParameters {
  /**
   * Only resources where `data.id` matches one of the array values are returned.
   */
  ids?: number[];

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

  /**
   * Only resources updated after this time are returned.
   */
  updated_after?: DatableString | Date;
}

/**
 * A map between WaniKani API Collection names and their respective types.
 *
 * @category Base
 * @category Parameters
 */
export interface WKCollectionParametersMap {
  /**
   * Parameters for Assignment Collections.
   */
  Assignment: WKAssignmentParameters;
  /**
   * Parameters for Level Progression Collections.
   */
  "Level Progression": WKLevelProgressionParameters;
  /**
   * Parameters for Reset Collections.
   */
  Reset: WKResetParameters;
  /**
   * Parameters for Review Collections.
   */
  Review: WKReviewParameters;
  /**
   * Parameters for Review Statistic Collections.
   */
  "Review Statistic": WKReviewStatisticParameters;
  /**
   * Parameters for Spaced Repetition System (SRS) Collections.
   */
  "Spaced Repetition System": WKSpacedRepetitionSystemParameters;
  /**
   * Parameters for Study Material Collections.
   */
  "Study Material": WKStudyMaterialParameters;
  /**
   * Parameters for Subject Collections.
   */
  Subject: WKSubjectParameters;
  /**
   * Parameters for Voice Actor Collections.
   */
  "Voice Actor": WKVoiceActorParameters;
}

/**
 * An error response returned by the WaniKani API.
 *
 * @category Base
 */
export interface WKError {
  /**
   * An HTTP status code indicating the type of error.
   */
  code: number;

  /**
   * A message string that describes the error.
   */
  error: string;

  /**
   * An error will never include a `data` property.
   */
  data?: never;

  /**
   * An error will never include a `data_updated_at` property.
   */
  data_updated_at?: never;

  /**
   * An error will never include an `id` property.
   */
  id?: never;

  /**
   * An error will never include an `object` property.
   */
  object?: never;

  /**
   * An error will never include a `pages` property.
   */
  pages?: never;

  /**
   * An error will never include a `total_count` property.
   */
  total_count?: never;

  /**
   * An error will never include a `url` property.
   */
  url?: never;
}

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
   * The report's data, dependent on the particular report.
   */
  data: WKSummaryData;

  /**
   * The last time the report was updated.
   */
  data_updated_at: DatableString;

  /**
   * The kind of object returned.
   */
  object: "report";

  /**
   * The URL of the requested report.
   */
  url: string;

  /**
   * A report will never have a `code` property.
   */
  code?: never;

  /**
   * A report will never have an `error` property.
   */
  error?: never;
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
   * The resource's data, dependent on the particular type of resource.
   */
  data:
    | WKAssignmentData
    | WKKanaVocabularyData
    | WKKanjiData
    | WKLevelProgressionData
    | WKRadicalData
    | WKResetData
    | WKReviewData
    | WKReviewStatisticData
    | WKSpacedRepetitionSystemData
    | WKStudyMaterialData
    | WKUserData
    | WKVocabularyData
    | WKVoiceActorData;

  /**
   * For a resource, this is the last time that particular resource was updated.
   */
  data_updated_at: DatableString;

  /**
   * The kind of object returned.
   */
  object: ResourceType | SubjectType;

  /**
   * The URL of the requested resource.
   */
  url: string;

  /**
   * A resource will never have a `code` property.
   */
  code?: never;

  /**
   * A resource will never have an `error` property.
   */
  error?: never;

  /**
   * A unique identifying number present on all Resources except a User
   * resource, where it is present the `data` object.
   */
  id?: number;
}

/**
 * Parses a parameter object, for use with the WaniKani API.
 *
 * @param params -- An object containing the query string parameters to parse.
 * @returns A query string of all the parameters, which can be added to a base URL.
 * @throws A `TypeError` if a non-object is passed to the function.
 * @category Base
 */
export function stringifyParameters(params: WKCollectionParameters): string {
  if (typeof params !== "object") {
    throw new TypeError("Parameters must be expressed as an object.");
  }
  if (Object.keys(params).length === 0) {
    return "";
  }

  let isFirstItem = true;
  let queryString = "";

  /* These boolean parameters are empty, i.e. no true or false, so should only be appended when actually set. */
  const emptyQueryParams = ["immediately_available_for_lessons", "immediately_available_for_review", "in_review"];

  for (const [key, value] of Object.entries(params)) {
    if (emptyQueryParams.includes(key) && typeof value === "boolean") {
      if (value) {
        queryString += isFirstItem ? "?" : "&";
        queryString += key;
      }
    } else {
      queryString += isFirstItem ? "?" : "&";
      if (typeof value === "boolean") {
        queryString += value ? `${key}=true` : `${key}=false`;
      } else if (value instanceof Date && Object.prototype.toString.call(value) === "[object Date]") {
        queryString += `${key}=${value.toISOString()}`;
      } else if (Array.isArray(value) || typeof value === "number" || typeof value === "string") {
        queryString += `${key}=${value.toString()}`;
      }
    }
    isFirstItem = false;
  }
  return queryString;
}
