import * as v from "valibot";
import { describe, expect, test } from "vitest";
import {
  StudyMaterialParameters,
  StudyMaterialCreatePayload,
  StudyMaterialUpdatePayload,
} from "../../src/study-materials/v20170710";
import { DatableString } from "../../src/base/v20170710";

describe("Revision 20170710: Study Materials", () => {
  test("StudyMaterialParameters", () => {
    const params1: StudyMaterialParameters = {};
    const params2: StudyMaterialParameters = {
      ids: [],
      subject_ids: [],
    };
    const params3: StudyMaterialParameters = {
      ids: [1, 2, 3],
      subject_ids: [1, 2, 3],
      subject_types: ["kana_vocabulary", "vocabulary"],
      hidden: false,
      page_after_id: 1,
      page_before_id: 1,
    };
    const params4: StudyMaterialParameters = {
      updated_after: new Date(),
    };
    const params5: StudyMaterialParameters = {
      updated_after: v.parse(DatableString, new Date().toISOString()),
    };
    expect(() => v.parse(StudyMaterialParameters, params1)).not.toThrow();
    expect(() => v.parse(StudyMaterialParameters, params2)).not.toThrow();
    expect(() => v.parse(StudyMaterialParameters, params3)).not.toThrow();
    expect(() => v.parse(StudyMaterialParameters, params4)).not.toThrow();
    expect(() => v.parse(StudyMaterialParameters, params5)).not.toThrow();
  });

  test("StudyMaterialCreatePayload", () => {
    const payload1: StudyMaterialCreatePayload = {
      subject_id: 1,
    };
    const payload2: StudyMaterialCreatePayload = {
      subject_id: 1,
      meaning_note: "Meaning note",
      reading_note: "Reading Note",
      meaning_synonyms: ["one", "two"],
    };
    expect(() => v.parse(StudyMaterialCreatePayload, payload1)).not.toThrow();
    expect(() => v.parse(StudyMaterialCreatePayload, payload2)).not.toThrow();
  });

  test("StudyMaterialUpdatePayload", () => {
    const payload1: StudyMaterialUpdatePayload = {};
    const payload2: StudyMaterialUpdatePayload = {
      meaning_note: "Meaning note",
      reading_note: "Reading Note",
      meaning_synonyms: ["one", "two"],
    };
    expect(() => v.parse(StudyMaterialUpdatePayload, payload1)).not.toThrow();
    expect(() => v.parse(StudyMaterialUpdatePayload, payload2)).not.toThrow();
  });
});
