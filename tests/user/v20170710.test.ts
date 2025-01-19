import * as v from "valibot";
import { expect, describe, test } from "vitest";
import {
  LessonBatchSizeNumber,
  UserPreferencesPayload,
  MAX_LESSON_BATCH_SIZE,
  MIN_LESSON_BATCH_SIZE,
} from "../../src/user/v20170710";

describe("LessonBatchSizeNumber", () => {
  test("Invalid Lesson Batch Size: 2", () => {
    expect(() => v.parse(LessonBatchSizeNumber, 2)).toThrow();
  });
  Array<number>(MAX_LESSON_BATCH_SIZE - 2)
    .fill(MIN_LESSON_BATCH_SIZE)
    .map((batchSize, batchSizeIdx) => batchSize + batchSizeIdx)
    .forEach((batchSize) => {
      test(`Valid Lesson Batch Size: ${batchSize}`, () => {
        expect(() => v.parse(LessonBatchSizeNumber, batchSize)).not.toThrow();
      });
    });
  test(`Invalid Lesson Batch Size: ${MAX_LESSON_BATCH_SIZE + 1}`, () => {
    expect(() => v.parse(LessonBatchSizeNumber, MAX_LESSON_BATCH_SIZE + 1)).toThrow();
  });
});

describe("UserPreferencesPayload", () => {
  test("Payload with required properties only", () => {
    const payload1: UserPreferencesPayload = {
      user: {
        preferences: {},
      },
    };
    expect(() => v.parse(UserPreferencesPayload, payload1)).not.toThrow();
  });
  test("Payload with all properties", () => {
    const payload2: UserPreferencesPayload = {
      user: {
        preferences: {
          default_voice_actor_id: 1,
          extra_study_autoplay_audio: false,
          lessons_autoplay_audio: false,
          lessons_batch_size: 10,
          lessons_presentation_order: "ascending_level_then_subject",
          reviews_autoplay_audio: false,
          reviews_display_srs_indicator: true,
          reviews_presentation_order: "shuffled",
        },
      },
    };
    expect(() => v.parse(UserPreferencesPayload, payload2)).not.toThrow();
  });
});
