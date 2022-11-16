import { expect, it } from "@jest/globals";
import { isWKSrsStageNumberArray } from "../../src/base/v20170710";
import type { WKSrsStageNumber } from "../../src/base/v20170710";

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

	expect(isWKSrsStageNumberArray(false)).toBe(false);
	expect(isWKSrsStageNumberArray(null)).toBe(false);
	expect(isWKSrsStageNumberArray(undefined)).toBe(false);
	expect(isWKSrsStageNumberArray(obj)).toBe(false);
	expect(isWKSrsStageNumberArray(symbol)).toBe(false);
	expect(isWKSrsStageNumberArray(func)).toBe(false);
	expect(isWKSrsStageNumberArray(number)).toBe(false);
	expect(isWKSrsStageNumberArray(bigInt)).toBe(false);
	expect(isWKSrsStageNumberArray(string)).toBe(false);
});

it("Returns false on empty arrays", () => {
	const emptyArray: WKSrsStageNumber[] = [];
	expect(isWKSrsStageNumberArray(emptyArray)).toBe(false);
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
	expect(isWKSrsStageNumberArray(stringArray)).toBe(false);
	expect(isWKSrsStageNumberArray(arrayOfObjects)).toBe(false);
	expect(isWKSrsStageNumberArray(mixedArray)).toBe(false);
});

it("Returns false if array contains numbers out of range", () => {
	const outOfRangeArray = [-1, 10];
	expect(isWKSrsStageNumberArray(outOfRangeArray)).toBe(false);
});

it("Returns true on array of valid WaniKani SRS Stage numbers", () => {
	const srsStageArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	expect(isWKSrsStageNumberArray(srsStageArray)).toBe(true);
});
