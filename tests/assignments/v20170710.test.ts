import * as v from "valibot";
import { expect, describe } from "vitest";
import {
  Assignment,
  AssignmentCollection,
  AssignmentData,
  AssignmentParameters,
  AssignmentPayload,
} from "../../src/assignments/v20170710";
import { DatableString } from "../../src/base/v20170710";
import { testFor } from "../fixtures/v20170710";

describe("AssignmentData", () => {
  testFor("Real AssignmentData", ({ assignmentData }) => {
    expect(() => v.assert(AssignmentData, assignmentData)).not.toThrow();
  });
});

describe("Assignment", () => {
  testFor("Real Assignment", ({ assignment }) => {
    expect(() => v.assert(Assignment, assignment)).not.toThrow();
  });
});

describe("AssignmentCollection", () => {
  testFor("Real AssignmentCollection", ({ assignmentCollection }) => {
    expect(() => v.assert(AssignmentCollection, assignmentCollection)).not.toThrow();
  });
});

describe("AssignmentParameters", () => {
  testFor("Empty AssignmentParameters", ({ emptyParams }) => {
    expect(() => v.assert(AssignmentParameters, emptyParams)).not.toThrow();
  });
  testFor("AssignmentParameters with empty arrays", ({ assignmentParamsWithEmptyArrays }) => {
    expect(() => v.assert(AssignmentParameters, assignmentParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("AssignmentParameters with many options filled", ({ assignmentParamsWithManyOptions }) => {
    expect(() => v.assert(AssignmentParameters, assignmentParamsWithManyOptions)).not.toThrow();
  });
  testFor("AssignmentParameters with Date objects", ({ assignmentParamsWithDates }) => {
    expect(() => v.assert(AssignmentParameters, assignmentParamsWithDates)).not.toThrow();
  });
  testFor("AssignmentParameters with DatableString properties", ({ assignmentParamsWithDatableStrings }) => {
    expect(() => v.assert(AssignmentParameters, assignmentParamsWithDatableStrings)).not.toThrow();
  });
});

describe("AssignmentPayload", () => {
  testFor("AssignmentPayload with empty assignment property", ({ assignmentPayloadWithNoTime }) => {
    expect(() => v.assert(AssignmentPayload, assignmentPayloadWithNoTime)).not.toThrow();
  });
  testFor("AssignmentPayload with JS Date started_at property", ({ assignmentPayloadWithDate }) => {
    expect(() => v.assert(AssignmentPayload, assignmentPayloadWithDate)).not.toThrow();
  });
  testFor("AssignmentPayload with DatableString started_at property", ({ assignmentPayloadWithDatableString }) => {
    expect(() => v.assert(AssignmentPayload, assignmentPayloadWithDatableString)).not.toThrow();
  });
});
