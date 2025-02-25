import * as v from "valibot";
import { Reset, ResetCollection, isReset, isResetCollection } from "../../src/resets/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("Reset", () => {
  testFor("Real Reset", ({ reset }) => {
    expect(() => v.assert(Reset, reset)).not.toThrow();
    expect(isReset(reset)).toBe(true);
  });
});

describe("ResetCollection", () => {
  testFor("Real ResetCollection", ({ resetCollection }) => {
    expect(() => v.assert(ResetCollection, resetCollection)).not.toThrow();
    expect(isResetCollection(resetCollection)).toBe(true);
  });
});
