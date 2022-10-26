import type { WKDatableString, WKReport } from "../v20170710.js";

/**
 * The summary report contains currently available lessons and reviews and the reviews that will become available in the
 * next 24 hours, grouped by the hour.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 * @category Reports
 * @category Summary
 */
export interface WKSummary extends WKReport {
	/**
	 * Summary data
	 */
	data: WKSummaryData;
}

/**
 * Data for a summary report returned from the WaniKani API.
 *
 * @category Data
 * @category Summary
 */
export interface WKSummaryData {
	/**
	 * Details about subjects available for lessons.
	 */
	lessons: WKSummaryLesson[];

	/**
	 * Earliest date when the reviews are available. Is `null` when the user has no reviews scheduled.
	 */
	next_reviews_at: WKDatableString | null;

	/**
	 * Details about subjects available for reviews now and in the next 24 hours by the hour (total of 25 objects).
	 */
	reviews: WKSummaryReview[];
}

/**
 * Details about subjects available for lessons.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 * @category Summary
 */
export interface WKSummaryLesson {
	/**
	 * When the paired `subject_ids` are available for lessons. Always beginning of the current hour when the API endpoint
	 * is accessed.
	 */
	available_at: WKDatableString;

	/**
	 * Collection of unique identifiers for subjects.
	 */
	subject_ids: number[];
}

/**
 * Details about subjects available for reviews.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 * @category Summary
 */
export interface WKSummaryReview {
	/**
	 * When the paired `subject_ids` are available for reviews. All timestamps are the top of an hour.
	 */
	available_at: WKDatableString;

	/**
	 * Collection of unique identifiers for subjects.
	 */
	subject_ids: number[];
}
