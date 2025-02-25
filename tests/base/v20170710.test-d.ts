import type * as v from "valibot";
import {
  type ApiRevision,
  type CollectionParameters,
  type DatableString,
  type Level,
  stringifyParameters,
} from "../../src/base/v20170710.js";
import { assertType, describe, expectTypeOf } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("ApiRevision", () => {
  testFor("Valid WaniKani API Revision", ({ apiRevision }) => {
    assertType<ApiRevision>(apiRevision);
  });
});

describe("DatableString", () => {
  testFor("Valid DatableString Type", () => {
    expectTypeOf<v.InferOutput<typeof DatableString>>().toEqualTypeOf<DatableString>();
  });
});

describe("Level", () => {
  testFor("Valid Levels", ({ levels }) => {
    if (Array.isArray(levels)) {
      levels.forEach((level) => {
        assertType<Level>(level);
      });
    } else {
      throw new TypeError("Expected levels to be an array");
    }
  });
});

describe("CollectionParameters", () => {
  testFor("Empty CollectionParameters", ({ emptyParams }) => {
    assertType<CollectionParameters>(emptyParams);
  });
  testFor("CollectionParameters with empty arrays", ({ collectionParamsWithEmptyArrays }) => {
    assertType<CollectionParameters>(collectionParamsWithEmptyArrays);
  });
  testFor("CollectionParameters with many options filled", ({ collectionParamsWithManyOptions }) => {
    assertType<CollectionParameters>(collectionParamsWithManyOptions);
  });
  testFor("CollectionParameters with Date objects", ({ collectionParamsWithDates }) => {
    assertType<CollectionParameters>(collectionParamsWithDates);
  });
  testFor("CollectionParameters with DatableString properties", ({ collectionParamsWithDatableStrings }) => {
    assertType<CollectionParameters>(collectionParamsWithDatableStrings);
  });
});

describe("stringifyParameters", () => {
  testFor("Return type is a string", ({ collectionParamsWithManyOptions }) => {
    expectTypeOf(stringifyParameters(collectionParamsWithManyOptions)).toBeString();
  });
});
