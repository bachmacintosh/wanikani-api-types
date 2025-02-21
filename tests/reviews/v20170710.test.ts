import * as v from "valibot";
import { ReviewParameters, ReviewPayload } from "../../src/reviews/v20170710.js";
import { describe, expect, test } from "vitest";
import { DatableString } from "../../src/base/v20170710.js";

describe("ReviewParameters", () => {
  test("Empty ReviewParameters", () => {
    const params1: ReviewParameters = {};
    expect(() => v.parse(ReviewParameters, params1)).not.toThrow();
  });
  test("ReviewParameters with empty arrays", () => {
    const params2: ReviewParameters = {
      ids: [],
      assignment_ids: [],
      subject_ids: [],
    };
    expect(() => v.parse(ReviewParameters, params2)).not.toThrow();
  });
  test("ReviewParameters with many options filled", () => {
    const params3: ReviewParameters = {
      ids: [1, 2, 3],
      assignment_ids: [1, 2, 3],
      subject_ids: [1, 2, 3],
      page_after_id: 1,
      page_before_id: 1,
    };
    expect(() => v.parse(ReviewParameters, params3)).not.toThrow();
  });
  test("ReviewParameters with Date objects", () => {
    const params4: ReviewParameters = {
      updated_after: new Date(),
    };
    expect(() => v.parse(ReviewParameters, params4)).not.toThrow();
  });
  test("ReviewParameters with DatableString properties", () => {
    const params5: ReviewParameters = {
      updated_after: v.parse(DatableString, new Date().toISOString()),
    };
    expect(() => v.parse(ReviewParameters, params5)).not.toThrow();
  });
});

describe("ReviewPayload", () => {
  test("ReviewPayload with Assignment ID and JS Date", () => {
    const payload1: ReviewPayload = {
      review: {
        assignment_id: 1,
        created_at: new Date(),
        incorrect_meaning_answers: 0,
        incorrect_reading_answers: 0,
      },
    };
    expect(() => v.parse(ReviewPayload, payload1)).not.toThrow();
  });
  test("ReviewPayload with Assignment ID and DatableString", () => {
    const payload2: ReviewPayload = {
      review: {
        assignment_id: 1,
        created_at: v.parse(DatableString, new Date().toISOString()),
        incorrect_meaning_answers: 0,
        incorrect_reading_answers: 0,
      },
    };
    expect(() => v.parse(ReviewPayload, payload2)).not.toThrow();
  });
  test("ReviewPayload with Subject ID and JS Date", () => {
    const payload3: ReviewPayload = {
      review: {
        subject_id: 1,
        created_at: new Date(),
        incorrect_meaning_answers: 0,
        incorrect_reading_answers: 0,
      },
    };
    expect(() => v.parse(ReviewPayload, payload3)).not.toThrow();
  });
  test("ReviewPayload with Subject ID and DatableString", () => {
    const payload4: ReviewPayload = {
      review: {
        subject_id: 1,
        created_at: v.parse(DatableString, new Date().toISOString()),
        incorrect_meaning_answers: 0,
        incorrect_reading_answers: 0,
      },
    };

    expect(() => v.parse(ReviewPayload, payload4)).not.toThrow();
  });
});
