import type { LessonBatchSizeNumber, User, UserPreferencesPayload } from "../../src/user/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("LessonBatchSizeNumber", () => {
  testFor("Valid Lesson Batch Sizes", ({ lessonBatchSizeNumbers }) => {
    if (Array.isArray(lessonBatchSizeNumbers)) {
      lessonBatchSizeNumbers.forEach((batchSize) => {
        assertType<LessonBatchSizeNumber>(batchSize);
      });
    } else {
      throw new TypeError("Expected lessonBatchSizeNumbers to be an array");
    }
  });
});

describe("User", () => {
  testFor("Real User", ({ user }) => {
    assertType<User>(user);
  });
});

describe("UserPreferencesPayload", () => {
  testFor("Payload with required properties only", ({ userPayloadWithRequiredProperties }) => {
    assertType<UserPreferencesPayload>(userPayloadWithRequiredProperties);
  });
  testFor("Payload with all properties", ({ userPayloadWithAllProperties }) => {
    assertType<UserPreferencesPayload>(userPayloadWithAllProperties);
  });
});
