import type {
	WKAssignment,
	WKCollection,
	WKCollectionParameters,
	WKDatableString,
	WKMaxSrsReviewStages,
	WKMaxSrsStages,
	WKResource,
	WKReviewStatistic,
} from "../v20170710.js";
import type { Range } from "../internal/index.js";

/**
 * A created review returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 * @category Resources
 * @category Reviews
 */
export interface WKCreatedReview extends WKResource {
	/**
	 * A unique number identifying the review.
	 */
	id: number;

	/**
	 * The kind of object returned.
	 */
	object: "review";

	/**
	 * Data for the created review.
	 * @see {@link https://docs.api.wanikani.com/20170710/#reviews}
	 */
	data: WKReviewData;

	/**
	 * The resources updated alongside creating the review.
	 */
	resources_updated: {
		/**
		 * The updated assignment upon creating the review.
		 * @see {@link https://docs.api.wanikani.com/20170710/#assignments}
		 */
		assignment: WKAssignment;

		/**
		 * The updated review statistic upon creating the review.
		 * @see {@link https://docs.api.wanikani.com/20170710/#review-statistics}
		 */
		review_statistic: WKReviewStatistic;
	};
}

/**
 * Reviews log all the correct and incorrect answers provided through the 'Reviews' section of WaniKani. Review records
 * are created when a user answers all the parts of a subject correctly once; some subjects have both meaning or reading
 * parts, and some only have one or the other. Note that reviews are not created for the quizzes in lessons.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#reviews}
 * @category Resources
 * @category Reviews
 */
export interface WKReview extends WKResource {
	/**
	 * A unique number identifying the review.
	 */
	id: number;

	/**
	 * The kind of object returned.
	 */
	object: "review";

	/**
	 * Data for the returned review.
	 */
	data: WKReviewData;
}

/**
 * A collection of reviews returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 * @category Collections
 * @category Reviews
 */
export interface WKReviewCollection extends WKCollection {
	/**
	 * An array of returned reviews.
	 */
	data: WKReview[];
}

/**
 * Review data shared between created and read reviews.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#reviews}
 * @category Data
 * @category Reviews
 */
export interface WKReviewData {
	/**
	 * Unique identifier of the associated assignment.
	 */
	assignment_id: number;

	/**
	 * Timestamp when the review was created.
	 */
	created_at: WKDatableString;

	/**
	 * The SRS stage interval calculated from the number of correct and incorrect answers, with valid values ranging
	 * from `1` to `9`.
	 */
	ending_srs_stage: Range<1, WKMaxSrsStages>;

	/**
	 * The number of times the user has answered the meaning incorrectly.
	 */
	incorrect_meaning_answers: number;

	/**
	 * The number of times the user has answered the reading incorrectly.
	 */
	incorrect_reading_answers: number;

	/**
	 * Unique identifier of the associated `spaced_repetition_system`.
	 */
	spaced_repetition_system_id: number;

	/**
	 * The starting SRS stage interval, with valid values ranging from `1` to `8`.
	 */
	starting_srs_stage: Range<1, WKMaxSrsReviewStages>;

	/**
	 * Unique identifier of the associated subject.
	 */
	subject_id: number;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Review Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-reviews}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Reviews
 */
export interface WKReviewParameters extends WKCollectionParameters {
	/**
	 * Only reviews where `data.assignment_id` matches one of the array values are returned.
	 */
	assignment_ids?: number[];

	/**
	 * Only reviews where `data.subject_id` matches one of the array values are returned.
	 */
	subject_ids?: number[];
}

/**
 * The base object used in the request to create a new review via the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 * @category Reviews
 */
interface WKReviewObjectdBase {
	/**
	 * Must be zero or a positive number. This is the number of times the meaning was answered incorrectly.
	 */
	incorrect_meaning_answers: number;

	/**
	 * Must be zero or a positive number. This is the number of times the reading was answered incorrectly. Note that
	 * subjects with a type of `radical` do not quiz on readings. Thus, set this value to `0`.
	 */
	incorrect_reading_answers: number;

	/**
	 * Timestamp when the review was completed. Defaults to the time of the request if omitted from the request body.
	 * Must be in the past, but after `assignment.available_at`.
	 */
	created_at?: Date | WKDatableString;
}

/**
 * The review object used in the request to create a new review via the WaniKani API by Assignment ID.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 * @category Reviews
 */
export interface WKReviewObjectWithAssignmentId extends WKReviewObjectdBase {
	/**
	 * Unique identifier of the assignment. This or `subject_id` must be set.
	 */
	assignment_id: number;

	/**
	 * The `subject_id` should not be set at the same time as `assignment_id`.
	 */
	subject_id?: never;
}

/**
 * The review object used in the request to create a new review via the WaniKani API by Subject ID.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 * @category Reviews
 */
export interface WKReviewObjectWithSubjectId extends WKReviewObjectdBase {
	/**
	 * The `assignment_id` should never be set at the same time as `subject_id`.
	 */
	assignment_id?: never;

	/**
	 * Unique identifier of the subject. This or `assignment_id` must be set.
	 */
	subject_id: number;
}

/**
 * The payload used in the request to create a new review via the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-review}
 * @category Payloads
 * @category Reviews
 */
export interface WKReviewPayload {
	/**
	 * A review object with either the `assignment_id` or `subject_id` specified.
	 */
	review: WKReviewObjectWithAssignmentId | WKReviewObjectWithSubjectId;
}
