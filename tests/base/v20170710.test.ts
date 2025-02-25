import * as v from "valibot";
import {
  ApiError,
  ApiRevision,
  CollectionParameters,
  DatableString,
  Level,
  MAX_LEVEL,
  MIN_LEVEL,
  datableString,
  isApiError,
  isApiRevision,
  isDatableString,
  isLevel,
  stringifyParameters,
} from "../../src/base/v20170710.js";
import { describe, expect } from "vitest";
import type { AssignmentParameters } from "../../src/assignments/v20170710.js";
import type { SubjectParameters } from "../../src/subjects/v20170710.js";
import { testFor } from "../fixtures/v20170710.js";

describe("ApiRevision", () => {
  testFor("Valid WaniKani API Revision", ({ apiRevision }) => {
    expect(() => v.assert(ApiRevision, apiRevision)).not.toThrow();
    expect(isApiRevision(apiRevision)).toBe(true);
  });
});

describe("DatableString", () => {
  testFor("Valid UTC timestamp string", ({ dateTimeUtcString }) => {
    expect(() => v.assert(DatableString, dateTimeUtcString)).not.toThrow();
    expect(() => datableString(dateTimeUtcString)).not.toThrow();
    expect(isDatableString(dateTimeUtcString)).toBe(true);
  });
  testFor("Valid offset timestamp string", ({ dateTimeOffsetString }) => {
    expect(() => v.assert(DatableString, dateTimeOffsetString)).not.toThrow();
    expect(() => datableString(dateTimeOffsetString)).not.toThrow();
    expect(isDatableString(dateTimeOffsetString)).toBe(true);
  });
  testFor("String created from Date.toISOString", ({ dateIsoString }) => {
    expect(() => v.assert(DatableString, dateIsoString)).not.toThrow();
    expect(() => datableString(dateIsoString)).not.toThrow();
    expect(isDatableString(dateIsoString)).toBe(true);
  });
});

describe("Level", () => {
  testFor(`Invalid Level: ${MIN_LEVEL - 1}`, () => {
    expect(() => v.assert(Level, MIN_LEVEL - 1)).toThrow();
    expect(isLevel(MIN_LEVEL - 1)).toBe(false);
  });
  testFor("Valid Levels", ({ levels }) => {
    if (Array.isArray(levels)) {
      levels.forEach((level) => {
        expect(() => v.assert(Level, level)).not.toThrow();
        expect(isLevel(level)).toBe(true);
      });
    } else {
      throw new TypeError("Expected levels to be an array");
    }
  });
  testFor(`Invalid Level: ${MAX_LEVEL + 1}`, () => {
    expect(() => v.assert(Level, MAX_LEVEL + 1)).toThrow();
    expect(isLevel(MAX_LEVEL + 1)).toBe(false);
  });
  testFor("Invalid Level: Non-Integer", () => {
    expect(() => v.assert(Level, 1.23)).toThrow();
    expect(isLevel(1.23)).toBe(false);
  });
});

describe("CollectionParameters", () => {
  testFor("Empty CollectionParameters", ({ emptyParams }) => {
    expect(() => v.assert(CollectionParameters, emptyParams)).not.toThrow();
  });
  testFor("CollectionParameters with empty arrays", ({ collectionParamsWithEmptyArrays }) => {
    expect(() => v.assert(CollectionParameters, collectionParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("CollectionParameters with many options filled", ({ collectionParamsWithManyOptions }) => {
    expect(() => v.assert(CollectionParameters, collectionParamsWithManyOptions)).not.toThrow();
  });
  testFor("CollectionParameters with Date objects", ({ collectionParamsWithDates }) => {
    expect(() => v.assert(CollectionParameters, collectionParamsWithDates)).not.toThrow();
  });
  testFor("CollectionParameters with DatableString properties", ({ collectionParamsWithDatableStrings }) => {
    expect(() => v.assert(CollectionParameters, collectionParamsWithDatableStrings)).not.toThrow();
  });
});

describe("stringifyParameters", () => {
  testFor("Properly stringifies empty objects", () => {
    const params: AssignmentParameters = {};
    expect(stringifyParameters(params)).toBe("");
  });

  testFor("Properly stringifies booleans", () => {
    const params: AssignmentParameters = {
      hidden: false,
      burned: true,
    };
    const expectedString = "?hidden=false&burned=true";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies WaniKani API empty query parameters", () => {
    const params: AssignmentParameters = {
      immediately_available_for_lessons: true,
      immediately_available_for_review: true,
      in_review: true,
    };
    const expectedString = "?immediately_available_for_lessons&immediately_available_for_review&in_review";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies arrays", () => {
    const params: SubjectParameters = {
      ids: [1, 2, 3, 4],
      types: ["radical", "kanji"],
    };
    const expectedString = "?ids=1,2,3,4&types=radical,kanji";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Properly stringifies dates", () => {
    const dateString = v.parse(DatableString, "2022-10-31T12:00:00.000Z");
    const params: AssignmentParameters = {
      available_after: dateString,
      available_before: new Date("2021-10-31T12:00:00.000000Z"),
    };
    const expectedString = "?available_after=2022-10-31T12:00:00.000Z&available_before=2021-10-31T12:00:00.000Z";
    expect(stringifyParameters(params)).toBe(expectedString);
  });

  testFor("Throws an error when passed a non-object", () => {
    const notAnObject = "not an object";
    // @ts-expect-error -- We pass a string instead of an object to test throwing an error
    expect(() => stringifyParameters(notAnObject)).toThrow(
      'Invalid type: Expected Object but received "not an object"',
    );
  });
});

describe("ApiError", () => {
  testFor("Real ApiError", ({ apiError }) => {
    expect(() => v.assert(ApiError, apiError)).not.toThrow();
    expect(isApiError(apiError)).toBe(true);
  });
});
