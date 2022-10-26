import type {
	WKCollection,
	WKDatableString,
	WKMaxLevels,
	WKResource,
	WKSubjectTuple,
	WKSubjectType,
} from "../v20170710.js";
import type { Range } from "../internal/index.js";

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `radical`, `kanji`, and
 * `vocabulary`. Note that any attributes called out for the specific subject type behaves differently than the common
 * attribute of the same name.
 *
 * This type asserts the subject type is a kanji, and provides better type assertions requiring less type checking in
 * code.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export interface WKKanji extends WKSubject {
	/**
	 * The kind of object returned.
	 */
	object: "kanji";

	/**
	 * Kanji data.
	 */
	data: WKKanjiData;
}

/**
 * A collection of kanji subjects returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface WKKanjiCollection extends WKSubjectCollection {
	/**
	 * An array of returned kanji subjects.
	 */
	data: WKKanji[];
}

/**
 * Data returned only for kanji subjects.
 *
 * @category Data
 * @category Subjects
 */
export interface WKKanjiData extends WKSubjectData {
	/**
	 * An array of numeric identifiers for the vocabulary that have the kanji as a component.
	 */
	amalgamation_subject_ids: number[];

	/**
	 * The UTF-8 characters for the subject, including kanji and hiragana.
	 */
	characters: string;

	/**
	 * An array of numeric identifiers for the radicals that make up this kanji. Note that these are the subjects that
	 * must have passed assignments in order to unlock this subject's assignment.
	 */
	component_subject_ids: number[];

	/**
	 * Meaning hint for the kanji.
	 */
	meaning_hint: string | null;

	/**
	 * Reading hint for the kanji.
	 */
	reading_hint: string | null;

	/**
	 * The kanji's reading mnemonic.
	 */
	reading_mnemonic: string;

	/**
	 * Selected readings for the kanji.
	 */
	readings: WKKanjiReading[];

	/**
	 * An array of numeric identifiers for kanji which are visually similar to the kanji in question.
	 */
	visually_similar_subject_ids: number[];

	/**
	 * Kanji subjects will never have a `character_images` property defined.
	 */
	character_images?: never;

	/**
	 * Kanji subjects will never have a `context_sentences` property defined.
	 */
	context_sentences?: never;

	/**
	 * Kanji subjects will never have a `parts_of_speech` property defined.
	 */
	parts_of_speech?: never;

	/**
	 * Kanji subjects will never have a `pronunciation_audios` property defined.
	 */
	pronunciation_audios?: never;
}

/**
 * Information pertaining to a reading of a kanji subject.
 *
 * @category Subjects
 */
export interface WKKanjiReading {
	/**
	 * A singular subject reading.
	 */
	reading: string;

	/**
	 * Indicates priority in the WaniKani system.
	 */
	primary: boolean;

	/**
	 * Indicates if the reading is used to evaluate user input for correctness.
	 */
	accepted_answer: boolean;

	/**
	 * The kanji reading's classfication: `kunyomi`, `nanori`, or `onyomi`.
	 */
	type: "kunyomi" | "nanori" | "onyomi";
}

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `radical`, `kanji`, and
 * `vocabulary`. Note that any attributes called out for the specific subject type behaves differently than the common
 * attribute of the same name.
 *
 * This type asserts the subject type is a radical, and provides better type assertions requiring less type checking in
 * code.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export interface WKRadical extends WKSubject {
	/**
	 * The kind of object returned.
	 */
	object: "radical";

	/**
	 * Radical data.
	 */
	data: WKRadicalData;
}

/**
 * An image representing a radical subject.
 *
 * @category Subjects
 */
export interface WKRadicalCharacterImage {
	/**
	 * The location of the image.
	 */
	url: string;

	/**
	 * The content type of the image. Currently the API delivers `image/png` and `image/svg+xml`.
	 */
	content_type: "image/png" | "image/svg+xml";

	/**
	 * Details about the image. Each `content_type` returns a uniquely structured object.
	 */
	metadata: WKRadicalCharacterImagePngMetadata | WKRadicalCharacterImageSvgMetadata;
}

/**
 * Character image metadata for `image/png` type images.
 *
 * @category Subjects
 */
export interface WKRadicalCharacterImagePngMetadata {
	/**
	 * Color of the asset in hexadecimal
	 */
	color: string;

	/**
	 * Dimension of the asset in pixels
	 */
	dimensions: string;

	/**
	 * A name descriptor
	 */
	style_name: string;

	/**
	 * A character image of type `image/png` will never have its `inline_styles` property defined.
	 */
	inline_styles?: never;
}

/**
 * Character image metadata for `image/svg+xml` type images.
 *
 * @category Subjects
 */
export interface WKRadicalCharacterImageSvgMetadata {
	/**
	 * The SVG asset contains built-in CSS styling
	 */
	inline_styles: boolean;

	/**
	 * A character image of type `image/svg+xml` will never have its `color` property defined.
	 */
	color?: never;

	/**
	 * A character image of type `image/svg+xml` will never have its `dimensions` property defined.
	 */
	dimensions?: never;

