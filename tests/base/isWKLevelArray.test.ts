import { expect, it } from "@jest/globals";
import { isWKLevelArray } from "../../src/base/v20170710";
import type { WKLevel } from "../../src/base/v20170710";

it("Returns false on non-arrays", () => {
  const obj = {
    property1: "cheesecake",
  };
  const symbol = Symbol("foo");
  const func = function () {
    return true;
  };
  const number = 42;
  const bigInt = 0x0099ffn;
  const string = "Hello world";

  expect(isWKLevelArray(false)).toBe(false);
  expect(isWKLevelArray(null)).toBe(false);
  expect(isWKLevelArray(undefined)).toBe(false);
  expect(isWKLevelArray(obj)).toBe(false);
  expect(isWKLevelArray(symbol)).toBe(false);
  expect(isWKLevelArray(func)).toBe(false);
  expect(isWKLevelArray(number)).toBe(false);
  expect(isWKLevelArray(bigInt)).toBe(false);
  expect(isWKLevelArray(string)).toBe(false);
});

it("Returns false on empty arrays", () => {
  const emptyArray: WKLevel[] = [];
  expect(isWKLevelArray(emptyArray)).toBe(false);
});

it("Returns false on non-numeric arrays", () => {
  const stringArray = ["one", "two", "three"];
  const arrayOfObjects = [
    {
      a: "one",
    },
    { a: "two" },
    { a: 3 },
  ];
  const mixedArray = [1, "two", { c: 3, d: "four" }];
  expect(isWKLevelArray(stringArray)).toBe(false);
  expect(isWKLevelArray(arrayOfObjects)).toBe(false);
  expect(isWKLevelArray(mixedArray)).toBe(false);
});

it("Returns false if array contains numbers out of range", () => {
  const outOfRangeArray = [-1, 0, 61];
  expect(isWKLevelArray(outOfRangeArray)).toBe(false);
});

it("Returns true on array of valid WaniKani Levels", () => {
  const levelArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  ];
  expect(isWKLevelArray(levelArray)).toBe(true);
});
