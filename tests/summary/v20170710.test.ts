import * as v from "valibot";
import { describe, expect } from "vitest";
import { Summary } from "../../src/summary/v20170710.js";
import { testFor } from "../fixtures/v20170710.js";

describe("Summary", () => {
  testFor("Real Summary", ({ summary }) => {
    expect(() => v.assert(Summary, summary)).not.toThrow();
  });
});
