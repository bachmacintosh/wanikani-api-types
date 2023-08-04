import type { WKCollection, WKCollectionParameters, WKDatableString, WKLevel, WKResource } from "../v20170710.js";

/**
 * Users can reset their progress back to any level at or below their current level. When they reset to a particular
 * level, all of the assignments and review_statistics at that level or higher are set back to their default state.
 *
 * Resets contain information about when those resets happen, the starting level, and the target level.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#resets}
 * @category Resets
 * @category Resources
 */
interface WKReset extends WKResource {
  /**
   * Data for the returned reset.
   */
  data: WKResetData;

  /**
   * A unique number identifying the reset.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "reset";
}

/**
 * A collection of resets returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 * @category Collections
 * @category Resets
 */
interface WKResetCollection extends WKCollection {
  /**
   * An array of returned resets.
   */
  data: WKReset[];
}

/**
 * Data for resets returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#resets}
 * @category Data
 * @category Resets
 */
interface WKResetData {
  /**
   * Timestamp when the user confirmed the reset.
   */
  confirmed_at: WKDatableString | null;

  /**
   * Timestamp when the reset was created.
   */
  created_at: WKDatableString;

  /**
   * The user's level before the reset, from `1` to `60`.
   */
  original_level: WKLevel;

  /**
   * The user's level after the reset, from `1` to `60`. It must be less than or equal to `original_level`.
   */
  target_level: WKLevel;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Reset Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Resets
 */
type WKResetParameters = WKCollectionParameters;

export type { WKReset, WKResetCollection, WKResetData, WKResetParameters };
