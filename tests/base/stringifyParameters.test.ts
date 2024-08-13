import { expect, it } from "vitest";
import { stringifyParameters } from "../../src/base/v20170710";
import type { WKAssignmentParameters } from "../../src/assignments/v20170710";
import type { WKDatableString } from "../../src/base/v20170710";
import type { WKSubjectParameters } from "../../src/subjects/v20170710";

it("Properly stringifies empty objects", () => {
  const params: WKAssignmentParameters = {};
  expect(stringifyParameters(params)).toBe("");
});

it("Properly stringifies booleans", () => {
  const params: WKAssignmentParameters = {
    hidden: false,
    burned: true,
  };
  const expectedString = "?hidden=false&burned=true";
  expect(stringifyParameters(params)).toBe(expectedString);
});

it("Properly stringifies WaniKani API empty query parameters", () => {
  const params: WKAssignmentParameters = {
    immediately_available_for_lessons: true,
    immediately_available_for_review: true,
    in_review: true,
  };
  const expectedString = "?immediately_available_for_lessons&immediately_available_for_review&in_review";
  expect(stringifyParameters(params)).toBe(expectedString);
});

it("Properly stringifies arrays", () => {
  const params: WKSubjectParameters = {
    ids: [1, 2, 3, 4],
    types: ["radical", "kanji"],
  };
  const expectedString = "?ids=1,2,3,4&types=radical,kanji";
  expect(stringifyParameters(params)).toBe(expectedString);
});

it("Properly stringifies dates", () => {
  const datableString = "2022-10-31T12:00:00.000Z" as WKDatableString;
  const params: WKAssignmentParameters = {
    available_after: datableString,
    available_before: new Date("2021-10-31T12:00:00.000000Z"),
  };
  const expectedString = "?available_after=2022-10-31T12:00:00.000Z&available_before=2021-10-31T12:00:00.000Z";
  expect(stringifyParameters(params)).toBe(expectedString);
});

it("Throws an error when passed a non-object", () => {
  const notAnObject = "not an object";
  /// @ts-expect-error
  expect(() => stringifyParameters(notAnObject)).toThrow("Parameters must be expressed as an object.");
});
