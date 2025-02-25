import * as v from "valibot";
import {
  StudyMaterial,
  StudyMaterialCollection,
  StudyMaterialCreatePayload,
  StudyMaterialParameters,
  StudyMaterialUpdatePayload,
  isStudyMaterial,
  isStudyMaterialCollection,
} from "../../src/study-materials/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("StudyMaterial", () => {
  testFor("Real StudyMaterial", ({ studyMaterial }) => {
    expect(() => v.assert(StudyMaterial, studyMaterial)).not.toThrow();
    expect(isStudyMaterial(studyMaterial)).toBe(true);
  });
});

describe("StudyMaterialCollection", () => {
  testFor("Real StudyMaterialCollection", ({ studyMaterialCollection }) => {
    expect(() => v.assert(StudyMaterialCollection, studyMaterialCollection)).not.toThrow();
    expect(isStudyMaterialCollection(studyMaterialCollection)).toBe(true);
  });
});

describe("StudyMaterialParameters", () => {
  testFor("Empty StudyMaterialParameters", ({ emptyParams }) => {
    expect(() => v.assert(StudyMaterialParameters, emptyParams)).not.toThrow();
  });
  testFor("StudyMaterialParameters with empty arrays", ({ studyMaterialParamsWithEmptyArrays }) => {
    expect(() => v.assert(StudyMaterialParameters, studyMaterialParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("StudyMaterialParameters with many options filled", ({ studyMaterialParamsWithManyOptions }) => {
    expect(() => v.assert(StudyMaterialParameters, studyMaterialParamsWithManyOptions)).not.toThrow();
  });
  testFor("StudyMaterialParameters with Date objects", ({ studyMaterialParamsWithDates }) => {
    expect(() => v.assert(StudyMaterialParameters, studyMaterialParamsWithDates)).not.toThrow();
  });
  testFor("StudyMaterialParameters with DatableString properties", ({ studyMaterialParamsWithDatableStrings }) => {
    expect(() => v.assert(StudyMaterialParameters, studyMaterialParamsWithDatableStrings)).not.toThrow();
  });
});

describe("StudyMaterialUpdatePayload", () => {
  testFor("Empty payload", ({ emptyStudyMaterialUpdatePayload }) => {
    expect(() => v.assert(StudyMaterialUpdatePayload, emptyStudyMaterialUpdatePayload)).not.toThrow();
  });
  testFor("Payload with all properties", ({ fullStudyMaterialUpdatePayload }) => {
    expect(() => v.assert(StudyMaterialUpdatePayload, fullStudyMaterialUpdatePayload)).not.toThrow();
  });
});

describe("StudyMaterialCreatePayload", () => {
  testFor("Payload with required properties only", ({ minimalStudyMaterialCreatePayload }) => {
    expect(() => v.assert(StudyMaterialCreatePayload, minimalStudyMaterialCreatePayload)).not.toThrow();
  });
  testFor("Payload with all properties", ({ fullStudyMaterialCreatePayload }) => {
    expect(() => v.assert(StudyMaterialCreatePayload, fullStudyMaterialCreatePayload)).not.toThrow();
  });
});
