import type {
	WKCollection,
	WKCollectionParameters,
	WKDatableString,
	WKResource,
	WKSubjectTuple,
	WKSubjectType,
} from "../v20170710.js";

/**
 * Review statistics summarize the activity recorded in reviews. They contain sum the number of correct and incorrect
 * answers for both meaning and reading. They track current and maximum streaks of correct answers. They store the
 * overall percentage of correct answers versus total answers.
 *
 * A review statistic is created when the user has done their first review on the related subject.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#review-statistics}
 * @category Resources
 * @category Review Statistics
 */
export interface WKReviewStatistic extends WKResource {
	/**
	 * A unique number identifying the review statistic.
	 */
	id: number;

	/**
	 * The kind of object returned.
	 */
	object: "review_statistic";

	/**
	 * Review Statistic data
	 */
	data: WKReviewStatisticData;
}

/**
 * A collection of review statistics returned from the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-review-statistics}
 * @category Collections
 * @category Review Statistics
 */
export interface WKReviewStatisticCollection extends WKCollection {
	/**
	 * An array of returned review statistics
	 */
	data: WKReviewStatistic[];
}

/**
 * Data for a review statistic returned from the WaniKani API
 *
 * @category Data
 * @category Review Statistics
 */
export interface WKReviewStatisticData {
	/**
	 * Timestamp when the review statistic was created.
	 */
	created_at: WKDatableString;

	/**
	 * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
	 */
	hidden: boolean;

	/**
	 * Total number of correct answers submitted for the meaning of the associated subject.
	 */
	meaning_correct: number;

	/**
	 * The current, uninterrupted series of correct answers given for the meaning of the associated subject.
	 */
	meaning_current_streak: number;

	/**
	 * Total number of incorrect answers submitted for the meaning of the associated subject.
	 */
	meaning_incorrect: number;

	/**
	 * The longest, uninterrupted series of correct answers ever given for the meaning of the associated subject.
	 */
	meaning_max_streak: number;

	/**
	 * The overall correct answer rate by the user for the subject, including both meaning and reading.
	 */
	percentage_correct: number;

	/**
	 * Total number of correct answers submitted for the reading of the associated subject.
	 */
	reading_correct: number;

	/**
	 * The current, uninterrupted series of correct answers given for the reading of the associated subject.
	 */
	reading_current_streak: number;

	/**
	 * Total number of incorrect answers submitted for the reading of the associated subject.
	 */
	reading_incorrect: number;

	/**
	 * The longest, uninterrupted series of correct answers ever given for the reading of the associated subject.
	 */
	reading_max_streak: number;

	/**
	 * Unique identifier of the associated subject.
	 */
	subject_id: number;

	/**
	 * The type of the associated subject, one of: `kanji`, `radical`, or `vocabulary`.
	 */
	subject_type: WKSubjectType;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Review Statistic Collection
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-review-statistics}
 * @category Parameters
 * @category Review Statistics
 */
export interface WKReviewStatisticParameters extends WKCollectionParameters {
	/**
	 * Return review statistics with a matching value in the `hidden` attribute
	 */
	hidden?: boolean;

	/**
	 * Return review statistics where the `percentage_correct` is greater than the value.
	 */
	percentages_greater_than?: number;

	/**
	 * Return review statistics where the `percentage_correct` is less than the value.
	 */
	percentages_less_than?: number;

	/**
	 * Only review statistics where `data.subject_id` matches one of the array values are returned.
	 */
	subject_ids?: number[];

	/**
	 * Only review statistics where `data.subject_type` matches one of the array values are returned. Valid values are:
	 * `radical`, `kanji`, or `vocabulary`.
	 */
	subject_types?: WKSubjectTuple;
}
