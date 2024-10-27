import type {
  WKCollection,
  WKCollectionParameters,
  WKDatableString,
  WKLevel,
  WKResource,
  WKSrsStageNumber,
  WKSubjectTuple,
  WKSubjectType,
} from "../v20170710.js";

/**
 * Assignments contain information about a user's progress on a particular subject, including their current state and
 * timestamps for various progress milestones. Assignments are created when a user has passed all the components of the
 * given subject and the assignment is at or below their current level for the first time.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#assignments}
 * @category Assignments
 * @category Resources
 */
export interface WKAssignment extends WKResource {
  /**
   * Date for the returned assignment.
   */
  data: WKAssignmentData;

  /**
   * A unique number identifying the assignment.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "assignment";
}

/**
 * A collection of assignments returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 * @category Assignments
 * @category Collections
 */
export interface WKAssignmentCollection extends WKCollection {
  /**
   * An array of returned assignments.
   */
  data: WKAssignment[];
}

/**
 * Data for assignments returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#assignments}
 * @category Assignments
 * @category Data
 */
export interface WKAssignmentData {
  /**
   * When the related subject will be available in the user's review queue.
   */
  available_at: WKDatableString | null;

  /**
   * When the user reaches SRS stage 9 the first time.
   */
  burned_at: WKDatableString | null;

  /**
   * When the assignment was created.
   */
  created_at: WKDatableString;

  /**
   * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
   */
  hidden: boolean;

  /**
   * When the user reaches SRS stage `5` for the first time.
   */
  passed_at: WKDatableString | null;

  /**
   * When the subject is resurrected and placed back in the user's review queue.
   */
  resurrected_at: WKDatableString | null;

  /**
   * The current SRS stage interval. The interval range is determined by the related subject's Spaced Repetition
   * System.
   */
  srs_stage: WKSrsStageNumber;

  /**
   * When the user completes the lesson for the related subject.
   */
  started_at: WKDatableString | null;

  /**
   * Unique identifier of the associated subject.
   */
  subject_id: number;

  /**
   * The type of the associated subject, one of: `kanji`, `radical`, or `vocabulary`.
   */
  subject_type: WKSubjectType;

  /**
   * When the related subjects has its prerequisites satisfied and is made available in lessons.
   *
   * Prerequisites are:
   * * The subject components have reached SRS stage 5 once (they have been “passed”).
   * * The user's level is equal to or greater than the level of the assignment’s subject.
   */
  unlocked_at: WKDatableString | null;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for an
 * Assignment Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-assignments}
 * @see {@link stringifyParameters}
 * @category Assignments
 * @category Parameters
 */
export interface WKAssignmentParameters extends WKCollectionParameters {
  /**
   * Only assignments available at or after this time are returned.
   */
  available_after?: Date | WKDatableString;

  /**
   * Only assignments available at or before this time are returned.
   */
  available_before?: Date | WKDatableString;

  /**
   * When set to `true`, returns assignments that have a value in `data.burned_at`. Returns assignments with a `null`
   * `data.burned_at` if `false`.
   */
  burned?: boolean;

  /**
   * Return assignments with a matching value in the `hidden` attribute.
   */
  hidden?: boolean;

  /**
   * When set to `true`, returns assignments which are immediately available for lessons.
   */
  immediately_available_for_lessons?: boolean;

  /**
   * When set to `true`, returns assignments which are immediately available for review.
   */
  immediately_available_for_review?: boolean;

  /**
   * When set to `true`, returns assignments which are in the review state.
   */
  in_review?: boolean;

  /**
   * Only assignments where the associated subject level matches one of the array values are returned. Valid values
   * range from `1` to `60`.
   */
  levels?: WKLevel[];

  /**
   * Only assignments where `data.srs_stage` matches one of the array values are returned. Valid values range from `0`
   * to `9`.
   */
  srs_stages?: WKSrsStageNumber[];

  /**
   * When set to `true`, returns assignments that have a value in `data.started_at`. Returns assignments with a `null`
   * `data.started_at` if `false`.
   */
  started?: boolean;

  /**
   * Only assignments where `data.subject_id` matches one of the array values are returned.
   */
  subject_ids?: number[];

  /**
   * Only assignments where `data.subject_type` matches one of the array values are returned. Valid values are:
   * `radical`, `kanji`, or `vocabulary`.
   */
  subject_types?: WKSubjectTuple;

  /**
   * When set to true, returns assignments that have a value in `data.unlocked_at`. Returns assignments with a `null`
   * `data.unlocked_at` if `false`.
   */
  unlocked?: boolean;
}

/**
 * The optional payload used in the request to start a new assignment via the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#start-an-assignment}
 * @category Assignments
 * @category Payloads
 */
export interface WKAssignmentPayload {
  /**
   * Specify properties of the Assignment; currently only `started_at` is supported.
   */
  assignment: {
    /**
     * When the assignment was started. Must be greater than or equal to the assignment's `unlocked_at` date.
     */
    started_at?: Date | WKDatableString;
  };
}
