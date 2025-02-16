import { describe, expectTypeOf } from "vitest";
import type {
  Assignment,
  AssignmentCollection,
  AssignmentData,
  AssignmentParameters,
  AssignmentPayload,
} from "../../src/assignments/v20170710.js";
import { testFor } from "../fixtures/v20170710.js";

describe("AssignmentData", () => {
  testFor("Real AssignmentData", ({ assignmentData }) => {
    expectTypeOf<AssignmentData>(assignmentData).toEqualTypeOf<AssignmentData>();
  });
});

describe("Assignment", () => {
  testFor("Real Assignment", ({ assignment }) => {
    expectTypeOf<Assignment>(assignment).toEqualTypeOf<Assignment>();
  });
});

describe("AssignmentCollection", () => {
  testFor("Real AssignmentCollection", ({ assignmentCollection }) => {
    expectTypeOf<AssignmentCollection>(assignmentCollection).toEqualTypeOf<AssignmentCollection>();
  });
});

describe("AssignmentParameters", () => {
  testFor("Empty AssignmentParameters", ({ emptyParams }) => {
    expectTypeOf<AssignmentParameters>(emptyParams).toEqualTypeOf<AssignmentParameters>();
  });
  testFor("AssignmentParameters with empty arrays", ({ assignmentParamsWithEmptyArrays }) => {
    expectTypeOf<AssignmentParameters>(assignmentParamsWithEmptyArrays).toEqualTypeOf<AssignmentParameters>();
  });
  testFor("AssignmentParameters with many options filled", ({ assignmentParamsWithManyOptions }) => {
    expectTypeOf<AssignmentParameters>(assignmentParamsWithManyOptions).toEqualTypeOf<AssignmentParameters>();
  });
  testFor("AssignmentParameters with Date objects", ({ assignmentParamsWithDates }) => {
    expectTypeOf<AssignmentParameters>(assignmentParamsWithDates).toEqualTypeOf<AssignmentParameters>();
  });
  testFor("AssignmentParameters with DatableString properties", ({ assignmentParamsWithDatableStrings }) => {
    expectTypeOf<AssignmentParameters>(assignmentParamsWithDatableStrings).toEqualTypeOf<AssignmentParameters>();
  });
});

describe("AssignmentPayload", () => {
  testFor("AssignmentPayload with empty assignment property", ({ assignmentPayloadWithNoTime }) => {
    expectTypeOf<AssignmentPayload>(assignmentPayloadWithNoTime).toEqualTypeOf<AssignmentPayload>();
  });
  testFor("AssignmentPayload with JS Date started_at property", ({ assignmentPayloadWithDate }) => {
    expectTypeOf<AssignmentPayload>(assignmentPayloadWithDate).toEqualTypeOf<AssignmentPayload>();
  });
  testFor("AssignmentPayload with DatableString started_at property", ({ assignmentPayloadWithDatableString }) => {
    expectTypeOf<AssignmentPayload>(assignmentPayloadWithDatableString).toEqualTypeOf<AssignmentPayload>();
  });
});
