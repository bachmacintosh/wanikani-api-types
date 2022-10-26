import type { WKCollection, WKDatableString, WKSubjectTuple, WKSubjectType } from "../v20170710.js";
import type { Nullable } from "../internal/index.js";

/**
 * Study materials store user-specific notes and synonyms for a given subject. The records are created as soon as the
 * user enters any study information.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#study-materials}
 * @category Resources
 * @category Study Materials
 */
export interface WKStudyMaterial {
	/**
	 * A unique number identifying the study material.
	 */
	id: number;

	/**
	 * The kind of object returned.
	 */
	object: "study_material";

	/**
	 * Study material data
	 */
	data: WKStudyMaterialData;
}

interface WKStudyMaterialBaseData {
	/**
	 * Free form note related to the meaning(s) of the associated subject.
	 */
	meaning_note: string;

	/**
	 * Free form note related to the reading(s) of the associated subject.
	 */
	reading_note: string;
}

/**
 * A collection of study materials returned from the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 * @category Collections
 * @category Study Materials
 */
export interface WKStudyMaterialCollection extends WKCollection {
	/**
	 * An array of returned study materials
	 */
	data: WKStudyMaterial[];
}

/**
 * The payload sent to the WaniKani API when creating new study materials
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#create-a-study-material}
 * @category Payloads
 * @category Study Materials
 */
export interface WKStudyMaterialCreatePayload extends WKStudyMaterialUpdatePayload {
	/**
	 * Unique identifier of the associated subject.
	 */
	subject_id: number;
}

/**
 * Data for study material returned from the WaniKani API
 *
 * @category Study Materials
 */
export interface WKStudyMaterialData extends Nullable<WKStudyMaterialBaseData> {
	/**
	 * Timestamp when the study material was created.
	 */
	created_at: WKDatableString;

	/**
	 * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
	 */
	hidden: boolean;

	/**
	 * Synonyms for the meaning of the subject. These are used as additional correct answers during reviews.
	 */
	meaning_synonyms: string[];

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
 * Parameters that can be passed to the WaniKani API to filter a request for a Study Material Collection
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-study-materials}
 * @category Parameters
 * @category Study Materials
 */
export interface WKStudyMaterialParameters {
	/**
	 * Return study materials with a matching value in the `hidden` attribute
	 */
	hidden?: boolean;

	/**
	 * Only study material records where `data.id` matches one of the array values are returned.
	 */
	ids?: number[];

	/**
	 * Only study material records where `data.subject_id` matches one of the array values are returned.
	 */
	subject_ids?: number[];

	/**
	 * Only study material records where `data.subject_type` matches one of the array values are returned. Valid values
	 * are: `radical`, `kanji`, or `vocabulary`.
	 */
	subject_types?: WKSubjectTuple;

	/**
	 * Only study material records updated after this time are returned.
	 */
	updated_after?: Date | WKDatableString;
}

/**
 * The payload sent to the WaniKani API when updating study materials
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#update-a-study-material}
 * @category Payloads
 */
export interface WKStudyMaterialUpdatePayload extends Partial<WKStudyMaterialBaseData> {
	/**
	 * Synonyms for the meaning of the subject. These are used as additional correct answers during reviews.
	 */
	meaning_synonyms?: string[];
}
