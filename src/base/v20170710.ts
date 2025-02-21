import * as v from "valibot";

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
 * The minimum level provided by WaniKani; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const MIN_LEVEL = 1;

/**
 * The maximum level provided by WaniKani; exported for use in lieu of a Magic Number.
 *
 * @category Base
 */
export const MAX_LEVEL = 60;

/**
 * A number representing a level in WaniKani, from `1` to `60`.
 *
 * @category Base
 */
export type Level = number & {};
export const Level = v.pipe(v.number(), v.minValue(MIN_LEVEL), v.maxValue(MAX_LEVEL));

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
export const SubjectTuple = v.pipe(
  v.tupleWithRest([SubjectType], SubjectType),
  v.nonEmpty(),
  v.checkItems(
    (item, index, array) => array.indexOf(item) === index,
    "Duplicate Subject Type detected in Subject Tuple",
  ),
);

/**
 * The common properties across all Resources from the WaniKani API.
 *
 * @remarks This is a partial interface; most use cases involve using a reource that extends it.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 *
 * @category Base
 * @category Resources
 */
export interface BaseResource {
  /**
   * For a resource, this is the last time that particular resource was updated.
   */
  data_updated_at: DatableString;

  /**
   * The URL of the requested resource.
   */
  url: string;
}
export const BaseResource = v.object({
  data_updated_at: DatableString,
  url: v.string(),
});

/**
 * The common properties across all Collection items from the WaniKani API.
 *
 * @remarks This is a partial interface; most use cases involve using a reource that extends it.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 * @category Base
 * @category Collections
 */
export interface BaseCollection {
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
}
export const BaseCollection = v.object({
  data_updated_at: v.union([DatableString, v.null()]),
  object: v.literal("collection"),
  pages: v.object({
    next_url: v.union([v.string(), v.null()]),
    per_page: v.number(),
    previous_url: v.union([v.string(), v.null()]),
  }),
  total_count: v.number(),
  url: v.string(),
});

/**
 * Query string parameters that can be sent to any WaniKani API collection endpoint.
 *
 * @see {@link stringifyParameters}
 * @category Base
 * @category Parameters
 */
export interface CollectionParameters {
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
export const CollectionParameters = v.object({
  ids: v.optional(v.array(v.number())),
  page_after_id: v.optional(v.number()),
  page_before_id: v.optional(v.number()),
  updated_after: v.optional(v.union([DatableString, v.date()])),
});

/**
 * Parses a parameter object, for use with the WaniKani API.
 *
 * @param params -- An object containing the query string parameters to parse.
 * @returns A query string of all the parameters, which can be added to a base URL.
 * @throws A `TypeError` if a non-object is passed to the function.
 * @category Base
 */
export function stringifyParameters(params: CollectionParameters): string {
  v.assert(CollectionParameters, params);
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
 * The common properties across all Reports from the WaniKani API
 *
 * @remarks This is a partial interface; most use cases involve using a reource that extends it.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#response-structure}
 *
 * @category Base
 * @category Reports
 */
export interface BaseReport {
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
}
export const BaseReport = v.object({
  data_updated_at: DatableString,
  object: v.literal("report"),
  url: v.string(),
});

/**
 * An error response returned by the WaniKani API.
 *
 * @category Base
 */
export interface ApiError {
  /**
   * An HTTP status code indicating the type of error.
   */
  code: number;

  /**
   * A message string that describes the error.
   */
  error: string;
}
export const ApiError = v.object({
  code: v.number(),
  error: v.string(),
});
