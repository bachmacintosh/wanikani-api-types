import * as v from "valibot";
import {
  LessonBatchSizeNumber,
  MAX_LESSON_BATCH_SIZE,
  User,
  UserPreferencesPayload,
} from "../../src/user/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("LessonBatchSizeNumber", () => {
  testFor("Invalid Lesson Batch Size: 2", () => {
    expect(() => v.assert(LessonBatchSizeNumber, 2)).toThrow();
  });
  testFor("Valid Lesson Batch Sizes", ({ lessonBatchSizeNumbers }) => {
    if (Array.isArray(lessonBatchSizeNumbers)) {
      lessonBatchSizeNumbers.forEach((batchSize) => {
        expect(() => v.assert(LessonBatchSizeNumber, batchSize)).not.toThrow();
      });
    } else {
      throw new TypeError("Expected lessonBatchSizeNumbers to be an array");
    }
  });
  testFor(`Invalid Lesson Batch Size: ${MAX_LESSON_BATCH_SIZE + 1}`, () => {
    expect(() => v.assert(LessonBatchSizeNumber, MAX_LESSON_BATCH_SIZE + 1)).toThrow();
  });
});

describe("User", () => {
  testFor("Real User", ({ user }) => {
    expect(() => v.assert(User, user)).not.toThrow();
  });
});

describe("UserPreferencesPayload", () => {
  testFor("Payload with required properties only", ({ userPayloadWithRequiredProperties }) => {
    expect(() => v.assert(UserPreferencesPayload, userPayloadWithRequiredProperties)).not.toThrow();
  });
  testFor("Payload with all properties", ({ userPayloadWithAllProperties }) => {
    expect(() => v.assert(UserPreferencesPayload, userPayloadWithAllProperties)).not.toThrow();
  });
});
