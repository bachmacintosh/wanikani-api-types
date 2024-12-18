import * as v from "valibot";
import type { DatableString, WKCollection, WKCollectionParameters, WKResource } from "../base/v20170710.js";

/**
 * A valid WaniKani Spaced Repetition System (SRS) Stage Number, based on the known SRS' on WaniKani and its API.
 *
 * @category Spaced Repetition Systems
 */
export type SpacedRepetitionSystemStageNumber = v.Brand<"SpacedRepetitionSystemStageNumber"> & number;
const MinSrsStage = 0;
const MaxSrsReviewStage = 8;
const MaxSrsStage = 9;
export const SpacedRepetitionSystemStageNumber = v.pipe(
  v.number(),
  v.minValue(MinSrsStage),
  v.maxValue(MaxSrsStage),
  v.brand("SpacedRepetitionSystemStageNumber"),
);

/**
 * The minimum SRS Stage Number used in WaniKani's SRS; exported for use in lieu of a Magic Number.
 *
 * @category Spaced Repetition Systems
 */
export const MIN_SRS_STAGE: SpacedRepetitionSystemStageNumber = v.parse(SpacedRepetitionSystemStageNumber, MinSrsStage);

/**
 * The maximum SRS Stage Number used in WaniKani's reviews; exported for use in lieu of a Magic Number.
 *
 * @category Spaced Repetition Systems
 */
export const MAX_SRS_REVIEW_STAGE: SpacedRepetitionSystemStageNumber = v.parse(
  SpacedRepetitionSystemStageNumber,
  MaxSrsReviewStage,
);

/**
 * The maximum SRS Stage Number used in WaniKani's SRS; exported for use in lieu of a Magic Number.
 *
 * @category Spaced Repetition Systems
 */
export const MAX_SRS_STAGE: SpacedRepetitionSystemStageNumber = v.parse(SpacedRepetitionSystemStageNumber, MaxSrsStage);

/**
 * Available spaced repetition systems used for calculating `srs_stage` changes to Assignments and Reviews. Has
 * relationship with Subjects.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 * @category Resources
 * @category Spaced Repetition Systems
 */
export interface WKSpacedRepetitionSystem extends WKResource {
  /**
   * Data for the return Spaced Repetition System.
   */
  data: WKSpacedRepetitionSystemData;

  /**
   * A unique number identifying the Spaced Repetition System.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "spaced_repetition_system";
}

/**
 * A collection of Spaced Repetition Systems returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 * @category Collections
 * @category Spaced Repetition Systems
 */
export interface WKSpacedRepetitionSystemCollection extends WKCollection {
  /**
   * An array of returned Spaced Repetition Systems.
   */
  data: WKSpacedRepetitionSystem[];
}

/**
 * Data for a Spaced Repetition System returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 * @category Data
 * @category Spaced Repetition Systems
 */
export interface WKSpacedRepetitionSystemData {
  /**
   * `position` of the burning stage.
   */
  burning_stage_position: SpacedRepetitionSystemStageNumber;

  /**
   * Timestamp when the `spaced_repetition_system` was created.
   */
  created_at: DatableString;

  /**
   * Details about the spaced repetition system.
   */
  description: string;

  /**
   * The name of the spaced repetition system.
   */
  name: string;

  /**
   * `position` of the passing stage.
   */
  passing_stage_position: SpacedRepetitionSystemStageNumber;

  /**
   * A collection of stages.
   */
  stages: WKSpacedRepetitionSystemStage[];

  /**
   * `position` of the starting stage.
   */
  starting_stage_position: SpacedRepetitionSystemStageNumber;

  /**
   * `position` of the unlocking stage.
   */
  unlocking_stage_position: SpacedRepetitionSystemStageNumber;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Spaced Repetition System Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-spaced-repetition-systems}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Spaced Repetition Systems
 */
export type WKSpacedRepetitionSystemParameters = WKCollectionParameters;

/**
 * An individual Spaced Repetition System (SRS) Stage.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#spaced-repetition-systems}
 * @category Spaced Repetition Systems
 */
export interface WKSpacedRepetitionSystemStage {
  /**
   * The length of time added to the time of review registration, adjusted to the beginning of the hour.
   */
  interval: number | null;

  /**
   * Unit of time. Can be the following: `milliseconds`, `seconds`, `minutes`, `hours`, `days`, and `weeks`.
   */
  interval_unit: "days" | "hours" | "milliseconds" | "minutes" | "seconds" | "weeks" | null;

  /**
   * The position of the stage within the continuous order.
   */
  position: SpacedRepetitionSystemStageNumber;
}
