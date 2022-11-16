import { expect, it } from "@jest/globals";
import { isWKSrsStageNumber } from "../../src/base/v20170710";

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

	expect(isWKSrsStageNumber(false)).toBe(false);
	expect(isWKSrsStageNumber(null)).toBe(false);
	expect(isWKSrsStageNumber(undefined)).toBe(false);
	expect(isWKSrsStageNumber(obj)).toBe(false);
	expect(isWKSrsStageNumber(symbol)).toBe(false);
	expect(isWKSrsStageNumber(func)).toBe(false);
	expect(isWKSrsStageNumber(bigInt)).toBe(false);
	expect(isWKSrsStageNumber(string)).toBe(false);
	expect(isWKSrsStageNumber(array)).toBe(false);
});

it("Returns false on numbers out of range", () => {
	expect(isWKSrsStageNumber(-1)).toBe(false);
	expect(isWKSrsStageNumber(10)).toBe(false);
});

it("Returns false on non-integers", () => {
	expect(isWKSrsStageNumber(4.2)).toBe(false);
});

it("Returns true on valid WaniKani SRS Stage numbers", () => {
	for (let i = 0; i <= 9; i++) {
		expect(isWKSrsStageNumber(i)).toBe(true);
	}
});
