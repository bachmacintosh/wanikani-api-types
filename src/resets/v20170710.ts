import * as v from "valibot";
import { BaseCollection, BaseResource, CollectionParameters, DatableString, Level } from "../base/v20170710.js";

/**
 * Data for resets returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#resets}
 * @category Data
 * @category Resets
 */
export interface ResetData {
  /**
   * Timestamp when the user confirmed the reset.
   */
  confirmed_at: DatableString | null;

  /**
   * Timestamp when the reset was created.
   */
  created_at: DatableString;

  /**
   * The user's level before the reset, from `1` to `60`.
   */
  original_level: Level;

  /**
   * The user's level after the reset, from `1` to `60`. It must be less than or equal to `original_level`.
   */
  target_level: Level;
}
export const ResetData = v.object({
  confirmed_at: v.union([DatableString, v.null()]),
  created_at: DatableString,
  original_level: Level,
  target_level: Level,
});

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
export interface Reset extends BaseResource {
  /**
   * Data for the returned reset.
   */
  data: ResetData;

  /**
   * A unique number identifying the reset.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "reset";
}
export const Reset = v.object({
  ...BaseResource.entries,
  data: ResetData,
  id: v.number(),
  object: v.literal("reset"),
});

/**
 * A collection of resets returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 * @category Collections
 * @category Resets
 */
export interface ResetCollection extends BaseCollection {
  /**
   * An array of returned resets.
   */
  data: Reset[];
}
export const ResetCollection = v.object({
  ...BaseCollection.entries,
  data: v.array(Reset),
});

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Reset Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Resets
 */
export type ResetParameters = CollectionParameters;
export const ResetParameters = CollectionParameters;
