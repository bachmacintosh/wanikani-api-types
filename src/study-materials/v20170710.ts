import * as v from "valibot";
import {
  BaseCollection,
  BaseResource,
  CollectionParameters,
  DatableString,
  SubjectTuple,
  SubjectType,
} from "../base/v20170710.js";

/**
 * Data found in all study materials whether they are being created/updated, or received from the WaniKani API.
 *
 * @category Study Materials
 * @remarks For creating study materials, use {@link StudyMaterialCreatePayload}; for updating study materials, use
 * {@link StudyMaterialUpdatePayload}.
 */
export interface StudyMaterialBaseData {
  /**
   * Free form note related to the meaning(s) of the associated subject.
   */
  meaning_note: string;

  /**
   * Synonyms for the meaning of the subject. These are used as additional correct answers during reviews.
   */
  meaning_synonyms: string[];

  /**
   * Free form note related to the reading(s) of the associated subject.
   */
  reading_note: string;
}
export const StudyMaterialBaseData = v.object({
  meaning_note: v.string(),
  meaning_synonyms: v.array(v.string()),
  reading_note: v.string(),
});

/**
 * Study materials store user-specific notes and synonyms for a given subject. The records are created as soon as the
 * user enters any study information.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#study-materials}
 * @category Resources
 * @category Study Materials
 */
export interface StudyMaterial extends BaseResource {
  /**
   * Data for the returned study material.
   */
  data: StudyMaterialBaseData & {
    /**
     * Timestamp when the study material was created.
     */
    created_at: DatableString;

    /**
     * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
     */
    hidden: boolean;

    /**
     * Unique identifier of the associated subject.
     */
    subject_id: number;

    /**
     * The type of the associated subject.
     */
    subject_type: SubjectType;
  };

  /**
   * A unique number identifying the study material.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "study_material";
}
export const StudyMaterial = v.object({
  ...BaseResource.entries,
  data: v.intersect([
    StudyMaterialBaseData,
    v.object({
      created_at: DatableString,
      hidden: v.boolean(),
      subject_id: v.number(),
      subject_type: SubjectType,
    }),
  ]),
  id: v.number(),
  object: v.literal("study_material"),
});

/**
 * A collection of study materials returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 * @category Collections
 * @category Study Materials
 */
export interface StudyMaterialCollection extends BaseCollection {
  /**
   * An array of returned study materials.
   */
  data: StudyMaterial[];
}
export const StudyMaterialCollection = v.object({
  ...BaseCollection.entries,
  data: v.array(StudyMaterial),
});

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Study Material Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Study Materials
 */
export interface StudyMaterialParameters extends CollectionParameters {
  /**
   * Return study materials with a matching value in the `hidden` attribute.
   */
  hidden?: boolean;

  /**
   * Only study material records where `data.subject_id` matches one of the array values are returned.
   */
  subject_ids?: number[];

  /**
   * Only study material records where `data.subject_type` matches one of the array values are returned.
   */
  subject_types?: SubjectTuple;
}
export const StudyMaterialParameters = v.object({
  ...CollectionParameters.entries,
  hidden: v.optional(v.boolean()),
  subject_ids: v.optional(v.array(v.number())),
  subject_types: v.optional(SubjectTuple),
});

/**
 * The payload sent to the WaniKani API when updating study materials.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#update-a-study-material}
 * @category Payloads
 * @category Study Materials
 */
export type StudyMaterialUpdatePayload = Partial<StudyMaterialBaseData>;
export const StudyMaterialUpdatePayload = v.partial(StudyMaterialBaseData);

/**
 * The payload sent to the WaniKani API when creating new study materials.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-study-material}
 * @category Payloads
 * @category Study Materials
 */
export interface StudyMaterialCreatePayload extends StudyMaterialUpdatePayload {
  /**
   * Unique identifier of the associated subject.
   */
  subject_id: number;
}
export const StudyMaterialCreatePayload = v.object({
  ...StudyMaterialUpdatePayload.entries,
  subject_id: v.number(),
});
