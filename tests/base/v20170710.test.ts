import * as v from "valibot";
import { expect, describe, test } from "vitest";
import {
  ApiRevision,
  DatableString,
  Level,
  ResourceType,
  SubjectType,
  SubjectTuple,
  MAX_LEVEL,
  MIN_LEVEL,
} from "../../src/base/v20170710";

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
});
