import type { Reset, ResetCollection, ResetData } from "../../src/resets/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("ResetData", () => {
  testFor("Real ResetData", ({ resetData }) => {
    assertType<ResetData>(resetData);
  });
});

describe("Reset", () => {
  testFor("Real Reset", ({ reset }) => {
    assertType<Reset>(reset);
  });
});

describe("ResetCollection", () => {
  testFor("Real ResetCollection", ({ resetCollection }) => {
    assertType<ResetCollection>(resetCollection);
  });
});
