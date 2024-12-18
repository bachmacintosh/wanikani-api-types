import * as v from "valibot";
import { expect, describe, test } from "vitest";
import { ApiRevision, DatableString } from "../../src/base/v20170710";

describe("Revision 20170710: Base", () => {
  test("ApiRevision", () => {
    const apiRevision: ApiRevision = "20170710";
    expect(() => v.parse(ApiRevision, apiRevision)).not.toThrow();
  });
  test("DatableString", () => {
    const dateTimeUtcString = "2022-10-23T15:17:38.828455Z";
    const dateTimeOffsetString = "2022-10-23T15:17:38.828455+09:00";
    const validLeapYear = "2020-02-29T12:00:00.000000Z";
    const dateIsoString = new Date().toISOString();

    expect(() => v.parse(DatableString, dateTimeUtcString)).not.toThrow();
    expect(() => v.parse(DatableString, dateTimeOffsetString)).not.toThrow();
    expect(() => v.parse(DatableString, validLeapYear)).not.toThrow();
    expect(() => v.parse(DatableString, dateIsoString)).not.toThrow();
  });
});
