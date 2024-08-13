import { expect, it } from "vitest";
import { isWKLessonBatchSizeNumber } from "../../src/base/v20170710";

it("Returns false on non-numbers", () => {
  const obj = {
    property1: "cheesecake",
  };
  const symbol = Symbol("foo");
  const func = function () {
    return true;
  };
  const bigInt = 0x0099ffn;
  const string = "Hello world";
  const array: number[] = [];

  expect(isWKLessonBatchSizeNumber(false)).toBe(false);
  expect(isWKLessonBatchSizeNumber(null)).toBe(false);
  expect(isWKLessonBatchSizeNumber(undefined)).toBe(false);
  expect(isWKLessonBatchSizeNumber(obj)).toBe(false);
  expect(isWKLessonBatchSizeNumber(symbol)).toBe(false);
  expect(isWKLessonBatchSizeNumber(func)).toBe(false);
  expect(isWKLessonBatchSizeNumber(bigInt)).toBe(false);
  expect(isWKLessonBatchSizeNumber(string)).toBe(false);
  expect(isWKLessonBatchSizeNumber(array)).toBe(false);
});

it("Returns false on numbers out of range", () => {
  expect(isWKLessonBatchSizeNumber(2)).toBe(false);
  expect(isWKLessonBatchSizeNumber(11)).toBe(false);
});

it("Returns false on non-integers", () => {
  expect(isWKLessonBatchSizeNumber(4.2)).toBe(false);
});

it("Returns true on valid WaniKani Lesson Batch Size numbers", () => {
  for (let i = 3; i <= 10; i++) {
    expect(isWKLessonBatchSizeNumber(i)).toBe(true);
  }
});
