import type {
	WKCollection,
	WKCollectionParameters,
	WKDatableString,
	WKResource,
	WKSubjectTuple,
	WKSubjectType,
} from "../v20170710.js";

/**
 * Study materials store user-specific notes and synonyms for a given subject. The records are created as soon as the
 * user enters any study information.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#study-materials}
 * @category Resources
 * @category Study Materials
 */
export interface WKStudyMaterial extends WKResource {
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

/**
 * Data found in all study materials whether they are being created/updated, or received from the WaniKani API
 *
 * @category Data
 * @category Study Materials
 * @remarks For creating study materials, use {@link WKStudyMaterialCreatePayload}; for updating study materials, use
 * {@link WKStudyMaterialUpdatePayload}; for study materials received from the API, use {@link WKStudyMaterialData}
 */
export interface WKStudyMaterialBaseData {
	/**
	 * Free form note related to the meaning(s) of the associated subject.
	 */
	meaning_note: string | null;

	/**
	 * Free form note related to the reading(s) of the associated subject.
	 */
	reading_note: string | null;

	/**
	 * Synonyms for the meaning of the subject. These are used as additional correct answers during reviews.
	 */
	meaning_synonyms: string[];
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
 * @category Data
 * @category Study Materials
 */
export interface WKStudyMaterialData extends WKStudyMaterialBaseData {
	/**
	 * Timestamp when the study material was created.
	 */
	created_at: WKDatableString;

	/**
	 * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
	 */
	hidden: boolean;

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
export interface WKStudyMaterialParameters extends WKCollectionParameters {
	/**
	 * Return study materials with a matching value in the `hidden` attribute
	 */
	hidden?: boolean;

	/**
	 * Only study material records where `data.subject_id` matches one of the array values are returned.
	 */
	subject_ids?: number[];

	/**
	 * Only study material records where `data.subject_type` matches one of the array values are returned. Valid values
	 * are: `radical`, `kanji`, or `vocabulary`.
	 */
	subject_types?: WKSubjectTuple;
}

/**
 * The payload sent to the WaniKani API when updating study materials
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#update-a-study-material}
 * @category Payloads
 * @category Study Materials
 */
export type WKStudyMaterialUpdatePayload = Partial<WKStudyMaterialBaseData>;
