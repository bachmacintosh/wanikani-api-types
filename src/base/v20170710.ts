import { type Brand, type Range, isValidDate } from "../internal";
import type {
  WKAssignment,
  WKAssignmentData,
  WKAssignmentParameters,
  WKAssignmentPayload,
  WKKanaVocabulary,
  WKKanaVocabularyData,
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
  WKReviewPayload,
  WKReviewStatistic,
  WKReviewStatisticData,
  WKReviewStatisticParameters,
  WKSpacedRepetitionSystem,
  WKSpacedRepetitionSystemData,
  WKSpacedRepetitionSystemParameters,
  WKStudyMaterial,
  WKStudyMaterialCreatePayload,
  WKStudyMaterialData,
  WKStudyMaterialParameters,
  WKStudyMaterialUpdatePayload,
  WKSubject,
  WKSubjectParameters,
  WKSummaryData,
  WKUserData,
  WKUserPreferences,
  WKUserPreferencesPayload,
  WKVocabulary,
  WKVocabularyData,
  WKVoiceActor,
  WKVoiceActorData,
  WKVoiceActorParameters,
} from "../v20170710.js";

/**
 * All known WaniKani API revisions, created when breaking changes are introduced to the WaniKani API.
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
  data_updated_at: WKDatableString | null;

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
  updated_after?: Date | WKDatableString;
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
 * A `string` sent to/returned from the WaniKani API that can be converted into a JavaScript `Date` object.
 *
 * @see {@link isWKDatableString}
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
 * A number representing a valid lesson batch size in WaniKani, from `3` to `10`.
 *
 * @category Base
 */
export type WKLessonBatchSizeNumber = Range<WKMinLessonBatchSize, WKMaxLessonBatchSize>;

/**
 * A number representing a level in WaniKani, from `1` to `60`.
 *
 * @category Base
 */
export type WKLevel = Range<1, WKMaxLevels>;

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
 * Map PUT and POST requests to the WaniKani API, to their respective Payload types.
 *
 * @category Base
 * @category Payloads
 */
export interface WKPayloadMap {
  /** Payload to create a Review. */
  "POST /reviews": WKReviewPayload;
  /** Payload to create a new Study Material. */
  "POST /study_materials": WKStudyMaterialCreatePayload;
  /** Payload to start an Assignment. */
  "PUT /assignments/<id>/start": WKAssignmentPayload;
  /** Payload to update an existing Study Material. */
  "PUT /study_materials/<id>": WKStudyMaterialUpdatePayload;
  /** Payload to update the User's Preferences. */
  "PUT /user": WKUserPreferencesPayload;
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
  data_updated_at: WKDatableString;

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
  data_updated_at: WKDatableString;

