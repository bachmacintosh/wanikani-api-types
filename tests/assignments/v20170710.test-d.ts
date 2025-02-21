import type {
  Assignment,
  AssignmentCollection,
  AssignmentData,
  AssignmentParameters,
  AssignmentPayload,
} from "../../src/assignments/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("AssignmentData", () => {
  testFor("Real AssignmentData", ({ assignmentData }) => {
    assertType<AssignmentData>(assignmentData);
  });
});

describe("Assignment", () => {
  testFor("Real Assignment", ({ assignment }) => {
    assertType<Assignment>(assignment);
  });
});

describe("AssignmentCollection", () => {
  testFor("Real AssignmentCollection", ({ assignmentCollection }) => {
    assertType<AssignmentCollection>(assignmentCollection);
  });
});

describe("AssignmentParameters", () => {
  testFor("Empty AssignmentParameters", ({ emptyParams }) => {
    assertType<AssignmentParameters>(emptyParams);
  });
  testFor("AssignmentParameters with empty arrays", ({ assignmentParamsWithEmptyArrays }) => {
    assertType<AssignmentParameters>(assignmentParamsWithEmptyArrays);
  });
  testFor("AssignmentParameters with many options filled", ({ assignmentParamsWithManyOptions }) => {
    assertType<AssignmentParameters>(assignmentParamsWithManyOptions);
  });
  testFor("AssignmentParameters with Date objects", ({ assignmentParamsWithDates }) => {
    assertType<AssignmentParameters>(assignmentParamsWithDates);
  });
  testFor("AssignmentParameters with DatableString properties", ({ assignmentParamsWithDatableStrings }) => {
    assertType<AssignmentParameters>(assignmentParamsWithDatableStrings);
  });
});

describe("AssignmentPayload", () => {
  testFor("AssignmentPayload with empty assignment property", ({ assignmentPayloadWithNoTime }) => {
    assertType<AssignmentPayload>(assignmentPayloadWithNoTime);
  });
  testFor("AssignmentPayload with JS Date started_at property", ({ assignmentPayloadWithDate }) => {
    assertType<AssignmentPayload>(assignmentPayloadWithDate);
  });
  testFor("AssignmentPayload with DatableString started_at property", ({ assignmentPayloadWithDatableString }) => {
    assertType<AssignmentPayload>(assignmentPayloadWithDatableString);
  });
});
