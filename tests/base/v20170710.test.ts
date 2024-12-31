import * as v from "valibot";
import { expect, describe, test } from "vitest";
import {
  ApiRevision,
  CollectionParameters,
  DatableString,
  Level,
  ResourceType,
  SubjectType,
  SubjectTuple,
  MAX_LEVEL,
  MIN_LEVEL,
  stringifyParameters,
} from "../../src/base/v20170710";
import { AssignmentParameters } from "../../src/assignments/v20170710";
import { SubjectParameters } from "../../src/subjects/v20170710";

describe("Revision 20170710: Base", () => {
  test("ApiRevision", () => {
    const apiRevision: ApiRevision = "20170710";
    expect(() => v.parse(ApiRevision, apiRevision)).not.toThrow();
  });
  test("DatableString", () => {
    const dateTimeUtcString = "2022-10-23T15:17:38.828455Z";
    const dateTimeOffsetString = "2022-10-23T15:17:38.828455+09:00";
    const validLeapYear = "2020-02-29T12:00:00.000000Z";
    const dateIsoString = new Date().toISOString();

    expect(() => v.parse(DatableString, dateTimeUtcString)).not.toThrow();
    expect(() => v.parse(DatableString, dateTimeOffsetString)).not.toThrow();
    expect(() => v.parse(DatableString, validLeapYear)).not.toThrow();
    expect(() => v.parse(DatableString, dateIsoString)).not.toThrow();
  });
  test("Level", () => {
    expect(() => v.parse(Level, 0)).toThrow();
    Array<number>(MAX_LEVEL)
      .fill(MIN_LEVEL)
      .map((item, itemIdx) => item + itemIdx)
      .forEach((level) => expect(() => v.parse(Level, level)).not.toThrow());
    expect(() => v.parse(Level, MAX_LEVEL + 1)).toThrow();
  });
  test("ResourceType", () => {
    const resourceTypes = [
      "assignment",
      "level_progression",
      "reset",
      "review_statistic",
      "review",
      "spaced_repetition_system",
      "study_material",
      "user",
      "voice_actor",
    ];
    resourceTypes.forEach((resource) => expect(() => v.parse(ResourceType, resource)).not.toThrow());
    expect(() => v.parse(ResourceType, "not real")).toThrow();
  });
  test("SubjectType", () => {
    const subjectTypes = ["kana_vocabulary", "kanji", "radical", "vocabulary"];
    subjectTypes.forEach((subject) => expect(() => v.parse(SubjectType, subject)).not.toThrow());
    expect(() => v.parse(SubjectType, "not real")).toThrow();
  });
  test("SubjectTuple", () => {
    const emptySubjectTuple = [];
    expect(() => v.parse(SubjectTuple, emptySubjectTuple)).toThrow();
    const fullSubjectTuple: SubjectTuple = ["kana_vocabulary", "kanji", "radical", "vocabulary"];
    expect(() => v.parse(SubjectTuple, fullSubjectTuple)).not.toThrow();
    const repeatedSubjectTuple: SubjectTuple = [
      "kana_vocabulary",
      "kanji",
      "radical",
      "kanji",
      "vocabulary",
      "radical",
    ];
    expect(() => v.parse(SubjectTuple, repeatedSubjectTuple)).toThrow();
  });
  test("CollectionParameters", () => {
    const params1: CollectionParameters = {};
    const params2: CollectionParameters = {
      ids: [],
    };
    const params3: CollectionParameters = {
      ids: [1, 2, 3],
      page_after_id: 1,
      page_before_id: 1,
    };
    const params4: CollectionParameters = {
      updated_after: new Date(),
    };
    const params5: CollectionParameters = {
      updated_after: v.parse(DatableString, new Date().toISOString()),
    };
    expect(() => v.parse(CollectionParameters, params1)).not.toThrow();
    expect(() => v.parse(CollectionParameters, params2)).not.toThrow();
    expect(() => v.parse(CollectionParameters, params3)).not.toThrow();
    expect(() => v.parse(CollectionParameters, params4)).not.toThrow();
    expect(() => v.parse(CollectionParameters, params5)).not.toThrow();
  });
});

describe("stringifyParameters", () => {
  test("Properly stringifies empty objects", () => {
    const params: AssignmentParameters = {};
    expect(stringifyParameters(params)).toBe("");
  });

  test("Properly stringifies booleans", () => {
    const params: AssignmentParameters = {
      hidden: false,
      burned: true,
    };
    const expectedString = "?hidden=false&burned=true";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  test("Properly stringifies WaniKani API empty query parameters", () => {
    const params: AssignmentParameters = {
      immediately_available_for_lessons: true,
      immediately_available_for_review: true,
      in_review: true,
    };
    const expectedString = "?immediately_available_for_lessons&immediately_available_for_review&in_review";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  test("Properly stringifies arrays", () => {
    const params: SubjectParameters = {
      ids: [1, 2, 3, 4],
      types: ["radical", "kanji"],
    };
    const expectedString = "?ids=1,2,3,4&types=radical,kanji";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  test("Properly stringifies dates", () => {
    const datableString = v.parse(DatableString, "2022-10-31T12:00:00.000Z");
    const params: AssignmentParameters = {
      available_after: datableString,
      available_before: new Date("2021-10-31T12:00:00.000000Z"),
    };
    const expectedString = "?available_after=2022-10-31T12:00:00.000Z&available_before=2021-10-31T12:00:00.000Z";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  test("Throws an error when passed a non-object", () => {
    const notAnObject = "not an object";
    // @ts-expect-error
    expect(() => stringifyParameters(notAnObject)).toThrow("Parameters must be expressed as an object.");
  });
});
