import * as v from "valibot";
import {
  MAX_SRS_STAGE,
  SpacedRepetitionSystem,
  SpacedRepetitionSystemCollection,
  SpacedRepetitionSystemStageNumber,
} from "../../src/spaced-repetition-systems/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("SpacedRepetitionSystemStageNumber", () => {
  testFor("Invalid SRS Stage Number: -1", () => {
    expect(() => v.assert(SpacedRepetitionSystemStageNumber, -1)).toThrow();
  });
  testFor("Valid SRS Stage Numbers", ({ spacedRepetitionSystemStageNumbers }) => {
    if (Array.isArray(spacedRepetitionSystemStageNumbers)) {
      spacedRepetitionSystemStageNumbers.forEach((stage) => {
        expect(() => v.assert(SpacedRepetitionSystemStageNumber, stage)).not.toThrow();
      });
    } else {
      throw new TypeError("Expected spacedRepetitionSystemStageNumbers to be an array");
    }
  });
  testFor(`Invalid SRS Stage Number: ${MAX_SRS_STAGE + 1}`, () => {
    expect(() => v.assert(SpacedRepetitionSystemStageNumber, MAX_SRS_STAGE + 1)).toThrow();
  });
});

describe("SpacedRepetitionSystem", () => {
  testFor("Real SpacedRepetitionSystem", ({ spacedRepetitionSystem }) => {
    expect(() => v.assert(SpacedRepetitionSystem, spacedRepetitionSystem)).not.toThrow();
  });
});

describe("SpacedRepetitionSystemCollection", () => {
  testFor("Real SpacedRepetitionSystemCollection", ({ spacedRepetitionSystemCollection }) => {
    expect(() => v.assert(SpacedRepetitionSystemCollection, spacedRepetitionSystemCollection)).not.toThrow();
  });
});
