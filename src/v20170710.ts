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
	validateParameters,
	validatePayload,
} from "./base/v20170710.js";

export { WKRequestFactory } from "./requests/v20170710.js";

export { WK_SUBJECT_MARKUP_MATCHERS } from "./subjects/v20170710.js";

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
	WKCollectionParametersMap,
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
	WKPayloadMap,
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

export type {
	WKAssignmentRequests,
	WKLevelProgressionRequests,
	WKRequest,
	WKRequestFactoryInit,
	WKRequestGetOptions,
	WKRequestHeaders,
	WKRequestPostPutOptions,
	WKResetRequests,
	WKReviewRequests,
	WKReviewStatisticRequests,
	WKSpacedRepetitionSystemRequests,
	WKStudyMaterialRequests,
	WKSubjectRequests,
	WKSummaryRequests,
	WKUserRequests,
	WKVoiceActorRequests,
} from "./requests/v20170710.js";

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
