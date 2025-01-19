import * as v from "valibot";
import { describe, expect, test } from "vitest";
import { DatableString } from "../../src/base/v20170710";
import { ReviewStatisticParameters } from "../../src/review-statistics/v20170710";

describe("ReviewStatisticParameters", () => {
  test("Empty ReviewStatisticParameters", () => {
    const params1: ReviewStatisticParameters = {};
    expect(() => v.parse(ReviewStatisticParameters, params1)).not.toThrow();
  });
  test("ReviewStatisticParameters with empty arrays", () => {
    const params2: ReviewStatisticParameters = {
      ids: [],
      subject_ids: [],
    };
    expect(() => v.parse(ReviewStatisticParameters, params2)).not.toThrow();
  });
  test("ReviewStatisticParameters with many options filled", () => {
    const params3: ReviewStatisticParameters = {
      ids: [1, 2, 3],
      page_after_id: 1,
      page_before_id: 1,
      hidden: false,
      percentages_greater_than: 90,
      percentages_less_than: 100,
      subject_ids: [1, 2, 3],
      subject_types: ["kana_vocabulary", "vocabulary"],
    };
    expect(() => v.parse(ReviewStatisticParameters, params3)).not.toThrow();
  });
  test("ReviewStatisticParameters with Date objects", () => {
    const params4: ReviewStatisticParameters = {
      updated_after: new Date(),
    };
    expect(() => v.parse(ReviewStatisticParameters, params4)).not.toThrow();
  });
  test("ReviewStatisticParameters with DatableString properties", () => {
    const params5: ReviewStatisticParameters = {
      updated_after: v.parse(DatableString, new Date().toISOString()),
    };
    expect(() => v.parse(ReviewStatisticParameters, params5)).not.toThrow();
  });
});
