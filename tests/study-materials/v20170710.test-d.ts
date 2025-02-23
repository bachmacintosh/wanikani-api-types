import type {
  StudyMaterial,
  StudyMaterialCollection,
  StudyMaterialCreatePayload,
  StudyMaterialParameters,
  StudyMaterialUpdatePayload,
} from "../../src/study-materials/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("StudyMaterial", () => {
  testFor("Real StudyMaterial", ({ studyMaterial }) => {
    assertType<StudyMaterial>(studyMaterial);
  });
});

describe("StudyMaterialCollection", () => {
  testFor("Real StudyMaterialCollection", ({ studyMaterialCollection }) => {
    assertType<StudyMaterialCollection>(studyMaterialCollection);
  });
});

describe("StudyMaterialParameters", () => {
  testFor("Empty StudyMaterialParameters", ({ emptyParams }) => {
    assertType<StudyMaterialParameters>(emptyParams);
  });
  testFor("StudyMaterialParameters with empty arrays", ({ studyMaterialParamsWithEmptyArrays }) => {
    assertType<StudyMaterialParameters>(studyMaterialParamsWithEmptyArrays);
  });
  testFor("StudyMaterialParameters with many options filled", ({ studyMaterialParamsWithManyOptions }) => {
    assertType<StudyMaterialParameters>(studyMaterialParamsWithManyOptions);
  });
  testFor("StudyMaterialParameters with Date objects", ({ studyMaterialParamsWithDates }) => {
    assertType<StudyMaterialParameters>(studyMaterialParamsWithDates);
  });
  testFor("StudyMaterialParameters with DatableString properties", ({ studyMaterialParamsWithDatableStrings }) => {
    assertType<StudyMaterialParameters>(studyMaterialParamsWithDatableStrings);
  });
});

describe("StudyMaterialUpdatePayload", () => {
  testFor("Empty payload", ({ emptyStudyMaterialUpdatePayload }) => {
    assertType<StudyMaterialUpdatePayload>(emptyStudyMaterialUpdatePayload);
  });
  testFor("Payload with all properties", ({ fullStudyMaterialUpdatePayload }) => {
    assertType<StudyMaterialUpdatePayload>(fullStudyMaterialUpdatePayload);
  });
});

describe("StudyMaterialCreatePayload", () => {
  testFor("Payload with required properties only", ({ minimalStudyMaterialCreatePayload }) => {
    assertType<StudyMaterialCreatePayload>(minimalStudyMaterialCreatePayload);
  });
  testFor("Payload with all properties", ({ fullStudyMaterialCreatePayload }) => {
    assertType<StudyMaterialCreatePayload>(fullStudyMaterialCreatePayload);
  });
});
