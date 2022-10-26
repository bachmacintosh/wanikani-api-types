export { isWKDatableString, stringifyParameters } from "./base/v20170710.js";

export type {
	WKAssignment,
	WKAssignmentCollection,
	WKAssignmentData,
	WKAssignmentParameters,
	WKAssignmentPayload,
	WKStartedAssignment,
	WKStartedAssignmentData,
	WKUpdatedAssignment,
	WKUpdatedAssignmentData,
} from "./assignments/v20170710.js";

export type {
	WKApiRevision,
	WKCollection,
	WKDatableString,
	WKError,
	WKMaxLessonBatchSize,
	WKMaxLevels,
	WKMaxSrsStages,
	WKMaxSrsStagesMinusOne,
	WKMinLessonBatchSize,
	WKMinLevels,
	WKParameters,
	WKReport,
	WKResource,
	WKResourceType,
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