	/**
	 * A character image of type `image/svg+xml` will never have its `style_name` property defined.
	 */
	style_name?: never;
}

/**
 * A collection of kanji subjects returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface WKRadicalCollection extends WKSubjectCollection {
	/**
	 * An array of returned radical subjects.
	 */
	data: WKRadical[];
}

/**
 * Data returned only for radical subjects.
 *
 * @category Data
 * @category Subjects
 */
export interface WKRadicalData extends WKSubjectData {
	/**
	 * An array of numeric identifiers for the kanji that have the radical as a component.
	 */
	amalgamation_subject_ids: number[];

	/**
	 * A collection of images of the radical.
	 */
	character_images: WKRadicalCharacterImage[];

	/**
	 * Radical subjects will never have a `component_subject_ids` property defined.
	 */
	component_subject_ids?: never;

	/**
	 * Radical subjects will never have a `context_sentences` property defined.
	 */
	context_sentences?: never;

	/**
	 * Radical subjects will never have a `meaning_hint` property defined.
	 */
	meaning_hint?: never;

	/**
	 * Radical subjects will never have a `parts_of_speech` property defined.
	 */
	parts_of_speech?: never;

	/**
	 * Radical subjects will never have a `pronunciation_audios` property defined.
	 */
	pronunciation_audios?: never;

	/**
	 * Radical subjects will never have a `reading_hint` property defined.
	 */
	reading_hint?: never;

	/**
	 * Radical subjects will never have a `reading_mnemonic` property defined.
	 */
	reading_mnemonic?: never;

	/**
	 * Radical subjects will never have a `readings` property defined.
	 */
	readings?: never;

	/**
	 * Radical subjects will never have a `visually_similar_subject_ids` property defined.
	 */
	visually_similar_subject_ids?: never;
}

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `radical`, `kanji`, and
 * `vocabulary`. Note that any attributes called out for the specific subject type behaves differently than the common
 * attribute of the same name.
 *
 * This type is for mixed or unknown subject types, and some items will require type checking in code.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export interface WKSubject extends WKResource {
	/**
	 * A unique number identifying the subject.
	 */
	id: number;

	/**
	 * The kind of object returned.
	 */
	object: WKSubjectType;

	/**
	 * Subject data.
	 */
	data: WKKanjiData | WKRadicalData | WKVocabularyData;
}

/**
 * A subject's auxilliary meanings.
 *
 * @category Subjects
 */
export interface WKSubjectAuxiliaryMeaning {
	/**
	 * A singular subject meaning.
	 */
	meaning: string;

	/**
	 * Either `whitelist` or `blacklist`. When evaluating user input, whitelisted meanings are used to match for
	 * correctness. Blacklisted meanings are used to match for incorrectness.
	 */
	type: "blacklist" | "whitelist";
}

/**
 * A collection of subjects of mixed or unknown types returned from the WaniKani API
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface WKSubjectCollection extends WKCollection {
	/**
	 * An array of returned subjects of mixed or unknown type.
	 */
	data: WKSubject[];
}

/**
 * The common properties of all subjects on WaniKani.
 *
 * @remarks
 * This only represents a partial structure of a subject, and it's highly recommended to use one of the child type
 * definitions that extend this type definition.
 *
 * @category Data
 * @category Subjects
 */
export interface WKSubjectData {
	/**
	 * Collection of auxiliary meanings.
	 */
	auxiliary_meanings: WKSubjectAuxiliaryMeaning[];

	/**
	 * The UTF-8 characters for the subject, including kanji and hiragana.
	 *
	 * Unlike kanji and vocabulary, radicals can have a null value for `characters`. Not all radicals have a UTF entry,
	 * so the radical must be visually represented with an image instead.
	 */
	characters: string | null;

	/**
	 * Timestamp when the subject was created.
	 */
	created_at: WKDatableString;

	/**
	 * A URL pointing to the page on wanikani.com that provides detailed information about this subject.
	 */
	document_url: string;

	/**
	 * Timestamp when the subject was hidden, indicating associated assignments will no longer appear in lessons or
	 * reviews and that the subject page is no longer visible on wanikani.com.
	 */
	hidden_at: WKDatableString | null;

	/**
	 * The position that the subject appears in lessons. Note that the value is scoped to the level of the subject, so
	 * there are duplicate values across levels.
	 */
	lesson_position: number;

	/**
	 * The level of the subject, from `1` to `60`.
	 */
	level: Range<1, WKMaxLevels>;

	/**
	 * The subject's meaning mnemonic.
	 */
	meaning_mnemonic: string;

	/**
	 * The subject meanings.
	 */
	meanings: WKSubjectMeaning[];

	/**
	 * The string that is used when generating the document URL for the subject. Radicals use their meaning, downcased.
	 * Kanji and vocabulary use their characters.
	 */
	slug: string;

	/**
	 * Unique identifier of the associated `spaced_repetition_system`.
	 */
	spaced_repetition_system_id: number;
}

/**
 * Information pertaining to a subject's meaning.
 *
 * @category Subjects
 */
export interface WKSubjectMeaning {
	/**
	 * A singular subject meaning.
	 */
	meaning: string;

