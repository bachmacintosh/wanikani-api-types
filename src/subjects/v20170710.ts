import * as v from "valibot";
import {
  BaseCollection,
  BaseResource,
  CollectionParameters,
  DatableString,
  Level,
  SubjectTuple,
} from "../base/v20170710.js";

/**
 * A subject's auxilliary meanings.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface SubjectAuxiliaryMeaning {
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
export const SubjectAuxiliaryMeaning = v.object({
  meaning: v.string(),
  type: v.picklist(["blacklist", "whitelist"]),
});

/**
 * Information pertaining to a subject's meaning.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface SubjectMeaning {
  /**
   * Indicates if the meaning is used to evaluate user input for correctness.
   */
  accepted_answer: boolean;

  /**
   * A singular subject meaning.
   */
  meaning: string;

  /**
   * Indicates priority in the WaniKani system.
   */
  primary: boolean;
}
export const SubjectMeaning = v.object({
  accepted_answer: v.boolean(),
  meaning: v.string(),
  primary: v.boolean(),
});

/**
 * The common properties of all subjects on WaniKani.
 *
 * @remarks
 * This only represents a partial structure of a subject, and it's highly recommended to use one of the child type
 * definitions that extend this type definition.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface SubjectBaseData {
  /**
   * Collection of auxiliary meanings.
   */
  auxiliary_meanings: SubjectAuxiliaryMeaning[];

  /**
   * Timestamp when the subject was created.
   */
  created_at: DatableString;

  /**
   * A URL pointing to the page on wanikani.com that provides detailed information about this subject.
   */
  document_url: string;

  /**
   * Timestamp when the subject was hidden, indicating associated assignments will no longer appear in lessons or
   * reviews and that the subject page is no longer visible on wanikani.com.
   */
  hidden_at: DatableString | null;

  /**
   * The position that the subject appears in lessons. Note that the value is scoped to the level of the subject, so
   * there are duplicate values across levels.
   */
  lesson_position: number;

  /**
   * The level of the subject, from `1` to `60`.
   */
  level: Level;

  /**
   * The subject's meaning mnemonic.
   */
  meaning_mnemonic: string;

  /**
   * The subject meanings.
   */
  meanings: SubjectMeaning[];

  /**
   * The string that is used when generating the document URL for the subject. Radicals use their meaning, downcased.
   * Kanji and vocabulary use their characters.
   */
  slug: string;

  /**
   * Unique identifier of the associated Spaced Repetition System.
   */
  spaced_repetition_system_id: number;
}
export const SubjectBaseData = v.object({
  auxiliary_meanings: v.array(SubjectAuxiliaryMeaning),
  created_at: DatableString,
  document_url: v.string(),
  hidden_at: v.union([DatableString, v.null()]),
  lesson_position: v.number(),
  level: Level,
  meaning_mnemonic: v.string(),
  meanings: v.array(SubjectMeaning),
  slug: v.string(),
  spaced_repetition_system_id: v.number(),
});

/**
 * An image representing a radical subject.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export type RadicalCharacterImage = {
  /**
   * The location of the image.
   */
  url: string;
} & (
  | {
      /**
       * The content type of the image.
       */
      content_type: "image/png";
      /**
       * Details about the image. Each `content_type` returns a uniquely structured object.
       */
      metadata: {
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
      };
    }
  | {
      /**
       * The content type of the image.
       */
      content_type: "image/svg+xml";

      /**
       * Details about the image. Each `content_type` returns a uniquely structured object.
       */
      metadata: {
        /**
         * The SVG asset contains built-in CSS styling.
         */
        inline_styles: boolean;
      };
    }
);
export const RadicalCharacterImage = v.intersect([
  v.object({
    url: v.string(),
  }),
  v.variant("content_type", [
    v.object({
      content_type: v.literal("image/svg+xml"),
      metadata: v.object({
        inline_styles: v.boolean(),
      }),
    }),
    v.object({
      content_type: v.literal("image/png"),
      metadata: v.object({
        color: v.string(),
        dimensions: v.string(),
        style_name: v.string(),
      }),
    }),
  ]),
]);

