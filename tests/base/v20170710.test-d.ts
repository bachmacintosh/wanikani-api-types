import type * as v from "valibot";
import {
  type ApiRevision,
  type CollectionParameters,
  type DatableString,
  type Level,
  type ResourceType,
  type SubjectTuple,
  type SubjectType,
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

describe("ResourceType", () => {
  testFor("Valid Resources", ({ resourceTypes }) => {
    if (Array.isArray(resourceTypes)) {
      resourceTypes.forEach((resource) => {
        assertType<ResourceType>(resource);
      });
    } else {
      throw new TypeError("Expected resourceTypes to be an array");
    }
  });
});

describe("SubjectType", () => {
  testFor("Valid Subject Types", ({ subjectTypes }) => {
    if (Array.isArray(subjectTypes)) {
      subjectTypes.forEach((subject) => {
        assertType<SubjectType>(subject);
      });
    } else {
      throw new TypeError("Expected subjectTypes to be an array");
    }
  });
});

describe("SubjectTuple", () => {
  // These tests are kinda redundant, but we'll leave them here for completeness' sake
  testFor("Partial SubjectTuple is Valid", ({ partialSubjectTuple }) => {
    assertType<SubjectTuple>(partialSubjectTuple);
  });
  testFor("Full SubjectTuple is valid", ({ fullSubjectTuple }) => {
    assertType<SubjectTuple>(fullSubjectTuple);
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
