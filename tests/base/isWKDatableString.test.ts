import { expect, it } from "@jest/globals";
import { isWKDatableString } from "../../src/base/v20170710";

it("Returns false on non-strings", () => {
	const obj = {
		property1: "cheesecake",
	};
	const symbol = Symbol("foo");
	const func = function () {
		return true;
	};
	const number = 42;
	const bigInt = 0x0099ffn;

	expect(isWKDatableString(false)).toBe(false);
	expect(isWKDatableString(null)).toBe(false);
	expect(isWKDatableString(undefined)).toBe(false);
	expect(isWKDatableString(obj)).toBe(false);
	expect(isWKDatableString(symbol)).toBe(false);
	expect(isWKDatableString(func)).toBe(false);
	expect(isWKDatableString(number)).toBe(false);
	expect(isWKDatableString(bigInt)).toBe(false);
});

it("Returns false on invalid/incomplete date-time strings", () => {
	const invalidString = "This string is completely invalid.";
	const stringWithOnlyDate = "2022-10-31";
	const stringWithBadYear = "800-10-31T12:00:00.000000Z";
	const stringWithBadMonth = "2022-13-31T12:00:00.000000Z";
	const stringWithBadLeapDay = "2021-02-29T12:00:00.000000Z";
	const stringsWithBadDays = [
		"2022-10-32T12:00:00.000000Z",
		"2022-09-31T12:00:00.000000Z",
		"2022-02-30T12:00:00.000000Z",
	];
	const stringWithBadHour = "2022-10-31T25:00:00.000000Z";
	const stringWithBadMinute = "2022-10-31T12:60:00.000000Z";
	const stringWithBadSecond = "2022-10-31T12:00:60.000000Z";
	const stringWithBadMicroseconds = "2022-10-31T12:00:00.1234567Z";
	const stringWithBadUtcOffset = "2022-10-31T12:00:00.000000Y";
	const stringWithOffsetPlusMinus = "2022-10-31T12:00:00.000000=00:00";
	const stringWithOffsetHours = "2022-10-31T12:00:00.000000+25:00";
	const stringWithOffsetMinutes = "2022-10-31T12:00:00.000000+00:60";

	expect(isWKDatableString(invalidString)).toBe(false);
	expect(isWKDatableString(stringWithOnlyDate)).toBe(false);
	expect(isWKDatableString(stringWithBadYear)).toBe(false);
	expect(isWKDatableString(stringWithBadMonth)).toBe(false);
	expect(isWKDatableString(stringWithBadLeapDay)).toBe(false);
	stringsWithBadDays.forEach((month) => {
		expect(isWKDatableString(month)).toBe(false);
	});
	expect(isWKDatableString(stringWithBadHour)).toBe(false);
	expect(isWKDatableString(stringWithBadMinute)).toBe(false);
	expect(isWKDatableString(stringWithBadSecond)).toBe(false);
	expect(isWKDatableString(stringWithBadMicroseconds)).toBe(false);
	expect(isWKDatableString(stringWithBadUtcOffset)).toBe(false);
	expect(isWKDatableString(stringWithOffsetPlusMinus)).toBe(false);
	expect(isWKDatableString(stringWithOffsetHours)).toBe(false);
	expect(isWKDatableString(stringWithOffsetMinutes)).toBe(false);
});

it("Returns true on valid ISO-8601 date-time strings", () => {
	const dateTimeUtcString = "2022-10-23T15:17:38.828455Z";
	const dateTimeOffsetString = "2022-10-23T15:17:38.828455+09:00";
	const validLeapYear = "2020-02-29T12:00:00.000000Z";
	const date = new Date();
	const dateIsoString = date.toISOString();

	expect(isWKDatableString(dateTimeUtcString)).toBe(true);
	expect(isWKDatableString(dateTimeOffsetString)).toBe(true);
	expect(isWKDatableString(dateIsoString)).toBe(true);
	expect(isWKDatableString(validLeapYear)).toBe(true);
});
