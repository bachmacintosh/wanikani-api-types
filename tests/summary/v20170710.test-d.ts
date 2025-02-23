import { assertType, describe } from "vitest";
import type { Summary } from "../../src/summary/v20170710.js";
import { testFor } from "../fixtures/v20170710.js";

describe("Summary", () => {
  testFor("Real Summary", ({ summary }) => {
    assertType<Summary>(summary);
  });
});
