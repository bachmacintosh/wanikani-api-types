import * as v from "valibot";
import {
  ReviewStatistic,
  ReviewStatisticCollection,
  ReviewStatisticParameters,
} from "../../src/review-statistics/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("ReviewStatistic", () => {
  testFor("Real ReviewStatistic", ({ reviewStatistic }) => {
    expect(() => v.assert(ReviewStatistic, reviewStatistic)).not.toThrow();
  });
});

describe("ReviewStatisticCollection", () => {
  testFor("Real ReviewStatisticCollection", ({ reviewStatisticCollection }) => {
    expect(() => v.assert(ReviewStatisticCollection, reviewStatisticCollection)).not.toThrow();
  });
});

describe("ReviewStatisticParameters", () => {
  testFor("Empty ReviewStatisticParameters", ({ emptyParams }) => {
    expect(() => v.assert(ReviewStatisticParameters, emptyParams)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with empty arrays", ({ reviewStatisticParamsWithEmptyArrays }) => {
    expect(() => v.assert(ReviewStatisticParameters, reviewStatisticParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with many options filled", ({ reviewStatisticParamsWithManyOptions }) => {
    expect(() => v.assert(ReviewStatisticParameters, reviewStatisticParamsWithManyOptions)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with Date objects", ({ reviewStatisticParamsWithDates }) => {
    expect(() => v.assert(ReviewStatisticParameters, reviewStatisticParamsWithDates)).not.toThrow();
  });
  testFor("ReviewStatisticParameters with DatableString properties", ({ reviewStatisticParamsWithDatableStrings }) => {
    expect(() => v.assert(ReviewStatisticParameters, reviewStatisticParamsWithDatableStrings)).not.toThrow();
  });
});