	/**
	 * Indicates priority in the WaniKani system.
	 */
	primary: boolean;

	/**
	 * Indicates if the meaning is used to evaluate user input for correctness.
	 */
	accepted_answer: boolean;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Subject Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Parameters
 * @category Subjects
 */
export interface WKSubjectParameters {
	/**
	 * Only subjects where `data.id` matches one of the array values are returned.
	 */
	ids?: number[];

	/**
	 * Return subjects of the specified types.
	 */
	types?: WKSubjectTuple;

	/**
	 * Return subjects of the specified slug.
	 */
	slugs?: string[];

	/**
	 * Return subjects at the specified levels.
	 */
	levels?: Range<1, WKMaxLevels>[];

	/**
	 * Return subjects which are or are not hidden from the user-facing application.
	 */
	hidden?: boolean;

	/**
	 * Only subjects updated after this time are returned.
	 */
	updated_after?: Date | WKDatableString;
}

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `radical`, `kanji`, and
 * `vocabulary`. Note that any attributes called out for the specific subject type behaves differently than the common
 * attribute of the same name.
 *
 * This type asserts the subject type is a vocabulary subject, and provides better type assertions requiring less type
 * checking in code.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export interface WKVocabulary extends WKSubject {
	/**
	 * The kind of object returned.
	 */
	object: "vocabulary";

	/**
	 * Radical data.
	 */
	data: WKVocabularyData;
}

/**
 * A collection of vocabulary subjects returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface WKVocabularyCollection extends WKSubjectCollection {
	/**
	 * An array of returned vocabulary subjects.
	 */
	data: WKVocabulary[];
}

/**
 * Japanese context sentences for vocabulary, with a corresponding English translation.
 *
 * @category Subjects
 */
export interface WKVocabularyContextSentence {
	/**
	 * English translation of the sentence
	 */
	en: string;

	/**
	 * Japanese context sentence
	 */
	ja: string;
}

/**
 * Data returned only for vocabulary subjects.
 *
 * @category Data
 * @category Subjects
 */
export interface WKVocabularyData extends WKSubjectData {
	/**
	 * The UTF-8 characters for the subject, including kanji and hiragana.
	 */
	characters: string;

	/**
	 * An array of numeric identifiers for the kanji that make up this vocabulary. Note that these are the subjects that
	 * must be have passed assignments in order to unlock this subject's assignment.
	 */
	component_subject_ids: number[];

	/**
	 * A collection of context sentences.
	 */
	context_sentences: WKVocabularyContextSentence[];

	/**
	 * Parts of speech.
	 */
	parts_of_speech: string[];

	/**
	 * A collection of pronunciation audio.
	 */
	pronunciation_audios: WKVocabularyPronunciationAudio[];

	/**
	 * The vocabulary's reading mnemonic.
	 */
	reading_mnemonic: string;

	/**
	 * Selected readings for the vocabulary.
	 */
	readings: WKVocabularyReading[];

	/**
	 * Vocabulary subjects will never have an `amalgamation_subject_ids` property defined.
	 */
	amalgamation_subject_ids?: never;

	/**
	 * Vocabulary subjects will never have a `character_images` property defined.
	 */
	character_images?: never;

	/**
	 * Vocabulary subjects will never have a `meaning_hint` property defined.
	 */
	meaning_hint?: never;

	/**
	 * Vocabulary subjects will never have a `reading_hint` property defined.
	 */
	reading_hint?: never;

	/**
	 * Vocabulary subjects will never have a `visually_similar_subject_ids` property defined.
	 */
	visually_similar_subject_ids?: never;
}

/**
 * Information pertaining to pronunciation audio for a subject.
 *
 * @category Subjects
 */
export interface WKVocabularyPronunciationAudio {
	/**
	 * The location of the audio.
	 */
	url: string;

	/**
	 * The content type of the audio. Currently the API delivers `audio/mpeg` and `audio/ogg`.
	 */
	content_type: "audio/mpeg" | "audio/ogg";

	/**
	 * Details about the pronunciation audio.
	 */
	metadata: {
		/**
		 * The gender of the voice actor.
		 */
		gender: "female" | "male";

		/**
		 * A unique ID shared between same source pronunciation audio.
		 */
		source_id: number;

		/**
		 * Vocabulary being pronounced in kana.
		 */
		pronunciation: string;

		/**
		 * A unique ID belonging to the voice actor.
		 */
		voice_actor_id: number;

		/**
		 * Humanized name of the voice actor.
		 */
		voice_actor_name: string;

		/**
		 * Description of the voice.
		 */
		voice_description: string;
	};
}

/**
 * Information pertaining to a reading of a vocabulary subject..
 *
 * @category Subjects
 */
export interface WKVocabularyReading {
	/**
	 * A singular subject reading.
	 */
	reading: string;

	/**
	 * Indicates priority in the WaniKani system.
	 */
	primary: boolean;

	/**
	 * Indicates if the reading is used to evaluate user input for correctness.
	 */
	accepted_answer: boolean;

	/**
	 * Vocabulary readings will never have a reading `type`.
	 */
	type?: never;
}
