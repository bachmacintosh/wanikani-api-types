import { expect, it } from "@jest/globals";
import { isWKLevel } from "../../src/base/v20170710";

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

  expect(isWKLevel(false)).toBe(false);
  expect(isWKLevel(null)).toBe(false);
  expect(isWKLevel(undefined)).toBe(false);
  expect(isWKLevel(obj)).toBe(false);
  expect(isWKLevel(symbol)).toBe(false);
  expect(isWKLevel(func)).toBe(false);
  expect(isWKLevel(bigInt)).toBe(false);
  expect(isWKLevel(string)).toBe(false);
  expect(isWKLevel(array)).toBe(false);
});

it("Returns false on numbers out of range", () => {
  expect(isWKLevel(-1)).toBe(false);
  expect(isWKLevel(0)).toBe(false);
  expect(isWKLevel(61)).toBe(false);
});

it("Returns false on non-integers", () => {
  expect(isWKLevel(4.2)).toBe(false);
});

it("Returns true on valid WaniKani Levels", () => {
  for (let i = 1; i <= 60; i++) {
    expect(isWKLevel(i)).toBe(true);
  }
});
