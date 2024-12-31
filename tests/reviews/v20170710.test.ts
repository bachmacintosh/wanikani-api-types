import * as v from "valibot";
import { describe, expect, test } from "vitest";
import { ReviewParameters, ReviewPayload } from "../../src/reviews/v20170710";
import { DatableString } from "../../src/base/v20170710";

describe("Revision 20170710: Reviews", () => {
  test("ReviewParameters", () => {
    const params1: ReviewParameters = {};
    const params2: ReviewParameters = {
      ids: [],
      assignment_ids: [],
      subject_ids: [],
    };
    const params3: ReviewParameters = {
      ids: [1, 2, 3],
      assignment_ids: [1, 2, 3],
      subject_ids: [1, 2, 3],
      page_after_id: 1,
      page_before_id: 1,
    };
    const params4: ReviewParameters = {
      updated_after: new Date(),
    };
    const params5: ReviewParameters = {
      updated_after: v.parse(DatableString, new Date().toISOString()),
    };
    expect(() => v.parse(ReviewParameters, params1)).not.toThrow();
    expect(() => v.parse(ReviewParameters, params2)).not.toThrow();
    expect(() => v.parse(ReviewParameters, params3)).not.toThrow();
    expect(() => v.parse(ReviewParameters, params4)).not.toThrow();
    expect(() => v.parse(ReviewParameters, params5)).not.toThrow();
  });
  test("ReviewPayload", () => {
    const payload1: ReviewPayload = {
      review: {
        assignment_id: 1,
        created_at: new Date(),
        incorrect_meaning_answers: 0,
        incorrect_reading_answers: 0,
      },
    };
    const payload2: ReviewPayload = {
      review: {
        subject_id: 1,
        created_at: v.parse(DatableString, new Date().toISOString()),
        incorrect_meaning_answers: 0,
        incorrect_reading_answers: 0,
      },
    };
    expect(() => v.parse(ReviewPayload, payload1)).not.toThrow();
    expect(() => v.parse(ReviewPayload, payload2)).not.toThrow();
  });
});
