export {
	WK_API_REVISION,
	WK_MAX_LESSON_BATCH_SIZE,
	WK_MAX_LEVELS,
	WK_MAX_SRS_REVIEW_STAGES,
	WK_MAX_SRS_STAGES,
	WK_MIN_LESSON_BATCH_SIZE,
	WK_MIN_LEVELS,
	isWKDatableString,
	isWKLessonBatchSizeNumber,
	isWKLevel,
	isWKLevelArray,
	isWKSrsStageNumber,
	isWKSrsStageNumberArray,
	stringifyParameters,
} from "./base/v20170710.js";

export type {
	WKAssignment,
	WKAssignmentCollection,
	WKAssignmentData,
	WKAssignmentParameters,
	WKAssignmentPayload,
} from "./assignments/v20170710.js";

export type {
	WKApiRevision,
	WKCollection,
	WKCollectionParameters,
	WKDatableString,
	WKError,
	WKLessonBatchSizeNumber,
	WKLevel,
	WKMaxLessonBatchSize,
	WKMaxLevels,
	WKMaxSrsReviewStages,
	WKMaxSrsStages,
	WKMinLessonBatchSize,
	WKMinLevels,
	WKReport,
	WKResource,
	WKResourceType,
	WKSrsStageNumber,
	WKSubjectTuple,
	WKSubjectType,
} from "./base/v20170710.js";

export type {
	WKLevelProgression,
	WKLevelProgressionCollection,
	WKLevelProgressionData,
	WKLevelProgressionParameters,
} from "./level-progressions/v20170710.js";

export type { WKReset, WKResetCollection, WKResetData, WKResetParameters } from "./resets/v20170710.js";

export type {
	WKCreatedReview,
	WKReview,
	WKReviewCollection,
	WKReviewData,
	WKReviewObjectWithAssignmentId,
	WKReviewObjectWithSubjectId,
	WKReviewParameters,
	WKReviewPayload,
} from "./reviews/v20170710.js";

export type {
	WKReviewStatistic,
	WKReviewStatisticCollection,
	WKReviewStatisticData,
	WKReviewStatisticParameters,
} from "./review-statistics/v20170710.js";

export type {
	WKSpacedRepetitionSystem,
	WKSpacedRepetitionSystemCollection,
	WKSpacedRepetitionSystemData,
	WKSpacedRepetitionSystemParameters,
	WKSpacedRepetitionSystemStage,
} from "./spaced-repetition-systems/v20170710.js";

export type {
	WKStudyMaterial,
	WKStudyMaterialBaseData,
	WKStudyMaterialCollection,
	WKStudyMaterialCreatePayload,
	WKStudyMaterialData,
	WKStudyMaterialParameters,
	WKStudyMaterialUpdatePayload,
} from "./study-materials/v20170710.js";

export type {
	WKKanji,
	WKKanjiCollection,
	WKKanjiData,
	WKKanjiReading,
	WKRadical,
	WKRadicalCharacterImage,
	WKRadicalCharacterImagePngMetadata,
	WKRadicalCharacterImageSvgMetadata,
	WKRadicalCollection,
	WKRadicalData,
	WKSubject,
	WKSubjectAuxiliaryMeaning,
	WKSubjectCollection,
	WKSubjectData,
	WKSubjectMeaning,
	WKSubjectParameters,
	WKVocabulary,
	WKVocabularyCollection,
	WKVocabularyContextSentence,
	WKVocabularyData,
	WKVocabularyPronunciationAudio,
	WKVocabularyReading,
} from "./subjects/v20170710.js";

export type { WKSummary, WKSummaryData, WKSummaryLesson, WKSummaryReview } from "./summary/v20170710.js";

export type {
	WKUser,
	WKUserData,
	WKUserPreferences,
	WKUserPreferencesPayload,
	WKUserSubscription,
} from "./user/v20170710.js";

export type {
	WKVoiceActor,
	WKVoiceActorCollection,
	WKVoiceActorData,
	WKVoiceActorParameters,
} from "./voice-actors/v20170710.js";
