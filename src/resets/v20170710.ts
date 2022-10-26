import type { WKCollection, WKDatableString, WKMaxLevels, WKResource } from "../v20170710.js";
import type { Range } from "../internal/index.js";

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
export interface WKReset extends WKResource {
	/**
	 * A unique number identifying the reset.
	 */
	id: number;

	/**
	 * The kind of object returned.
	 */
	object: "reset";

	/**
	 * Reset data
	 */
	data: WKResetData;
}

/**
 * A collection of resets returned from the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 * @category Collections
 * @category Resets
 */
export interface WKResetCollection extends WKCollection {
	/**
	 * An array of returned resets.
	 */
	data: WKReset[];
}

/**
 * Data for resets returned from the WaniKani API.
 *
 * @category Data
 * @category Resets
 */
export interface WKResetData {
	/**
	 * Timestamp when the user confirmed the reset.
	 */
	confirmed_at: WKDatableString | null;

	/**
	 * Timestamp when the reset was created.
	 */
	created_at: WKDatableString;

	/**
	 * The user's level before the reset, from `1` to `60`
	 */
	original_level: Range<1, WKMaxLevels>;

	/**
	 * The user's level after the reset, from `1` to `60`. It must be less than or equal to `original_level`.
	 */
	target_level: Range<1, WKMaxLevels>;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Reset Collection
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-resets}
 * @category Parameters
 * @category Resets
 */
export interface WKResetParameters {
	/**
	 * Only resets where `data.id` matches one of the array values are returned.
	 */
	ids?: number[];

	/**
	 * Only resets updated after this time are returned.
	 */
	updated_after?: Date | WKDatableString;
}
