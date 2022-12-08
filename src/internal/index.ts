/**
 * A generic Brand type to brand basic types.
 *
 * @internal
 */

/* eslint-disable-next-line @typescript-eslint/naming-convention -- Need double undercore for Type Branding */
export type Brand<K, T> = K & { __brand: T };

/**
 * Tail-recursion for excluding numbers.
 *
 * Adapted from: https://stackoverflow.com/a/70307091
 *
 * @internal
 */

export type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

/**
 * A type that makes a given type's properties nullable.
 *
 * @internal
 */
export type Nullable<T> = { [K in keyof T]: Nullable<T[K]> | null };

/**
 * A range of numbers starting from number F to number T.
 *
 * E.g. Range<1, 10> = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
 *
 * Adapted from: https://stackoverflow.com/a/70307091
 *
 * @internal
 */

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>> | T;

/**
 * Checks if a given year, month, and day compose a valid date.
 *
 * @param year - A year number
 * @param month - A month number
 * @param day  - A day number
 * @returns `true` if the year, month, and day are a valid date, `false` if not.
 * @internal
 */
export function isValidDate(year: number, month: number, day: number): boolean {
	const fourYears = 4;
	const oneHundredYears = 100;
	const fourHundredYears = 400;
	const isLeapYear = (year % fourYears === 0 && year % oneHundredYears !== 0) || year % fourHundredYears === 0;
	const monthsInYear = 12;
	const thirtyOneDays = 31;
	const thirtyDays = 30;
	const twentyNineDays = 29;
	const months = {
		january: 1,
		february: 2,
		march: 3,
		april: 4,
		may: 5,
		june: 6,
		july: 7,
		august: 8,
		september: 9,
		october: 10,
		november: 11,
		december: 12,
	};
	const monthsWithThirtyDays = [months.april, months.june, months.september, months.november];
	const monthsWithThirtyOneDays = [
		months.january,
		months.march,
		months.may,
		months.july,
		months.august,
		months.october,
		months.december,
	];
	if (month > monthsInYear || month <= 0) {
		return false;
	}
	if (day <= 0) {
		return false;
	}
	if (monthsWithThirtyOneDays.includes(month) && day > thirtyOneDays) {
		return false;
	}
	if (monthsWithThirtyDays.includes(month) && day > thirtyDays) {
		return false;
	}
	if (month === months.february && ((isLeapYear && day >= thirtyDays) || (!isLeapYear && day >= twentyNineDays))) {
		return false;
	}
	return true;
}
