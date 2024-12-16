import type { DatableString, WKReport } from "../base/v20170710.js";

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
   * Data for the Summary report.
   */
  data: WKSummaryData;
}

/**
 * Data for the Summary report returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
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
  next_reviews_at: DatableString | null;

  /**
   * Details about subjects available for reviews now and in the next 24 hours by the hour (total of 25 objects).
   */
  reviews: WKSummaryReview[];
}

/**
 * Details about subjects listed as available for lessons in the Summary report.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 * @category Summary
 */
export interface WKSummaryLesson {
  /**
   * When the paired `subject_ids` are available for lessons. Always beginning of the current hour when the API endpoint
   * is accessed.
   */
  available_at: DatableString;

  /**
   * Collection of unique identifiers for subjects.
   */
  subject_ids: number[];
}

/**
 * Details about subjects listed as available for reviews in the Summary report.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#summary}
 * @category Summary
 */
export interface WKSummaryReview {
  /**
   * When the paired `subject_ids` are available for reviews. All timestamps are the top of an hour.
   */
  available_at: DatableString;

  /**
   * Collection of unique identifiers for subjects.
   */
  subject_ids: number[];
}
