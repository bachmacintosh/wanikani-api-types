import * as v from "valibot";
import { expect, describe, test } from "vitest";
import {
  LessonBatchSizeNumber,
  UserPreferencesPayload,
  MAX_LESSON_BATCH_SIZE,
  MIN_LESSON_BATCH_SIZE,
} from "../../src/user/v20170710";

describe("Revision 20170710: User", () => {
  test("LessonBatchSizeNumber", () => {
    expect(() => v.parse(LessonBatchSizeNumber, 2)).toThrow();
    Array<number>(MAX_LESSON_BATCH_SIZE - 2)
      .fill(MIN_LESSON_BATCH_SIZE)
      .map((batchSize, batchSizeIdx) => batchSize + batchSizeIdx)
      .forEach((batchSize) => expect(() => v.parse(LessonBatchSizeNumber, batchSize)).not.toThrow());
    expect(() => v.parse(LessonBatchSizeNumber, 11)).toThrow();
  });
  test("UserPreferencesPayload", () => {
    const payload1: UserPreferencesPayload = {
      user: {
        preferences: {},
      },
    };
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
    expect(() => v.parse(UserPreferencesPayload, payload1)).not.toThrow();
    expect(() => v.parse(UserPreferencesPayload, payload2)).not.toThrow();
  });
});
