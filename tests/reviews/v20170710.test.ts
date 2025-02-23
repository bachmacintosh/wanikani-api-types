import * as v from "valibot";
import { Review, ReviewCollection, ReviewParameters, ReviewPayload } from "../../src/reviews/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("Review", () => {
  testFor("Review from WaniKani API Docs", ({ review }) => {
    expect(() => v.assert(Review, review)).not.toThrow();
  });
});

describe("ReviewCollection", () => {
  testFor("ReviewCollection from WaniKani API Docs", ({ reviewCollection }) => {
    expect(() => v.assert(ReviewCollection, reviewCollection)).not.toThrow();
  });
});

describe("ReviewParameters", () => {
  testFor("Empty ReviewParameters", ({ emptyParams }) => {
    expect(() => v.assert(ReviewParameters, emptyParams)).not.toThrow();
  });
  testFor("ReviewParameters with empty arrays", ({ reviewParamsWithEmptyArrays }) => {
    expect(() => v.assert(ReviewParameters, reviewParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("ReviewParameters with many options filled", ({ reviewParamsWithManyOptions }) => {
    expect(() => v.assert(ReviewParameters, reviewParamsWithManyOptions)).not.toThrow();
  });
  testFor("ReviewParameters with Date objects", ({ reviewParamsWithDates }) => {
    expect(() => v.assert(ReviewParameters, reviewParamsWithDates)).not.toThrow();
  });
  testFor("ReviewParameters with DatableString properties", ({ reviewParamsWithDatableStrings }) => {
    expect(() => v.assert(ReviewParameters, reviewParamsWithDatableStrings)).not.toThrow();
  });
});

describe("ReviewPayload", () => {
  testFor("ReviewPayload with Assignment ID and JS Date", ({ reviewPayloadWithAssignmentAndDate }) => {
    expect(() => v.assert(ReviewPayload, reviewPayloadWithAssignmentAndDate)).not.toThrow();
  });
  testFor("ReviewPayload with Assignment ID and DatableString", ({ reviewPayloadWithAssignmentAndDatableStrings }) => {
    expect(() => v.assert(ReviewPayload, reviewPayloadWithAssignmentAndDatableStrings)).not.toThrow();
  });
  testFor("ReviewPayload with Subject ID and JS Date", ({ reviewPayloadWithSubjectAndDate }) => {
    expect(() => v.assert(ReviewPayload, reviewPayloadWithSubjectAndDate)).not.toThrow();
  });
  testFor("ReviewPayload with Subject ID and DatableString", ({ reviewPayloadWithSubjectAndDatableStrings }) => {
    expect(() => v.assert(ReviewPayload, reviewPayloadWithSubjectAndDatableStrings)).not.toThrow();
  });
});