/**
 * Data returned only for radical subjects.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface RadicalData extends SubjectBaseData {
  /**
   * An array of numeric identifiers for the kanji that have the radical as a component.
   */
  amalgamation_subject_ids: number[];

  /**
   * A collection of images of the radical.
   */
  character_images: RadicalCharacterImage[];

  /**
   * Unlike kanji and vocabulary, radicals can have a null value for characters. Not all radicals have a UTF entry, so
   * the radical must be visually represented with an image instead.
   */
  characters: string | null;
}
export const RadicalData = v.object(
  v.entriesFromObjects([
    SubjectBaseData,
    v.object({
      amalgamation_subject_ids: v.array(v.number()),
      character_images: v.array(RadicalCharacterImage),
      characters: v.union([v.string(), v.null()]),
    }),
  ]),
);

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `kana_vocabulary`,
 * `kanji`, `radical`, and `vocabulary`. Note that any attributes called out for the specific subject type behaves
 * differently than the common attribute of the same name.
 *
 * This type asserts the subject type is a radical.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export interface Radical extends BaseResource {
  /**
   * Data for the returned radical.
   */
  data: RadicalData;

  /**
   * A unique number identifying the radical.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "radical";
}
export const Radical = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: RadicalData,
      id: v.number(),
      object: v.literal("radical"),
    }),
  ]),
);

/**
 * A collection of radical subjects returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface RadicalCollection extends BaseCollection {
  /**
   * An array of returned radical subjects.
   */
  data: Radical[];
}
export const RadicalCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Radical),
    }),
  ]),
);

/**
 * Information pertaining to a reading of a kanji subject.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface KanjiReading {
  /**
   * Indicates if the reading is used to evaluate user input for correctness.
   */
  accepted_answer: boolean;

  /**
   * Indicates priority in the WaniKani system.
   */
  primary: boolean;

  /**
   * A singular subject reading.
   */
  reading: string;

  /**
   * The kanji reading's classfication: `kunyomi`, `nanori`, or `onyomi`.
   */
  type: "kunyomi" | "nanori" | "onyomi";
}
export const KanjiReading = v.object({
  accepted_answer: v.boolean(),
  primary: v.boolean(),
  reading: v.string(),
  type: v.picklist(["kunyomi", "nanori", "onyomi"]),
});

/**
 * Data returned only for kanji subjects.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface KanjiData extends SubjectBaseData {
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
  readings: KanjiReading[];

  /**
   * An array of numeric identifiers for kanji which are visually similar to the kanji in question.
   */
  visually_similar_subject_ids: number[];
}
export const KanjiData = v.object(
  v.entriesFromObjects([
    SubjectBaseData,
    v.object({
      amalgamation_subject_ids: v.array(v.number()),
      characters: v.string(),
      component_subject_ids: v.array(v.number()),
      meaning_hint: v.union([v.string(), v.null()]),
      reading_hint: v.union([v.string(), v.null()]),
      reading_mnemonic: v.string(),
      readings: v.array(KanjiReading),
      visually_similar_subject_ids: v.array(v.number()),
    }),
  ]),
);

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `kana_vocabulary`,
 * `kanji`, `radical`, and `vocabulary`. Note that any attributes called out for the specific subject type behaves
 * differently than the common attribute of the same name.
 *
 * This type asserts the subject type is a kanji.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export interface Kanji extends BaseResource {
  /**
   * Data for the returned kanji.
   */
  data: KanjiData;

  /**
   * A unique number identifying the kanji.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "kanji";
}
export const Kanji = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: KanjiData,
      id: v.number(),
      object: v.literal("kanji"),
    }),
  ]),
);

/**
 * A collection of kanji subjects returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface KanjiCollection extends BaseCollection {
  /**
   * An array of returned kanji subjects.
   */
  data: Kanji[];
}
export const KanjiCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Kanji),
    }),
  ]),
);

/**
 * Japanese context sentences for vocabulary, with a corresponding English translation.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface VocabularyContextSentence {
  /**
   * English translation of the sentence.
   */
  en: string;

  /**
   * Japanese context sentence.
   */
  ja: string;
}
export const VocabularyContextSentence = v.object({
  en: v.string(),
  ja: v.string(),
});

/**
 * Information pertaining to pronunciation audio for a vocabulary subject.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface VocabularyPronunciationAudio {
  /**
   * The content type of the audio. Currently the API delivers `audio/mpeg`, `audio/ogg`, and `audio/webm`.
   */
  content_type: "audio/mpeg" | "audio/ogg" | "audio/webm";

  /**
   * Details about the pronunciation audio.
   */
  metadata: {
    /**
     * The gender of the voice actor.
     */
    gender: "female" | "male";

    /**
     * Vocabulary being pronounced in kana.
     */
    pronunciation: string;

    /**
     * A unique ID shared between same source pronunciation audio.
     */
    source_id: number;

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

  /**
   * The location of the audio.
   */
  url: string;
}
export const VocabularyPronunciationAudio = v.object({
  content_type: v.picklist(["audio/mpeg", "audio/ogg", "audio/webm"]),
  metadata: v.object({
    gender: v.picklist(["female", "male"]),
    pronunciation: v.string(),
    source_id: v.number(),
    voice_actor_id: v.number(),
    voice_actor_name: v.string(),
    voice_description: v.string(),
  }),
  url: v.string(),
});

