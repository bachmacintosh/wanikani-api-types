import type {
  LevelProgression,
  LevelProgressionCollection,
  LevelProgressionData,
} from "../../src/level-progressions/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("LevelProgressionData", () => {
  testFor("Real LevelProgressionData", ({ levelProgressionData }) => {
    assertType<LevelProgressionData>(levelProgressionData);
  });
});

describe("LevelProgression", () => {
  testFor("Real LevelProgression", ({ levelProgression }) => {
    assertType<LevelProgression>(levelProgression);
  });
});

describe("LevelProgressionCollection", () => {
  testFor("Real LevelProgressionCollection", ({ levelProgressionCollection }) => {
    assertType<LevelProgressionCollection>(levelProgressionCollection);
  });
});
