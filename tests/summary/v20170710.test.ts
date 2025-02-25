import * as v from "valibot";
import { Summary, isSummary } from "../../src/summary/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("Summary", () => {
  testFor("Real Summary", ({ summary }) => {
    expect(() => v.assert(Summary, summary)).not.toThrow();
    expect(isSummary(summary)).toBe(true);
  });
});
