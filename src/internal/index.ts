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
