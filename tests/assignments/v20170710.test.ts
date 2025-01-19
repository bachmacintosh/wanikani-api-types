import * as v from "valibot";
import { expect, describe, test } from "vitest";
import { AssignmentParameters, AssignmentPayload } from "../../src/assignments/v20170710";
import { DatableString } from "../../src/base/v20170710";

describe("AssignmentParameters", () => {
  test("Empty AssignmentParameters", () => {
    const params1: AssignmentParameters = {};
    expect(() => v.parse(AssignmentParameters, params1)).not.toThrow();
  });
  test("AssignmentParameters with empty arrays", () => {
    const params2: AssignmentParameters = {
      ids: [],
      levels: [],
      srs_stages: [],
      subject_ids: [],
    };
    expect(() => v.parse(AssignmentParameters, params2)).not.toThrow();
  });
  test("AssignmentParameters with many options filled", () => {
    const params3: AssignmentParameters = {
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
    expect(() => v.parse(AssignmentParameters, params3)).not.toThrow();
  });
  test("AssignmentParameters with Date objects", () => {
    const params4: AssignmentParameters = {
      available_after: new Date(),
      available_before: new Date(),
      updated_after: new Date(),
    };
    expect(() => v.parse(AssignmentParameters, params4)).not.toThrow();
  });
  test("AssignmentParameters with DatableString properties", () => {
    const params5: AssignmentParameters = {
      available_after: v.parse(DatableString, new Date().toISOString()),
      available_before: v.parse(DatableString, new Date().toISOString()),
      updated_after: v.parse(DatableString, new Date().toISOString()),
    };
    expect(() => v.parse(AssignmentParameters, params5)).not.toThrow();
  });
});

describe("AssignmentPayload", () => {
  test("AssignmentPayload with empty assignment property", () => {
    const payload1: AssignmentPayload = {
      assignment: {},
    };
    expect(() => v.parse(AssignmentPayload, payload1)).not.toThrow();
  });
  test("AssignmentPayload with JS Date started_at property", () => {
    const payload2: AssignmentPayload = {
      assignment: {
        started_at: new Date(),
      },
    };
    expect(() => v.parse(AssignmentPayload, payload2)).not.toThrow();
  });
  test("AssignmentPayload with DatableString started_at property", () => {
    const payload3: AssignmentPayload = {
      assignment: {
        started_at: v.parse(DatableString, "2024-12-27T15:32:23.000Z"),
      },
    };
    expect(() => v.parse(AssignmentPayload, payload3)).not.toThrow();
  });
});
