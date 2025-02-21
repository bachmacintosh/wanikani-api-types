import * as v from "valibot";
import {
  type CollectionParameters,
  DatableString,
  MAX_LEVEL,
  MIN_LEVEL,
  SubjectTuple,
} from "../../src/base/v20170710.js";
import { test } from "vitest";

// Base

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const apiRevision = "20170710" as const;

const dateTimeUtcString = "2022-10-23T15:17:38.828455Z";

const dateTimeOffsetString = "2022-10-23T15:17:38.828455+09:00";

const dateIsoString = new Date().toISOString();

const levels = Array<number>(MAX_LEVEL)
  .fill(MIN_LEVEL)
  .map((item, itemIdx) => item + itemIdx);

const resourceTypes = [
  "assignment" as const,
  "level_progression" as const,
  "reset" as const,
  "review_statistic" as const,
  "review" as const,
  "spaced_repetition_system" as const,
  "study_material" as const,
  "user" as const,
  "voice_actor" as const,
];

const subjectTypes = ["kana_vocabulary" as const, "kanji" as const, "radical" as const, "vocabulary" as const];

// @ts-expect-error -- Intentionally empty tuple needed a type and can't use unknown[] with vitest fixtures
const emptySubjectTuple: SubjectTuple = [];

const partialSubjectTuple: SubjectTuple = ["kanji"];

const fullSubjectTuple: SubjectTuple = ["kana_vocabulary", "kanji", "radical", "vocabulary"];

const repeatedSubjectTuple = ["kana_vocabulary", "kanji", "radical", "kanji", "vocabulary", "radical"];

const emptyParams: CollectionParameters = {};

const collectionParamsWithEmptyArrays = {
  ids: [],
};

const collectionParamsWithManyOptions = {
  ids: [1, 2, 3],
  page_after_id: 1,
  page_before_id: 1,
};

const collectionParamsWithDates = {
  updated_after: new Date(),
};

const collectionParamsWithDatableStrings = {
  updated_after: v.parse(DatableString, new Date().toISOString()),
};

// Assignments

const assignmentData = {
  created_at: v.parse(DatableString, "2017-10-22T15:41:43.861883Z"),
  subject_id: 8761,
  subject_type: "radical" as const,
  srs_stage: 9,
  unlocked_at: v.parse(DatableString, "2021-07-22T21:03:22.905689Z"),
  started_at: v.parse(DatableString, "2021-07-30T15:11:42.594913Z"),
  passed_at: v.parse(DatableString, "2021-08-01T04:32:27.017606Z"),
  burned_at: v.parse(DatableString, "2022-01-20T20:03:37.269028Z"),
  available_at: null,
  resurrected_at: null,
  hidden: false,
};

const assignment = {
  id: 85041695,
  object: "assignment" as const,
  url: "https://api.wanikani.com/v2/assignments/85041695",
  data_updated_at: v.parse(DatableString, "2025-01-22T18:06:08.895692Z"),
  data: assignmentData,
};

const assignmentCollection = {
  object: "collection" as const,
  url: "https://api.wanikani.com/v2/assignments",
  pages: {
    per_page: 500,
    next_url: "https://api.wanikani.com/v2/assignments?page_after_id=87485638",
    previous_url: null,
  },
  total_count: 6055,
  data_updated_at: v.parse(DatableString, "2025-02-15T22:19:50.167435Z"),
  data: [assignment],
};

const assignmentParamsWithEmptyArrays = {
  ids: [],
  levels: [],
  srs_stages: [],
  subject_ids: [],
};

const assignmentParamsWithManyOptions = {
  ids: [1, 2, 3],
  page_after_id: 1,
  page_before_id: 1,
  burned: true,
  hidden: false,
  immediately_available_for_lessons: true,
  immediately_available_for_review: false,
  in_review: true,
  levels: [1, 2, 3],
  srs_stages: [1, 2, 3],
  started: true,
  subject_ids: [1, 2, 3],
  subject_types: v.parse(SubjectTuple, ["kana_vocabulary", "vocabulary"]),
  unlocked: true,
};

const assignmentParamsWithDates = {
  available_after: new Date(),
  available_before: new Date(),
  updated_after: new Date(),
};

const assignmentParamsWithDatableStrings = {
  available_after: v.parse(DatableString, new Date().toISOString()),
  available_before: v.parse(DatableString, new Date().toISOString()),
  updated_after: v.parse(DatableString, new Date().toISOString()),
};

const assignmentPayloadWithNoTime = {
  assignment: {},
};

const assignmentPayloadWithDate = {
  assignment: {
    started_at: new Date(),
  },
};

const assignmentPayloadWithDatableString = {
  assignment: {
    started_at: v.parse(DatableString, "2024-12-27T15:32:23.000Z"),
  },
};

export const testFor = test.extend({
  apiRevision,
  dateTimeUtcString,
  dateTimeOffsetString,
  dateIsoString,
  levels,
  resourceTypes,
  subjectTypes,
  emptySubjectTuple,
  partialSubjectTuple,
  fullSubjectTuple,
  repeatedSubjectTuple,
  emptyParams,
  collectionParamsWithEmptyArrays,
  collectionParamsWithManyOptions,
  collectionParamsWithDates,
  collectionParamsWithDatableStrings,
  assignmentData,
  assignment,
  assignmentCollection,
  assignmentParamsWithEmptyArrays,
  assignmentParamsWithManyOptions,
  assignmentParamsWithDates,
  assignmentParamsWithDatableStrings,
  assignmentPayloadWithNoTime,
  assignmentPayloadWithDate,
  assignmentPayloadWithDatableString,
});
