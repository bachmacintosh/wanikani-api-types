/*
This file exports all the types available in the recommended API revision. Thereby, things MAY break in the future.
Try sticking to imports from a specific revision.
*/

export { isWKDatableString, stringifyParameters } from "./v20170710.js";

export type {
	WKApiRevision,
	WKAssignment,
	WKAssignmentCollection,
	WKAssignmentData,
	WKAssignmentParameters,
	WKAssignmentPayload,
	WKCollection,
	WKCreatedReview,
	WKDatableString,
	WKError,
	WKKanji,
	WKKanjiCollection,
	WKKanjiData,
	WKKanjiReading,
	WKLevelProgression,
	WKLevelProgressionCollection,
	WKLevelProgressionData,
	WKLevelProgressionParameters,
	WKMaxLessonBatchSize,
	WKMaxLevels,
	WKMaxSrsStages,
	WKMaxSrsStagesMinusOne,
	WKMinLessonBatchSize,
	WKMinLevels,
	WKParameters,
	WKRadical,
	WKRadicalCharacterImage,
	WKRadicalCharacterImagePngMetadata,
	WKRadicalCharacterImageSvgMetadata,
	WKRadicalCollection,
	WKRadicalData,
	WKReport,
	WKReset,
	WKResetCollection,
	WKResetData,
	WKResetParameters,
	WKResource,
	WKResourceType,
	WKReview,
	WKReviewCollection,
	WKReviewData,
	WKReviewObjectWithAssignmentId,
	WKReviewObjectWithSubjectId,
	WKReviewParameters,
	WKReviewPayload,
	WKReviewStatistic,
	WKReviewStatisticCollection,
	WKReviewStatisticData,
	WKReviewStatisticParameters,
	WKSpacedRepetitionSystem,
	WKSpacedRepetitionSystemCollection,
	WKSpacedRepetitionSystemData,
	WKSpacedRepetitionSystemParameters,
	WKSpacedRepetitionSystemStage,
	WKStartedAssignment,
	WKStartedAssignmentData,
	WKStudyMaterial,
	WKStudyMaterialCollection,
	WKStudyMaterialCreatePayload,
	WKStudyMaterialData,
	WKStudyMaterialParameters,
	WKStudyMaterialUpdatePayload,
	WKSubject,
	WKSubjectAuxiliaryMeaning,
	WKSubjectCollection,
	WKSubjectData,
	WKSubjectMeaning,
	WKSubjectParameters,
	WKSubjectTuple,
	WKSubjectType,
	WKSummary,
	WKSummaryData,
	WKSummaryLesson,
	WKSummaryReview,
	WKUpdatedAssignment,
	WKUpdatedAssignmentData,
	WKUser,
	WKUserData,
	WKUserPreferences,
	WKUserPreferencesPayload,
	WKUserSubscription,
	WKVocabulary,
	WKVocabularyCollection,
	WKVocabularyContextSentence,
	WKVocabularyData,
	WKVocabularyPronunciationAudio,
	WKVocabularyReading,
	WKVoiceActor,
	WKVoiceActorCollection,
	WKVoiceActorData,
	WKVoiceActorParameters,
} from "./v20170710.js";