  /**
   * The kind of object returned.
   */
  object: WKResourceType | WKSubjectType;

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
 * The types of resources used on WaniKani and its API.
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
 * A valid WaniKani Spaced Repetition System (SRS) Stage Number, based on the known SRS' on WaniKani and its API.
 *
 * @category Base
 */
export type WKSrsStageNumber = Range<0, WKMaxSrsStages>;

/**
 * A non-empty array of WaniKani subject types.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Base
 * @category Subjects
 */
export type WKSubjectTuple = [WKSubjectType, ...WKSubjectType[]];

/**
 * The types of subjects used on WaniKani and its API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Base
 * @category Subjects
 */
export type WKSubjectType = "kana_vocabulary" | "kanji" | "radical" | "vocabulary";

/**
 * A type guard to determine if a given item is a valid {@link WKDatableString}.
 *
 * @param possibleWKDatableString - An unknown item.
 * @returns `true` if the item is a valid {@link WKDatableString}, `false` if not.
 * @category Base
 */
export function isWKDatableString(possibleWKDatableString: unknown): possibleWKDatableString is WKDatableString {
  const twentyFourHours = 24;

  const datePattern =
    /(?<year>\d{4})-(?<month>[01]\d)-(?<day>[0-3]\d)T(?<hour>[0-2]\d):(?<minute>[0-5]\d):(?<second>[0-5]\d)\.(?<microsecond>\d{1,6})(?<offset>[+-][0-2]\d:[0-5]\d|Z)/u;
  if (typeof possibleWKDatableString === "string") {
    const matches = datePattern.exec(possibleWKDatableString);
    if (typeof matches?.groups === "undefined") {
      return false;
    }
    const yearNumber = parseInt(matches.groups.year, 10);
    const monthNumber = parseInt(matches.groups.month, 10);
    const dayNumber = parseInt(matches.groups.day, 10);
    const hourNumber = parseInt(matches.groups.hour, 10);
    if (!isValidDate(yearNumber, monthNumber, dayNumber)) {
      return false;
    }
    if (hourNumber >= twentyFourHours) {
      return false;
    }
    if (matches.groups.offset !== "Z") {
      const offsetPattern = /[+-](?<hour>[0-2]\d):(?<minute>[0-5]\d)/u;
      const offsetMatches = offsetPattern.exec(matches.groups.offset);
      if (typeof offsetMatches?.groups === "undefined") {
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
 * A type guard to determine if a given item is a {@link WKLessonBatchSizeNumber}.
 * @param possibleWKLessonBatchSizeNumber - An unknown item.
 * @returns `true` if the item is a valid {@link WKLessonBatchSizeNumber}, `false` if not.
 * @category Base
 */
export function isWKLessonBatchSizeNumber(
  possibleWKLessonBatchSizeNumber: unknown,
): possibleWKLessonBatchSizeNumber is WKLessonBatchSizeNumber {
  return (
    typeof possibleWKLessonBatchSizeNumber === "number" &&
    Number.isInteger(possibleWKLessonBatchSizeNumber) &&
    possibleWKLessonBatchSizeNumber >= WK_MIN_LESSON_BATCH_SIZE &&
    possibleWKLessonBatchSizeNumber <= WK_MAX_LESSON_BATCH_SIZE
  );
}

/**
 * A type guard to determine if a given item is a {@link WKLevel}.
 *
 * @param possibleWKLevel - An unknown item.
 * @returns `true` if the item is a valid {@link WKLevel}, `false` if not.
 * @category Base
 */
export function isWKLevel(possibleWKLevel: unknown): possibleWKLevel is WKLevel {
  return (
    typeof possibleWKLevel === "number" &&
    Number.isInteger(possibleWKLevel) &&
    possibleWKLevel >= 1 &&
    possibleWKLevel <= WK_MAX_LEVELS
  );
}

/**
 * A type guard to determine if a given item is a {@link WKLevel} array.
 *
 * @param possibleWKLevelArray - An unknown item.
 * @returns `true` if the item is a valid {@link WKLevel} array, `false` if not.
 * @category Base
 */
export function isWKLevelArray(possibleWKLevelArray: unknown): possibleWKLevelArray is WKLevel[] {
  if (!Array.isArray(possibleWKLevelArray)) {
    return false;
  }
  if (possibleWKLevelArray.length === 0) {
    return false;
  }
  const hasAllNumbersAndAllIntegers = possibleWKLevelArray.every(Number.isInteger);
  const hasAllNumbersInRange = possibleWKLevelArray.every((value) => {
    return value >= 1 && value <= WK_MAX_LEVELS;
  });
  return hasAllNumbersAndAllIntegers && hasAllNumbersInRange;
}

/**
 * A type guard to determine if a given item is a {@link WKSrsStageNumber}.
 *
 * @param possibleWKSrsStageNumber - An unknown item.
 * @returns `true` if the item is a valid {@link WKSrsStageNumber}, `false` if not.
 * @category Base
 */
export function isWKSrsStageNumber(possibleWKSrsStageNumber: unknown): possibleWKSrsStageNumber is WKSrsStageNumber {
  return (
    typeof possibleWKSrsStageNumber === "number" &&
    Number.isInteger(possibleWKSrsStageNumber) &&
    possibleWKSrsStageNumber >= 0 &&
    possibleWKSrsStageNumber <= WK_MAX_SRS_STAGES
  );
}

/**
 * A type guard to determine if a given item is a {@link WKSrsStageNumber} array.
 *
 * @param possibleWKSrsStageNumberArray - An unknown item.
 * @returns `true` if the item is a valid {@link WKSrsStageNumber} array, `false` if not.
 * @category Base
 */
export function isWKSrsStageNumberArray(
  possibleWKSrsStageNumberArray: unknown,
): possibleWKSrsStageNumberArray is WKSrsStageNumber[] {
  if (!Array.isArray(possibleWKSrsStageNumberArray)) {
    return false;
  }
  if (possibleWKSrsStageNumberArray.length === 0) {
    return false;
  }
  const hasAllNumbersAndAllIntegers = possibleWKSrsStageNumberArray.every(Number.isInteger);
  const hasAllNumbersInRange = possibleWKSrsStageNumberArray.every((value) => {
    return value >= 0 && value <= WK_MAX_SRS_STAGES;
  });
  return hasAllNumbersAndAllIntegers && hasAllNumbersInRange;
}

/**
 * Parses a parameter object, for use with the WaniKani API.
 *
 * @param params -- An object containing the query string parameters to parse.
 * @returns A query string of all the parameters, which can be added to a base URL.
 * @throws A `TypeError` if a non-object is passed to the function.
 * @category Base
 */
export function stringifyParameters<T extends WKCollectionParameters>(params: T): string {
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

/**
 * Perform runtime validation of Collection Parameters.
 *
 * @param type The type of parameters to validate.
 * @param params The {@link WKCollectionParameters} object to validate.
 * @throws A `TypeError` if parameter validation fails.
 * @category Base
 */
export function validateParameters<T extends keyof WKCollectionParametersMap>(
  type: T,
  params: WKCollectionParametersMap[T],
): void {
  /* Start by making dummy parameters with all properties requireed; this ensures we're checking all fields, and that
     if we update types, this function will get updated, too. */
  const assignmentParams: Required<WKAssignmentParameters> = {
    available_after: new Date(),
    available_before: new Date(),
    burned: true,
    hidden: true,
    ids: [1],
    immediately_available_for_lessons: true,
    immediately_available_for_review: true,
    in_review: true,
    levels: [1],
    page_after_id: 1,
    page_before_id: 1,
    srs_stages: [1],
    started: true,
    subject_ids: [1],
    subject_types: ["kanji"],
    unlocked: true,
    updated_after: new Date(),
  };
  const levelProgressionParams: Required<WKLevelProgressionParameters> = {
    ids: [1],
    page_after_id: 1,
    page_before_id: 1,
    updated_after: new Date(),
  };
  const resetParams: Required<WKResetParameters> = {
    ids: [1],
    page_after_id: 1,
    page_before_id: 1,
    updated_after: new Date(),
  };
  const reviewParams: Required<WKReviewParameters> = {
    assignment_ids: [1],
    ids: [1],
    page_after_id: 1,
    page_before_id: 1,
    subject_ids: [1],
    updated_after: new Date(),
  };
  const reviewStatisticParams: Required<WKReviewStatisticParameters> = {
    hidden: true,
    ids: [1],
    page_after_id: 1,
    page_before_id: 1,
    percentages_greater_than: 1,
    percentages_less_than: 1,
    subject_ids: [1],
    subject_types: ["kanji"],
    updated_after: new Date(),
  };
  const srsParams: Required<WKSpacedRepetitionSystemParameters> = {
    ids: [1],
    page_after_id: 1,
    page_before_id: 1,
    updated_after: new Date(),
  };
  const studyMaterialParams: Required<WKStudyMaterialParameters> = {
    hidden: true,
    ids: [1],
    page_after_id: 1,
    page_before_id: 1,
    subject_ids: [1],
    subject_types: ["kanji"],
    updated_after: new Date(),
  };
  const subjectParams: Required<WKSubjectParameters> = {
    hidden: true,
    ids: [1],
    levels: [1],
    page_after_id: 1,
    page_before_id: 1,
    slugs: [""],
    types: ["kanji"],
    updated_after: new Date(),
  };
  const voiceActorParams: Required<WKVoiceActorParameters> = {
    ids: [1],
    page_after_id: 1,
    page_before_id: 1,
    updated_after: new Date(),
  };

  /* Map Collection names to their types. */
  const validKeys: WKCollectionParametersMap = {
    Assignment: assignmentParams,
    "Level Progression": levelProgressionParams,
    Reset: resetParams,
    Review: reviewParams,
    "Review Statistic": reviewStatisticParams,
    "Spaced Repetition System": srsParams,
    "Study Material": studyMaterialParams,
    Subject: subjectParams,
    "Voice Actor": voiceActorParams,
  };

  /* If we find a key in the object that isn't in the type, throw an error. */
  Object.keys(params).forEach((key) => {
    if (!(key in validKeys[type])) {
      throw new TypeError(`Parameter "${key}" is not valid for ${type} Collections.`);
    }
  });
}

/**
 * Perform runtime validation of Payloads.
 * @param type The URI for the given payload, i.e. a type of `POST` or `PUT` request.
 * @param payload The payload object to be validated.
 * @throws A `TypeError` if payload validation fails.
 * @category Base
 * @category Payloads
 */
export function validatePayload<T extends keyof WKPayloadMap>(type: T, payload: WKPayloadMap[T]): void {
  /* Let's try not to end up here! */
  function throwTypeError(key: string, payloadType: T): never {
    throw new TypeError(`Key "${key}" is not valid for a payload sent to ${payloadType} .`);
  }

  /* Create required dummy parameters */
  const assignmentStartPayload: Required<WKAssignmentPayload> = {
    started_at: new Date(),
  };
  const reviewCreatePayloadAssignment: Required<WKReviewPayload> = {
    review: {
      assignment_id: 1,
      incorrect_meaning_answers: 0,
      incorrect_reading_answers: 0,
    },
  };
  const reviewCreatePayloadSubject: Required<WKReviewPayload> = {
    review: {
      subject_id: 1,
      incorrect_meaning_answers: 0,
      incorrect_reading_answers: 0,
    },
  };
  const studyMaterialCreatePayload: Required<WKStudyMaterialCreatePayload> = {
    subject_id: 1,
    meaning_synonyms: ["one"],
    meaning_note: "one",
    reading_note: "one",
  };
  const studyMaterialUpdatePayload: Required<WKStudyMaterialUpdatePayload> = {
    meaning_synonyms: ["one"],
    meaning_note: "one",
    reading_note: "one",
  };
  const preferences: Required<WKUserPreferences> = {
    default_voice_actor_id: 1,
    extra_study_autoplay_audio: true,
    lessons_autoplay_audio: true,
    lessons_batch_size: 3,
    lessons_presentation_order: "ascending_level_then_subject",
    reviews_autoplay_audio: true,
    reviews_display_srs_indicator: true,
    reviews_presentation_order: "shuffled",
  };
  const userPreferencesPayload: Required<WKUserPreferencesPayload> = {
    user: {
      preferences,
    },
  };

  /* Valid-key sets, used depending on type of payload being validated */
  const validKeysExceptReviews: Omit<WKPayloadMap, "POST /reviews"> = {
    "PUT /assignments/<id>/start": assignmentStartPayload,
    "POST /study_materials": studyMaterialCreatePayload,
    "PUT /study_materials/<id>": studyMaterialUpdatePayload,
    "PUT /user": userPreferencesPayload,
  };
  const validKeysReviewAssignment: Pick<WKPayloadMap, "POST /reviews"> = {
    "POST /reviews": reviewCreatePayloadAssignment,
  };
  const validKeysReviewSubject: Pick<WKPayloadMap, "POST /reviews"> = {
    "POST /reviews": reviewCreatePayloadSubject,
  };

  /* Check for unexpected keys, throw if we find one */
  Object.keys(payload).forEach((key) => {
    if (type === "POST /reviews") {
      if (!(key in validKeysReviewAssignment["POST /reviews"]) && !(key in validKeysReviewSubject["POST /reviews"])) {
        throwTypeError(key, type);
      }
    } else if (type === "POST /study_materials" && !(key in validKeysExceptReviews["POST /study_materials"])) {
      throwTypeError(key, type);
    } else if (
      type === "PUT /assignments/<id>/start" &&
      !(key in validKeysExceptReviews["PUT /assignments/<id>/start"])
    ) {
      throwTypeError(key, type);
    } else if (type === "PUT /study_materials/<id>" && !(key in validKeysExceptReviews["PUT /study_materials/<id>"])) {
      throwTypeError(key, type);
    } else if (type === "PUT /user" && !(key in validKeysExceptReviews["PUT /user"])) {
      throwTypeError(key, type);
    }
  });
}
