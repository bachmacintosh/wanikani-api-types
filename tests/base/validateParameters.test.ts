import { expect, it } from "@jest/globals";
import type { WKAssignmentParameters } from "../../src/assignments/v20170710";
import type { WKLevelProgressionParameters } from "../../src/level-progressions/v20170710";
import type { WKResetParameters } from "../../src/resets/v20170710";
import type { WKReviewParameters } from "../../src/reviews/v20170710";
import type { WKReviewStatisticParameters } from "../../src/review-statistics/v20170710";
import type { WKSpacedRepetitionSystemParameters } from "../../src/spaced-repetition-systems/v20170710";
import type { WKStudyMaterialParameters } from "../../src/study-materials/v20170710";
import type { WKSubjectParameters } from "../../src/subjects/v20170710";
import type { WKUserPreferencesPayload } from "../../src/user/v20170710";
import type { WKVoiceActorParameters } from "../../src/voice-actors/v20170710";
import { validateParameters } from "../../src/base/v20170710";

const assignmentParams: Required<WKAssignmentParameters> = {
  available_after: new Date(),
  available_before: new Date(),
  burned: true,
  hidden: true,
  ids: [1],
  immediately_available_for_lessons: true,
  immediately_available_for_review: true,
  in_review: true,
  levels: [1],
  page_after_id: 1,
  page_before_id: 1,
  srs_stages: [1],
  started: true,
  subject_ids: [1],
  subject_types: ["kanji"],
  unlocked: true,
  updated_after: new Date(),
};
const levelProgressionParams: Required<WKLevelProgressionParameters> = {
  ids: [1],
  page_after_id: 1,
  page_before_id: 1,
  updated_after: new Date(),
};
const resetParams: Required<WKResetParameters> = {
  ids: [1],
  page_after_id: 1,
  page_before_id: 1,
  updated_after: new Date(),
};
const reviewParams: Required<WKReviewParameters> = {
  assignment_ids: [1],
  ids: [1],
  page_after_id: 1,
  page_before_id: 1,
  subject_ids: [1],
  updated_after: new Date(),
};
const reviewStatisticParams: Required<WKReviewStatisticParameters> = {
  hidden: true,
  ids: [1],
  page_after_id: 1,
  page_before_id: 1,
  percentages_greater_than: 1,
  percentages_less_than: 1,
  subject_ids: [1],
  subject_types: ["kanji"],
  updated_after: new Date(),
};
const srsParams: Required<WKSpacedRepetitionSystemParameters> = {
  ids: [1],
  page_after_id: 1,
  page_before_id: 1,
  updated_after: new Date(),
};
const studyMaterialParams: Required<WKStudyMaterialParameters> = {
  hidden: true,
  ids: [1],
  page_after_id: 1,
  page_before_id: 1,
  subject_ids: [1],
  subject_types: ["kanji"],
  updated_after: new Date(),
};
const subjectParams: Required<WKSubjectParameters> = {
  hidden: true,
  ids: [1],
  levels: [1],
  page_after_id: 1,
  page_before_id: 1,
  slugs: [""],
  types: ["kanji"],
  updated_after: new Date(),
};
const voiceActorParams: Required<WKVoiceActorParameters> = {
  ids: [1],
  page_after_id: 1,
  page_before_id: 1,
  updated_after: new Date(),
};

it("Successfully validates Assignment Parameters", () => {
  expect(validateParameters("Assignment", assignmentParams)).toBe(undefined);
});

it("Successfully validates Level Progression Parameters", () => {
  expect(validateParameters("Level Progression", levelProgressionParams)).toBe(undefined);
});

it("Successfully validates Reset Parameters", () => {
  expect(validateParameters("Reset", resetParams)).toBe(undefined);
});

it("Successfully validates Review Parameters", () => {
  expect(validateParameters("Review", reviewParams)).toBe(undefined);
});

it("Successfully validates Review Statistic Parameters", () => {
  expect(validateParameters("Review Statistic", reviewStatisticParams)).toBe(undefined);
});

it("Successfully validates Spaced Repetition System (SRS) Parameters", () => {
  expect(validateParameters("Spaced Repetition System", srsParams)).toBe(undefined);
});

it("Successfully validates Study Material Parameters", () => {
  expect(validateParameters("Study Material", studyMaterialParams)).toBe(undefined);
});

it("Successfully validates Subject Parameters", () => {
  expect(validateParameters("Subject", subjectParams)).toBe(undefined);
});

it("Successfully validates Voice Actor Parameters", () => {
  expect(validateParameters("Voice Actor", voiceActorParams)).toBe(undefined);
});

it("Throws errors on mismatched parameters", () => {
  expect(() => validateParameters("Assignment", reviewParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Assignment Collections\./u,
  );
  expect(() => validateParameters("Level Progression", assignmentParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Level Progression Collections\./u,
  );
  expect(() => validateParameters("Reset", assignmentParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Reset Collections\./u,
  );
  expect(() => validateParameters("Review", assignmentParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Review Collections\./u,
  );
  expect(() => validateParameters("Review Statistic", assignmentParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Review Statistic Collections\./u,
  );
  expect(() => validateParameters("Spaced Repetition System", assignmentParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Spaced Repetition System Collections\./u,
  );
  expect(() => validateParameters("Study Material", assignmentParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Study Material Collections\./u,
  );
  expect(() => validateParameters("Subject", assignmentParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Subject Collections\./u,
  );
  expect(() => validateParameters("Voice Actor", assignmentParams)).toThrow(
    /Parameter "(?<name>\w+?)" is not valid for Voice Actor Collections\./u,
  );
});
