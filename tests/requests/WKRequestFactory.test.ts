import { expect, it } from "@jest/globals";
import type { WKAssignmentParameters, WKAssignmentPayload } from "../../src/assignments/v20170710";
import type { WKReviewParameters, WKReviewPayload } from "../../src/reviews/v20170710";
import type {
	WKStudyMaterialCreatePayload,
	WKStudyMaterialParameters,
	WKStudyMaterialUpdatePayload,
} from "../../src/study-materials/v20170710";
import type { WKLevelProgressionParameters } from "../../src/level-progressions/v20170710";
import type { WKResetParameters } from "../../src/resets/v20170710";
import type { WKReviewStatisticParameters } from "../../src/review-statistics/v20170710";
import type { WKSpacedRepetitionSystemParameters } from "../../src/spaced-repetition-systems/v20170710";
import type { WKSubjectParameters } from "../../src/subjects/v20170710";
import type { WKUserPreferencesPayload } from "../../src/user/v20170710";
import type { WKVoiceActorParameters } from "../../src/voice-actors/v20170710";
import { WKRequestFactory } from "../../src/requests/v20170710";

const getOptions = {
	ifModifiedSince: "Tue, 14 Mar 2023, 12:00:00 GMT",
	ifNoneMatch: `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
	customHeaders: {
		"X-Forwarded-For": "192.168.1.1",
	},
};

const putPostOptions = {
	customHeaders: {
		"X-Forwarded-For": "192.168.1.1",
	},
};

const wanikani = new WKRequestFactory({ apiToken: "abc", revision: "20170710" });

it("Returns GET request for an Assignment Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/assignments";
	const expectedUrl2 = "https://api.wanikani.com/v2/assignments?unlocked=true&hidden=false";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKAssignmentParameters = {
		unlocked: true,
		hidden: false,
	};

	const request1 = wanikani.assignments.get({}, getOptions);
	const request2 = wanikani.assignments.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for an Assignment", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/assignments/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = wanikani.assignments.get(123);

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
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedBody = `{"started_at":"2023-02-04T15:30:00.000Z"}`;

	const payload: WKAssignmentPayload = {
		started_at: new Date("2023-02-04T15:30:00.000Z"),
	};

	const request = wanikani.assignments.start(123, payload, putPostOptions);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Level Progression Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/level_progressions";
	const expectedUrl2 =
		"https://api.wanikani.com/v2/level_progressions?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKLevelProgressionParameters = {
		ids: [1, 2, 3],
		updated_after: new Date("2023-03-01T12:00:00.000Z"),
	};

	const request1 = wanikani.levelProgressions.get({}, getOptions);
	const request2 = wanikani.levelProgressions.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Level Progression", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/level_progressions/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = wanikani.levelProgressions.get(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Reset Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/resets";
	const expectedUrl2 = "https://api.wanikani.com/v2/resets?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKResetParameters = {
		ids: [1, 2, 3],
		updated_after: new Date("2023-03-01T12:00:00.000Z"),
	};

	const request1 = wanikani.resets.get({}, getOptions);
	const request2 = wanikani.resets.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Reset", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/resets/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = wanikani.resets.get(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Review Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/reviews";
	const expectedUrl2 = "https://api.wanikani.com/v2/reviews?assignment_ids=1,2,3&subject_ids=4,5,6";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKReviewParameters = {
		assignment_ids: [1, 2, 3],
		subject_ids: [4, 5, 6],
	};

	const request1 = wanikani.reviews.get({}, getOptions);
	const request2 = wanikani.reviews.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Review", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/reviews/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = wanikani.reviews.get(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns POST request for creating a Reviews", () => {
	const expectedMethod = "POST";
	const expectedUrl = "https://api.wanikani.com/v2/reviews";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"Content-Type": "application/json",
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedBody = `{"review":{"subject_id":123,"incorrect_meaning_answers":0,"incorrect_reading_answers":0}}`;

	const payload: WKReviewPayload = {
		review: {
			subject_id: 123,
			incorrect_meaning_answers: 0,
			incorrect_reading_answers: 0,
		},
	};

	const request = wanikani.reviews.create(payload, putPostOptions);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Review Statistic Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/review_statistics";
	const expectedUrl2 = "https://api.wanikani.com/v2/review_statistics?subject_ids=1,2,3&percentages_greater_than=90";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKReviewStatisticParameters = {
		subject_ids: [1, 2, 3],
		percentages_greater_than: 90,
	};

	const request1 = wanikani.reviewStatistics.get({}, getOptions);
	const request2 = wanikani.reviewStatistics.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Review Statistic", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/review_statistics/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = wanikani.reviewStatistics.get(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Spaced Repetition System Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/spaced_repetition_systems";
	const expectedUrl2 =
		"https://api.wanikani.com/v2/spaced_repetition_systems?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKSpacedRepetitionSystemParameters = {
		ids: [1, 2, 3],
		updated_after: new Date("2023-03-01T12:00:00.000Z"),
	};

	const request1 = wanikani.spacedRepetitionSystems.get({}, getOptions);
	const request2 = wanikani.spacedRepetitionSystems.get(params);
	const request3 = wanikani.srs.get({}, getOptions);
	const request4 = wanikani.srs.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);

	expect(request3.method).toBe(expectedMethod);
	expect(request3.url).toBe(expectedUrl1);
	expect(request3.headers).toStrictEqual(expectedHeaders1);
	expect(request3.body).toBe(expectedBody);

	expect(request4.method).toBe(expectedMethod);
	expect(request4.url).toBe(expectedUrl2);
	expect(request4.headers).toStrictEqual(expectedHeaders2);
	expect(request4.body).toBe(expectedBody);
});

it("Returns GET request for a Spaced Repetition System", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/spaced_repetition_systems/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request1 = wanikani.spacedRepetitionSystems.get(123);
	const request2 = wanikani.srs.get(123);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl);
	expect(request1.headers).toStrictEqual(expectedHeaders);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl);
	expect(request2.headers).toStrictEqual(expectedHeaders);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Study Material Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/study_materials";
	const expectedUrl2 = "https://api.wanikani.com/v2/study_materials?subject_ids=1,2,3&subject_types=kanji";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKStudyMaterialParameters = {
		subject_ids: [1, 2, 3],
		subject_types: ["kanji"],
	};

	const request1 = wanikani.studyMaterials.get({}, getOptions);
	const request2 = wanikani.studyMaterials.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Study Material", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/study_materials/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = wanikani.studyMaterials.get(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns POST request for creating a Study Material", () => {
	const expectedMethod = "POST";
	const expectedUrl = "https://api.wanikani.com/v2/study_materials";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"Content-Type": "application/json",
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedBody = `{"subject_id":123,"meaning_note":"A note","reading_note":"B note","meaning_synonyms":["one","two","three"]}`;

	const payload: WKStudyMaterialCreatePayload = {
		subject_id: 123,
		meaning_note: "A note",
		reading_note: "B note",
		meaning_synonyms: ["one", "two", "three"],
	};

	const request = wanikani.studyMaterials.create(payload, putPostOptions);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns PUT request for updating a Study Material", () => {
	const expectedMethod = "PUT";
	const expectedUrl = "https://api.wanikani.com/v2/study_materials/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"Content-Type": "application/json",
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedBody = `{"meaning_note":"A note","reading_note":"B note","meaning_synonyms":["one","two","three"]}`;

	const payload: WKStudyMaterialUpdatePayload = {
		meaning_note: "A note",
		reading_note: "B note",
		meaning_synonyms: ["one", "two", "three"],
	};

	const request = wanikani.studyMaterials.update(123, payload, putPostOptions);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Subject Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/subjects";
	const expectedUrl2 = "https://api.wanikani.com/v2/subjects?types=radical,kanji&levels=1,2,3";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKSubjectParameters = {
		types: ["radical", "kanji"],
		levels: [1, 2, 3],
	};

	const request1 = wanikani.subjects.get({}, getOptions);
	const request2 = wanikani.subjects.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Subject", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/subjects/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = wanikani.subjects.get(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Summary", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/summary";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedBody = null;

	const request = wanikani.summary.get(getOptions);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a User", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/user";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedBody = null;

	const request = wanikani.user.get(getOptions);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns PUT request for updating a User", () => {
	const expectedMethod = "PUT";
	const expectedUrl = "https://api.wanikani.com/v2/user";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"Content-Type": "application/json",
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedBody = `{"user":{"preferences":{"default_voice_actor_id":1,"lessons_autoplay_audio":true,"lessons_batch_size":10}}}`;

	const payload: WKUserPreferencesPayload = {
		user: {
			preferences: {
				default_voice_actor_id: 1,
				lessons_autoplay_audio: true,
				lessons_batch_size: 10,
			},
		},
	};

	const request = wanikani.user.updatePreferences(payload, putPostOptions);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Returns GET request for a Voice Actor Collection", () => {
	const expectedMethod = "GET";
	const expectedUrl1 = "https://api.wanikani.com/v2/voice_actors";
	const expectedUrl2 = "https://api.wanikani.com/v2/voice_actors?ids=1,2,3&updated_after=2023-03-01T12:00:00.000Z";
	const expectedHeaders1 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"If-Modified-Since": "Tue, 14 Mar 2023, 12:00:00 GMT",
		"If-None-Match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
		"X-Forwarded-For": "192.168.1.1",
	};
	const expectedHeaders2 = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const params: WKVoiceActorParameters = {
		ids: [1, 2, 3],
		updated_after: new Date("2023-03-01T12:00:00.000Z"),
	};

	const request1 = wanikani.voiceActors.get({}, getOptions);
	const request2 = wanikani.voiceActors.get(params);

	expect(request1.method).toBe(expectedMethod);
	expect(request1.url).toBe(expectedUrl1);
	expect(request1.headers).toStrictEqual(expectedHeaders1);
	expect(request1.body).toBe(expectedBody);

	expect(request2.method).toBe(expectedMethod);
	expect(request2.url).toBe(expectedUrl2);
	expect(request2.headers).toStrictEqual(expectedHeaders2);
	expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Voice Actor", () => {
	const expectedMethod = "GET";
	const expectedUrl = "https://api.wanikani.com/v2/voice_actors/123";
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
	};
	const expectedBody = null;

	const request = wanikani.voiceActors.get(123);

	expect(request.method).toBe(expectedMethod);
	expect(request.url).toBe(expectedUrl);
	expect(request.headers).toStrictEqual(expectedHeaders);
	expect(request.body).toBe(expectedBody);
});

it("Changes API Token using setApiToken()", () => {
	const expectedHeaders = {
		Authorization: "Bearer def",
		"Wanikani-Revision": "20170710",
	};

	const factory = new WKRequestFactory({ apiToken: "abc" });
	const request = factory.setApiToken("def").assignments.get(123);
	expect(request.headers).toStrictEqual(expectedHeaders);
});

it("Adds any new headers to requests using addCustomHeaders()", () => {
	const customHeaders1 = {
		"X-Forwarded-For": "192.168.1.1",
	};
	const customHeaders2 = {
		"X-Proxy-Token": "def",
	};
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"X-Forwarded-For": "192.168.1.1",
		"X-Proxy-Token": "def",
	};
	const factory = new WKRequestFactory({ apiToken: "abc", customHeaders: customHeaders1 });
	const request = factory.addCustomHeaders(customHeaders2).assignments.get(123);
	expect(request.headers).toStrictEqual(expectedHeaders);
});

it("Replaces custom headers only with setCustomHeaders()", () => {
	const customHeaders1 = {
		"X-Forwarded-For": "192.168.1.1",
	};
	const customHeaders2 = {
		"X-Proxy-Token": "def",
	};
	const expectedHeaders = {
		Authorization: "Bearer abc",
		"Wanikani-Revision": "20170710",
		"X-Proxy-Token": "def",
	};
	const factory = new WKRequestFactory({ apiToken: "abc", customHeaders: customHeaders1 });
	const request = factory.setCustomHeaders(customHeaders2).assignments.get(123);
	expect(request.headers).toStrictEqual(expectedHeaders);
});

it("Throws when trying to set type-checked headers", () => {
	const factory = new WKRequestFactory({ apiToken: "abc" });
	expect(() => factory.addCustomHeaders({ Authorization: "Cheese" })).toThrow(
		"WaniKani API Token should be set via setApiToken() method.",
	);
	expect(() => factory.addCustomHeaders({ "Wanikani-Revision": "Cheese" })).toThrow(
		"WaniKani API Revision should be set via setApiRevision() method.",
	);
	expect(() => factory.addCustomHeaders({ Accept: "Cheese" })).toThrow(
		`The "Accept" header must be set to "application/json`,
	);
	expect(() => factory.addCustomHeaders({ "Content-Type": "Cheese" })).toThrow(
		`The "Content-Type" header must be set to "application/json`,
	);
});
