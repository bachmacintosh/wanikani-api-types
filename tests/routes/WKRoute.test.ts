import { expect, it } from "@jest/globals";
import type { WKAssignmentParameters, WKAssignmentPayload } from "../../src/assignments/v20170710";
import type { WKLevelProgressionParameters } from "../../src/level-progressions/v20170710";
import type { WKResetParameters } from "../../src/resets/v20170710";
import { WKRoute } from "../../src/routes/v20170710";

it("Returns GET request for root of WaniKani API on init", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2";
	const expectedHeaders = {
		Authorization: "Bearer abc",
	};
	const expectedBody = null;

	const request = new WKRoute({ apiKey: "abc" });

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for an Assignment Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/assignments?unlocked=true&hidden=false";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKAssignmentParameters = {
		unlocked: true,
		hidden: false,
	};

	const request = new WKRoute({ apiKey: "abc", revision: "20170710" }).assignments(params);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for an Assignment", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/assignments/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = new WKRoute({ apiKey: "abc", revision: "20170710" }).assignments(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns PUT request for starting an Assignment", () => {
	const expectedMethod = "PUT";
	const expectedUrl = "https://api.wanikani.com/v2/assignments/123/start";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"Content-Type": "application/json",
	};
	const expectedBody = `{"started_at":"2023-02-04T15:30:00.000Z"}`;

	const payload: WKAssignmentPayload = {
		started_at: new Date("2023-02-04T15:30:00.000Z"),
	};

	const request = new WKRoute({ apiKey: "abc", revision: "20170710" }).assignments(123, "start", payload);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Level Progression Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/level_progressions?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKLevelProgressionParameters = {
		ids: [1, 2, 3],
		updated_after: new Date("2023-03-01T12:00:00.000Z"),
	};

	const request = new WKRoute({ apiKey: "abc", revision: "20170710" }).levelProgressions(params);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Level Progression", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/level_progressions/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = new WKRoute({ apiKey: "abc", revision: "20170710" }).levelProgressions(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Reset Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/resets?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKResetParameters = {
		ids: [1, 2, 3],
		updated_after: new Date("2023-03-01T12:00:00.000Z"),
	};

	const request = new WKRoute({ apiKey: "abc", revision: "20170710" }).resets(params);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Reset", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/resets/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = new WKRoute({ apiKey: "abc", revision: "20170710" }).resets(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});
