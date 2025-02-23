import type {
  ReviewStatistic,
  ReviewStatisticCollection,
  ReviewStatisticParameters,
} from "../../src/review-statistics/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("ReviewStatistic", () => {
  testFor("Real ReviewStatistic", ({ reviewStatistic }) => {
    assertType<ReviewStatistic>(reviewStatistic);
  });
});

describe("ReviewStatisticCollection", () => {
  testFor("Real ReviewStatisticCollection", ({ reviewStatisticCollection }) => {
    assertType<ReviewStatisticCollection>(reviewStatisticCollection);
  });
});

describe("ReviewStatisticParameters", () => {
  testFor("Empty ReviewStatisticParameters", ({ emptyParams }) => {
    assertType<ReviewStatisticParameters>(emptyParams);
  });
  testFor("ReviewStatisticParameters with empty arrays", ({ reviewStatisticParamsWithEmptyArrays }) => {
    assertType<ReviewStatisticParameters>(reviewStatisticParamsWithEmptyArrays);
  });
  testFor("ReviewStatisticParameters with many options filled", ({ reviewStatisticParamsWithManyOptions }) => {
    assertType<ReviewStatisticParameters>(reviewStatisticParamsWithManyOptions);
  });
  testFor("ReviewStatisticParameters with Date objects", ({ reviewStatisticParamsWithDates }) => {
    assertType<ReviewStatisticParameters>(reviewStatisticParamsWithDates);
  });
  testFor("ReviewStatisticParameters with DatableString properties", ({ reviewStatisticParamsWithDatableStrings }) => {
    assertType<ReviewStatisticParameters>(reviewStatisticParamsWithDatableStrings);
  });
});
