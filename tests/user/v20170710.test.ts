import * as v from "valibot";
import {
  LessonBatchSizeNumber,
  MAX_LESSON_BATCH_SIZE,
  User,
  UserPreferencesPayload,
  isLessonBatchSizeNumber,
  isUser,
} from "../../src/user/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("LessonBatchSizeNumber", () => {
  testFor("Invalid Lesson Batch Size: 2", () => {
    expect(() => v.assert(LessonBatchSizeNumber, 2)).toThrow();
    expect(isLessonBatchSizeNumber(2)).toBe(false);
  });
  testFor("Valid Lesson Batch Sizes", ({ lessonBatchSizeNumbers }) => {
    if (Array.isArray(lessonBatchSizeNumbers)) {
      lessonBatchSizeNumbers.forEach((batchSize) => {
        expect(() => v.assert(LessonBatchSizeNumber, batchSize)).not.toThrow();
        expect(isLessonBatchSizeNumber(batchSize)).toBe(true);
      });
    } else {
      throw new TypeError("Expected lessonBatchSizeNumbers to be an array");
    }
  });
  testFor(`Invalid Lesson Batch Size: ${MAX_LESSON_BATCH_SIZE + 1}`, () => {
    expect(() => v.assert(LessonBatchSizeNumber, MAX_LESSON_BATCH_SIZE + 1)).toThrow();
    expect(isLessonBatchSizeNumber(MAX_LESSON_BATCH_SIZE + 1)).toBe(false);
  });
  testFor("Invalid Lesson Batch Size: Non-Integer", () => {
    expect(() => v.assert(LessonBatchSizeNumber, 3.45)).toThrow();
    expect(isLessonBatchSizeNumber(3.45)).toBe(false);
  });
});

describe("User", () => {
  testFor("Real User", ({ user }) => {
    expect(() => v.assert(User, user)).not.toThrow();
    expect(isUser(user)).toBe(true);
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
