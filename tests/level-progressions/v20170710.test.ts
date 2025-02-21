import * as v from "valibot";
import {
  LevelProgression,
  LevelProgressionCollection,
  LevelProgressionData,
} from "../../src/level-progressions/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("LevelProgressionData", () => {
  testFor("Real LevelProgressionData", ({ levelProgressionData }) => {
    expect(() => v.assert(LevelProgressionData, levelProgressionData)).not.toThrow();
  });
});

describe("LevelProgression", () => {
  testFor("Real LevelProgression", ({ levelProgression }) => {
    expect(() => v.assert(LevelProgression, levelProgression)).not.toThrow();
  });
});

describe("LevelProgressionCollection", () => {
  testFor("Real LevelProgressionCollection", ({ levelProgressionCollection }) => {
    expect(() => v.assert(LevelProgressionCollection, levelProgressionCollection)).not.toThrow();
  });
});
