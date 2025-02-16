import * as v from "valibot";
import { expect, describe, test } from "vitest";
import {
  MAX_SRS_STAGE,
  MIN_SRS_STAGE,
  SpacedRepetitionSystemStageNumber,
} from "../../src/spaced-repetition-systems/v20170710.js";

describe("SpacedRepetitionSystemStageNumber", () => {
  test("Invalid SRS Stage Number: -1", () => {
    expect(() => v.parse(SpacedRepetitionSystemStageNumber, -1)).toThrow();
  });
  Array<number>(MAX_SRS_STAGE)
    .fill(MIN_SRS_STAGE)
    .map((stage, stageIdx) => stage + stageIdx)
    .forEach((stage) => {
      test(`Valid SRS Stage Number: ${stage}`, () => {
        expect(() => v.parse(SpacedRepetitionSystemStageNumber, stage)).not.toThrow();
      });
    });
  test(`Invalid SRS Stage Number: ${MAX_SRS_STAGE + 1}`, () => {
    expect(() => v.parse(SpacedRepetitionSystemStageNumber, MAX_SRS_STAGE + 1)).toThrow();
  });
});
