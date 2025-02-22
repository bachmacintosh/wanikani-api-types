import * as v from "valibot";
import { Reset, ResetCollection, ResetData } from "../../src/resets/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("ResetData", () => {
  testFor("Real ResetData", ({ resetData }) => {
    expect(() => v.assert(ResetData, resetData)).not.toThrow();
  });
});

describe("Reset", () => {
  testFor("Real Reset", ({ reset }) => {
    expect(() => v.assert(Reset, reset)).not.toThrow();
  });
});

describe("ResetCollection", () => {
  testFor("Real ResetCollection", ({ resetCollection }) => {
    expect(() => v.assert(ResetCollection, resetCollection)).not.toThrow();
  });
});
