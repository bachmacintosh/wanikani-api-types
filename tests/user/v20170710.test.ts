import * as v from "valibot";
import { expect, describe, test } from "vitest";
import { LessonBatchSizeNumber, MAX_LESSON_BATCH_SIZE, MIN_LESSON_BATCH_SIZE } from "../../src/user/v20170710";

describe("Revision 20170710: User", () => {
  test("LessonBatchSizeNumber", () => {
    expect(() => v.parse(LessonBatchSizeNumber, 2)).toThrow();
    Array<number>(MAX_LESSON_BATCH_SIZE - 2)
      .fill(MIN_LESSON_BATCH_SIZE)
      .map((batchSize, batchSizeIdx) => batchSize + batchSizeIdx)
      .forEach((batchSize) => expect(() => v.parse(LessonBatchSizeNumber, batchSize)).not.toThrow());
    expect(() => v.parse(LessonBatchSizeNumber, 11)).toThrow();
  });
});
