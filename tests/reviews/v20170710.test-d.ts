import type {
  Review,
  ReviewCollection,
  ReviewData,
  ReviewParameters,
  ReviewPayload,
} from "../../src/reviews/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("ReviewData", () => {
  testFor("ReviewData from WaniKani API Docs", ({ reviewData }) => {
    assertType<ReviewData>(reviewData);
  });
});

describe("Review", () => {
  testFor("Review from WaniKani API Docs", ({ review }) => {
    assertType<Review>(review);
  });
});

describe("ReviewCollection", () => {
  testFor("ReviewCollection from WaniKani API Docs", ({ reviewCollection }) => {
    assertType<ReviewCollection>(reviewCollection);
  });
});

describe("ReviewParameters", () => {
  testFor("Empty ReviewParameters", ({ emptyParams }) => {
    assertType<ReviewParameters>(emptyParams);
  });
  testFor("ReviewParameters with empty arrays", ({ reviewParamsWithEmptyArrays }) => {
    assertType<ReviewParameters>(reviewParamsWithEmptyArrays);
  });
  testFor("ReviewParameters with many options filled", ({ reviewParamsWithManyOptions }) => {
    assertType<ReviewParameters>(reviewParamsWithManyOptions);
  });
  testFor("ReviewParameters with Date objects", ({ reviewParamsWithDates }) => {
    assertType<ReviewParameters>(reviewParamsWithDates);
  });
  testFor("ReviewParameters with DatableString properties", ({ reviewParamsWithDatableStrings }) => {
    assertType<ReviewParameters>(reviewParamsWithDatableStrings);
  });
});

describe("ReviewPayload", () => {
  testFor("ReviewPayload with Assignment ID and JS Date", ({ reviewPayloadWithAssignmentAndDate }) => {
    assertType<ReviewPayload>(reviewPayloadWithAssignmentAndDate);
  });
  testFor("ReviewPayload with Assignment ID and DatableString", ({ reviewPayloadWithAssignmentAndDatableStrings }) => {
    assertType<ReviewPayload>(reviewPayloadWithAssignmentAndDatableStrings);
  });
  testFor("ReviewPayload with Subject ID and JS Date", ({ reviewPayloadWithSubjectAndDate }) => {
    assertType<ReviewPayload>(reviewPayloadWithSubjectAndDate);
  });
  testFor("ReviewPayload with Subject ID and DatableString", ({ reviewPayloadWithSubjectAndDatableStrings }) => {
    assertType<ReviewPayload>(reviewPayloadWithSubjectAndDatableStrings);
  });
});