/**
 * Information pertaining to a reading of a vocabulary subject..
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface VocabularyReading {
  /**
   * Indicates if the reading is used to evaluate user input for correctness.
   */
  accepted_answer: boolean;

  /**
   * Indicates priority in the WaniKani system.
   */
  primary: boolean;

  /**
   * A singular subject reading.
   */
  reading: string;
}
export const VocabularyReading = v.object({
  accepted_answer: v.boolean(),
  primary: v.boolean(),
  reading: v.string(),
});

/**
 * Data returned only for vocabulary subjects.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface VocabularyData extends SubjectBaseData {
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
  context_sentences: VocabularyContextSentence[];

  /**
   * Parts of speech.
   */
  parts_of_speech: string[];

  /**
   * A collection of pronunciation audio.
   */
  pronunciation_audios: VocabularyPronunciationAudio[];

  /**
   * The vocabulary's reading mnemonic.
   */
  reading_mnemonic: string;

  /**
   * Selected readings for the vocabulary.
   */
  readings: VocabularyReading[];
}
export const VocabularyData = v.object(
  v.entriesFromObjects([
    SubjectBaseData,
    v.object({
      characters: v.string(),
      component_subject_ids: v.array(v.number()),
      context_sentences: v.array(VocabularyContextSentence),
      parts_of_speech: v.array(v.string()),
      pronunciation_audios: v.array(VocabularyPronunciationAudio),
      reading_mnemonic: v.string(),
      readings: v.array(VocabularyReading),
    }),
  ]),
);

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `kana_vocabulary`,
 * `kanji`, `radical`, and `vocabulary`. Note that any attributes called out for the specific subject type behaves
 * differently than the common attribute of the same name.
 *
 * This type asserts the subject type is a vocabulary subject.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export interface Vocabulary extends BaseResource {
  /**
   * Data for the returned vocabulary.
   */
  data: VocabularyData;

  /**
   * A unique number identifying the vocabulary.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "vocabulary";
}
export const Vocabulary = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: VocabularyData,
      id: v.number(),
      object: v.literal("vocabulary"),
    }),
  ]),
);

/**
 * A collection of vocabulary subjects returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface VocabularyCollection extends BaseCollection {
  /**
   * An array of returned vocabulary subjects.
   */
  data: Vocabulary[];
}
export const VocabularyCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Vocabulary),
    }),
  ]),
);

/**
 * Data returned only for kana-only vocabulary subjects.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export interface KanaVocabularyData extends SubjectBaseData {
  /**
   * The UTF-8 characters for the subject, including kanji and hiragana.
   */
  characters: string;

  /**
   * A collection of context sentences.
   */
  context_sentences: VocabularyContextSentence[];

  /**
   * Parts of speech.
   */
  parts_of_speech: string[];

  /**
   * A collection of pronunciation audio.
   */
  pronunciation_audios: VocabularyPronunciationAudio[];
}
export const KanaVocabularyData = v.object(
  v.entriesFromObjects([
    SubjectBaseData,
    v.object({
      characters: v.string(),
      context_sentences: v.array(VocabularyContextSentence),
      parts_of_speech: v.array(v.string()),
      pronunciation_audios: v.array(VocabularyPronunciationAudio),
    }),
  ]),
);

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `kana_vocabulary`,
 * `kanji`, `radical`, and `vocabulary`. Note that any attributes called out for the specific subject type behaves
 * differently than the common attribute of the same name.
 *
 * This type asserts the subject type is a kana-only vocabulary subject.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export interface KanaVocabulary extends BaseResource {
  /**
   * Data for the returned kana-only vocabulary.
   */
  data: KanaVocabularyData;

  /**
   * A unique number identifying the kana-only vocabulary.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "kana_vocabulary";
}
export const KanaVocabulary = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: KanaVocabularyData,
      id: v.number(),
      object: v.literal("kana_vocabulary"),
    }),
  ]),
);

/**
 * A collection of kana-only vocabulary subjects returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface KanaVocabularyCollection extends BaseCollection {
  /**
   * An array of returned vocabulary subjects.
   */
  data: KanaVocabulary[];
}
export const KanaVocabularyCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(KanaVocabulary),
    }),
  ]),
);

