import type { WKCollection, WKCollectionParameters, WKDatableString, WKMaxLevels, WKResource } from "../v20170710.js";
import type { Range } from "../internal/index.js";

/**
 * Level progressions contain information about a user's progress through the WaniKani levels.
 *
 * A level progression is created when a user has met the prerequisites for leveling up, which are:
 *
 * * Reach a 90% passing rate on assignments for a user's current level with a `subject_type` of `kanji`. Passed
 * assignments have `data.passed` equal to `true` and a `data.passed_at` that's in the past.
 * * Have access to the level. Under `/user`, the `data.level` must be less than or equal to
 * `data.subscription.max_level_granted`.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#level-progressions}
 * @category Level Progressions
 * @category Resources
 */
export interface WKLevelProgression extends WKResource {
	/**
	 * A unique number identifying the level progression.
	 */
	id: number;

	/**
	 * The kind of object returned.
	 */
	object: "level_progression";

	/**
	 * Level Progression data
	 */
	data: WKLevelProgressionData;
}

/**
 * A collection of level progressions returned from the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-level-progressions}
 * @category Collections
 * @category Level Progressions
 */
export interface WKLevelProgressionCollection extends WKCollection {
	/**
	 * An array of returned level progressions
	 */
	data: WKLevelProgression[];
}

/**
 * Data for level progressions returned from the WaniKani API.
 *
 * @category Data
 * @category Level Progressions
 */
export interface WKLevelProgressionData {
	/**
	 * Timestamp when the user abandons the level. This is primarily used when the user initiates a reset.
	 */
	abandoned_at: WKDatableString | null;

	/**
	 * Timestamp when the user burns 100% of the assignments belonging to the associated subject's level.
	 */
	completed_at: WKDatableString | null;

	/**
	 * Timestamp when the level progression is created
	 */
	created_at: WKDatableString;

	/**
	 * The level of the progression, with possible values from `1` to `60`.
	 */
	level: Range<1, WKMaxLevels>;

	/**
	 * Timestamp, in ISO-8601 format, when the user passes at least 90% of the assignments with a type of `kanji`
	 * belonging to the associated subject's level.
	 */
	passed_at: WKDatableString | null;

	/**
	 * Timestamp when the user starts their first lesson of a subject belonging to the level.
	 */
	started_at: WKDatableString | null;

	/**
	 * Timestamp when the user can access lessons and reviews for the `level`.
	 */
	unlocked_at: WKDatableString | null;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Level Progression Collection
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-level-progressions}
 * @category Level Progressions
 * @category Parameters
 */
export type WKLevelProgressionParameters = WKCollectionParameters;
