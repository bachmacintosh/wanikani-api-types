import * as v from "valibot";
import {
  MAX_SRS_STAGE,
  SpacedRepetitionSystem,
  SpacedRepetitionSystemCollection,
  SpacedRepetitionSystemStageNumber,
  isSpacedRepetitionSystem,
  isSpacedRepetitionSystemCollection,
  isSpacedRepetitionSystemStageNumber,
} from "../../src/spaced-repetition-systems/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("SpacedRepetitionSystemStageNumber", () => {
  testFor("Invalid SRS Stage Number: -1", () => {
    expect(() => v.assert(SpacedRepetitionSystemStageNumber, -1)).toThrow();
    expect(isSpacedRepetitionSystemStageNumber(-1)).toBe(false);
  });
  testFor("Valid SRS Stage Numbers", ({ spacedRepetitionSystemStageNumbers }) => {
    if (Array.isArray(spacedRepetitionSystemStageNumbers)) {
      spacedRepetitionSystemStageNumbers.forEach((stage) => {
        expect(() => v.assert(SpacedRepetitionSystemStageNumber, stage)).not.toThrow();
        expect(isSpacedRepetitionSystemStageNumber(stage)).toBe(true);
      });
    } else {
      throw new TypeError("Expected spacedRepetitionSystemStageNumbers to be an array");
    }
  });
  testFor(`Invalid SRS Stage Number: ${MAX_SRS_STAGE + 1}`, () => {
    expect(() => v.assert(SpacedRepetitionSystemStageNumber, MAX_SRS_STAGE + 1)).toThrow();
    expect(isSpacedRepetitionSystemStageNumber(MAX_SRS_STAGE + 1)).toBe(false);
  });
  testFor("Invalid SRS Stage: Non-Integer", () => {
    expect(() => v.assert(SpacedRepetitionSystemStageNumber, 1.23)).toThrow();
    expect(isSpacedRepetitionSystemStageNumber(1.23)).toBe(false);
  });
});

describe("SpacedRepetitionSystem", () => {
  testFor("Real SpacedRepetitionSystem", ({ spacedRepetitionSystem }) => {
    expect(() => v.assert(SpacedRepetitionSystem, spacedRepetitionSystem)).not.toThrow();
    expect(isSpacedRepetitionSystem(spacedRepetitionSystem)).toBe(true);
  });
});

describe("SpacedRepetitionSystemCollection", () => {
  testFor("Real SpacedRepetitionSystemCollection", ({ spacedRepetitionSystemCollection }) => {
    expect(() => v.assert(SpacedRepetitionSystemCollection, spacedRepetitionSystemCollection)).not.toThrow();
    expect(isSpacedRepetitionSystemCollection(spacedRepetitionSystemCollection)).toBe(true);
  });
});
