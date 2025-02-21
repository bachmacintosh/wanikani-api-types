import * as v from "valibot";
import {
  StudyMaterialCreatePayload,
  StudyMaterialParameters,
  StudyMaterialUpdatePayload,
} from "../../src/study-materials/v20170710.js";
import { describe, expect, test } from "vitest";
import { DatableString } from "../../src/base/v20170710.js";

describe("StudyMaterialParameters", () => {
  test("Empty StudyMaterialParameters", () => {
    const params1: StudyMaterialParameters = {};
    expect(() => v.parse(StudyMaterialParameters, params1)).not.toThrow();
  });
  test("StudyMaterialParameters with empty arrays", () => {
    const params2: StudyMaterialParameters = {
      ids: [],
      subject_ids: [],
    };
    expect(() => v.parse(StudyMaterialParameters, params2)).not.toThrow();
  });
  test("StudyMaterialParameters with many options filled", () => {
    const params3: StudyMaterialParameters = {
      ids: [1, 2, 3],
      subject_ids: [1, 2, 3],
      subject_types: ["kana_vocabulary", "vocabulary"],
      hidden: false,
      page_after_id: 1,
      page_before_id: 1,
    };
    expect(() => v.parse(StudyMaterialParameters, params3)).not.toThrow();
  });
  test("StudyMaterialParameters with Date objects", () => {
    const params4: StudyMaterialParameters = {
      updated_after: new Date(),
    };
    expect(() => v.parse(StudyMaterialParameters, params4)).not.toThrow();
  });
  test("StudyMaterialParameters with DatableString properties", () => {
    const params5: StudyMaterialParameters = {
      updated_after: v.parse(DatableString, new Date().toISOString()),
    };
    expect(() => v.parse(StudyMaterialParameters, params5)).not.toThrow();
  });
});

describe("StudyMaterialUpdatePayload", () => {
  test("Empty payload", () => {
    const payload1: StudyMaterialUpdatePayload = {};
    expect(() => v.parse(StudyMaterialUpdatePayload, payload1)).not.toThrow();
  });
  test("Payload with all properties", () => {
    const payload2: StudyMaterialUpdatePayload = {
      meaning_note: "Meaning note",
      reading_note: "Reading Note",
      meaning_synonyms: ["one", "two"],
    };
    expect(() => v.parse(StudyMaterialUpdatePayload, payload2)).not.toThrow();
  });
});

describe("StudyMaterialCreatePayload", () => {
  test("Payload with required properties only", () => {
    const payload1: StudyMaterialCreatePayload = {
      subject_id: 1,
    };
    expect(() => v.parse(StudyMaterialCreatePayload, payload1)).not.toThrow();
  });
  test("Payload with all properties", () => {
    const payload2: StudyMaterialCreatePayload = {
      subject_id: 1,
      meaning_note: "Meaning note",
      reading_note: "Reading Note",
      meaning_synonyms: ["one", "two"],
    };
    expect(() => v.parse(StudyMaterialCreatePayload, payload2)).not.toThrow();
  });
});
