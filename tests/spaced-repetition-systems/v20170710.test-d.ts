import type {
  SpacedRepetitionSystem,
  SpacedRepetitionSystemCollection,
  SpacedRepetitionSystemData,
  SpacedRepetitionSystemStageNumber,
} from "../../src/spaced-repetition-systems/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("SpacedRepetitionSystemStageNumber", () => {
  testFor("Valid SRS Stage Numbers", ({ spacedRepetitionSystemStageNumbers }) => {
    if (Array.isArray(spacedRepetitionSystemStageNumbers)) {
      spacedRepetitionSystemStageNumbers.forEach((stage) => {
        assertType<SpacedRepetitionSystemStageNumber>(stage);
      });
    } else {
      throw new TypeError("Expected spacedRepetitionSystemStageNumbers to be an array");
    }
  });
});

describe("SpacedRepetitionSystemData", () => {
  testFor("Real SpacedRepetitionSystemData", ({ spacedRepetitionSystemData }) => {
    assertType<SpacedRepetitionSystemData>(spacedRepetitionSystemData);
  });
});

describe("SpacedRepetitionSystem", () => {
  testFor("Real SpacedRepetitionSystem", ({ spacedRepetitionSystem }) => {
    assertType<SpacedRepetitionSystem>(spacedRepetitionSystem);
  });
});

describe("SpacedRepetitionSystemCollection", () => {
  testFor("Real SpacedRepetitionSystemCollection", ({ spacedRepetitionSystemCollection }) => {
    assertType<SpacedRepetitionSystemCollection>(spacedRepetitionSystemCollection);
  });
});