/**
 * The exact structure of a subject depends on the subject type. The available subject types are `kana_vocabulary`,
 * `kanji`, `radical`, and `vocabulary`. Note that any attributes called out for the specific subject type behaves
 * differently than the common attribute of the same name.
 *
 * This type is for mixed or unknown subject types; it is a discriminated union based on the subject's `object` key.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Resources
 * @category Subjects
 */
export type Subject = BaseResource & {
  /**
   * A unique number identifying the subject.
   */
  id: number;
} & (
    | {
        /**
         * Data for the returned kana-only vocabulary.
         */
        data: KanaVocabularyData;

        /**
         * The kind of object returned.
         */
        object: "kana_vocabulary";
      }
    | {
        /**
         * Data for the returned kanji.
         */
        data: KanjiData;

        /**
         * The kind of object returned.
         */
        object: "kanji";
      }
    | {
        /**
         * Data for the returned radical.
         */
        data: RadicalData;

        /**
         * The kind of object returned.
         */
        object: "radical";
      }
    | {
        /**
         * Data for the returned vocabulary.
         */
        data: VocabularyData;

        /**
         * The kind of object returned.
         */
        object: "vocabulary";
      }
  );
export const Subject = v.intersect([
  BaseResource,
  v.object({
    id: v.number(),
  }),
  v.variant("object", [
    v.object({
      data: KanaVocabularyData,
      object: v.literal("kana_vocabulary"),
    }),
    v.object({
      data: KanjiData,
      object: v.literal("kanji"),
    }),
    v.object({
      data: RadicalData,
      object: v.literal("radical"),
    }),
    v.object({
      data: VocabularyData,
      object: v.literal("vocabulary"),
    }),
  ]),
]);

/**
 * A collection of subjects of mixed or unknown types returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @category Collections
 * @category Subjects
 */
export interface SubjectCollection extends BaseCollection {
  /**
   * An array of returned subjects of mixed or unknown type.
   */
  data: Subject[];
}
export const SubjectCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(Subject),
    }),
  ]),
);

/**
 * A set of regular expression literals that match to various markup patterns in a Subject's Meaning/Reading Mnemonics
 * and Hints.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#subjects}
 * @category Subjects
 */
export const WK_SUBJECT_MARKUP_MATCHERS = {
  /**
   * A regular expression literal that matches to Japanese text surrounded by `<ja>` tags.
   */
  ja: /<ja>(?<innerText>.+?)<\/ja>/gu,

  /**
   * A regular expression literal that matches to Japanese kanji surrounded by `<kanji>` tags.
   */
  kanji: /<kanji>(?<innerText>.+?)<\/kanji>/gu,

  /**
   * A regular expression literal that matches to a subject meaning surrounded by `<meaning>` tags.
   */
  meaning: /<meaning>(?<innerText>.+?)<\/meaning>/gu,

  /**
   * A regular expression literal that matches to WaniKani Radical names surrounded by `<radical>` tags.
   */
  radical: /<radical>(?<innerText>.+?)<\/radical>/gu,

  /**
   * A regular expression literal that matches to a kanji/vocabulary reading surrounded by `<reading>` tags.
   */
  reading: /<reading>(?<innerText>.+?)<\/reading>/gu,

  /**
   * A regular expression literal that matches to WaniKani Vocabulary surrounded by `<vocabulary>` tags.
   */
  vocabulary: /<vocabulary>(?<innerText>.+?)<\/vocabulary>/gu,
} as const;

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Subject Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-subjects}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Subjects
 */
export interface SubjectParameters extends CollectionParameters {
  /**
   * Return subjects which are or are not hidden from the user-facing application.
   */
  hidden?: boolean;

  /**
   * Return subjects at the specified levels.
   */
  levels?: Level[];

  /**
   * Return subjects of the specified slug.
   */
  slugs?: string[];

  /**
   * Return subjects of the specified types.
   */
  types?: SubjectTuple;
}
export const SubjectParameters = v.object(
  v.entriesFromObjects([
    CollectionParameters,
    v.object({
      hidden: v.optional(v.boolean()),
      levels: v.optional(v.array(Level)),
      slugs: v.optional(v.array(v.string())),
      types: v.optional(SubjectTuple),
    }),
  ]),
);
