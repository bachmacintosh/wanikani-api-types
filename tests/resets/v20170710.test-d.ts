import type { Reset, ResetCollection } from "../../src/resets/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

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
