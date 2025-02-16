import * as v from "valibot";
import { type CollectionParameters, DatableString } from "../../src/base/v20170710";
import { test } from "vitest";

const emptyParams: CollectionParameters = {};

const assignmentData = {
  created_at: "2017-10-22T15:41:43.861883Z",
  subject_id: 8761,
  subject_type: "radical",
  srs_stage: 9,
  unlocked_at: "2021-07-22T21:03:22.905689Z",
  started_at: "2021-07-30T15:11:42.594913Z",
  passed_at: "2021-08-01T04:32:27.017606Z",
  burned_at: "2022-01-20T20:03:37.269028Z",
  available_at: null,
  resurrected_at: null,
  hidden: false,
};

const assignment = {
  id: 85041695,
  object: "assignment",
  url: "https://api.wanikani.com/v2/assignments/85041695",
  data_updated_at: "2025-01-22T18:06:08.895692Z",
  data: assignmentData,
};

const assignmentCollection = {
  object: "collection",
  url: "https://api.wanikani.com/v2/assignments",
  pages: {
    per_page: 500,
    next_url: "https://api.wanikani.com/v2/assignments?page_after_id=87485638",
    previous_url: null,
  },
  total_count: 6055,
  data_updated_at: "2025-02-15T22:19:50.167435Z",
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
  subject_types: ["kana_vocabulary", "vocabulary"],
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
  emptyParams,
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
