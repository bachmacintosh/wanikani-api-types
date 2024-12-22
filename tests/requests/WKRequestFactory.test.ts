import { expect, it } from "vitest";
import type { AssignmentParameters, AssignmentPayload } from "../../src/assignments/v20170710";
import type { ReviewParameters, ReviewPayload } from "../../src/reviews/v20170710";
import type {
  StudyMaterialCreatePayload,
  StudyMaterialParameters,
  StudyMaterialUpdatePayload,
} from "../../src/study-materials/v20170710";
import type { LevelProgressionParameters } from "../../src/level-progressions/v20170710";
import type { ResetParameters } from "../../src/resets/v20170710";
import type { ReviewStatisticParameters } from "../../src/review-statistics/v20170710";
import type { SpacedRepetitionSystemParameters } from "../../src/spaced-repetition-systems/v20170710";
import type { SubjectParameters } from "../../src/subjects/v20170710";
import type { UserPreferencesPayload } from "../../src/user/v20170710";
import type { VoiceActorParameters } from "../../src/voice-actors/v20170710";
import { ApiRequestFactory, type ApiRequestOptions } from "../../src/requests/v20170710";

const getOptions: ApiRequestOptions = {
  customHeaders: {
    "x-forwarded-for": "192.168.1.1",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6\"`,
  },
};

const putPostOptions: ApiRequestOptions = {
  customHeaders: {
    "x-forwarded-for": "192.168.1.1",
  },
};

const wanikani = new ApiRequestFactory({ apiToken: "abc", revision: "20170710" });

it("Returns GET request for an Assignment Collection", () => {
  const expectedMethod = "GET";
  const expectedUrl1 = "https://api.wanikani.com/v2/assignments";
  const expectedUrl2 = "https://api.wanikani.com/v2/assignments?hidden=false&unlocked=true";
  const expectedHeaders1 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: AssignmentParameters = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "content-type": "application/json",
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedBody = `{"assignment":{"started_at":"2023-02-04T15:30:00.000Z"}}`;

  const payload: AssignmentPayload = {
    assignment: {
      started_at: new Date("2023-02-04T15:30:00.000Z"),
    },
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: LevelProgressionParameters = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: ResetParameters = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: ReviewParameters = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "content-type": "application/json",
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedBody = `{"review":{"incorrect_meaning_answers":0,"incorrect_reading_answers":0,"subject_id":123}}`;

  const payload: ReviewPayload = {
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
  const expectedUrl2 = "https://api.wanikani.com/v2/review_statistics?percentages_greater_than=90&subject_ids=1,2,3";
  const expectedHeaders1 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: ReviewStatisticParameters = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: SpacedRepetitionSystemParameters = {
    ids: [1, 2, 3],
    updated_after: new Date("2023-03-01T12:00:00.000Z"),
  };

  const request1 = wanikani.spacedRepetitionSystems.get({}, getOptions);
  const request2 = wanikani.spacedRepetitionSystems.get(params);

  expect(request1.method).toBe(expectedMethod);
  expect(request1.url).toBe(expectedUrl1);
  expect(request1.headers).toStrictEqual(expectedHeaders1);
  expect(request1.body).toBe(expectedBody);

  expect(request2.method).toBe(expectedMethod);
  expect(request2.url).toBe(expectedUrl2);
  expect(request2.headers).toStrictEqual(expectedHeaders2);
  expect(request2.body).toBe(expectedBody);
});

it("Returns GET request for a Spaced Repetition System", () => {
  const expectedMethod = "GET";
  const expectedUrl = "https://api.wanikani.com/v2/spaced_repetition_systems/123";
  const expectedHeaders = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const request1 = wanikani.spacedRepetitionSystems.get(123);

  expect(request1.method).toBe(expectedMethod);
  expect(request1.url).toBe(expectedUrl);
  expect(request1.headers).toStrictEqual(expectedHeaders);
  expect(request1.body).toBe(expectedBody);
});

it("Returns GET request for a Study Material Collection", () => {
  const expectedMethod = "GET";
  const expectedUrl1 = "https://api.wanikani.com/v2/study_materials";
  const expectedUrl2 = "https://api.wanikani.com/v2/study_materials?subject_ids=1,2,3&subject_types=kanji";
  const expectedHeaders1 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: StudyMaterialParameters = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "content-type": "application/json",
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedBody = `{"meaning_note":"A note","meaning_synonyms":["one","two","three"],"reading_note":"B note","subject_id":123}`;

  const payload: StudyMaterialCreatePayload = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "content-type": "application/json",
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedBody = `{"meaning_note":"A note","meaning_synonyms":["one","two","three"],"reading_note":"B note"}`;

  const payload: StudyMaterialUpdatePayload = {
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
  const expectedUrl2 = "https://api.wanikani.com/v2/subjects?levels=1,2,3&types=radical,kanji";
  const expectedHeaders1 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: SubjectParameters = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "content-type": "application/json",
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedBody = `{"user":{"preferences":{"default_voice_actor_id":1,"lessons_autoplay_audio":true,"lessons_batch_size":10}}}`;

  const payload: UserPreferencesPayload = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "if-modified-since": "Tue, 14 Mar 2023, 12:00:00 GMT",
    "if-none-match": `W/"70abc5970f2ab8cd34adcfad015ffde6"`,
    "x-forwarded-for": "192.168.1.1",
  };
  const expectedHeaders2 = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
  };
  const expectedBody = null;

  const params: VoiceActorParameters = {
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
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
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
    authorization: "Bearer def",
    "wanikani-revision": "20170710",
  };

  const factory = new ApiRequestFactory({ apiToken: "abc" });
  const request = factory.setApiToken("def").assignments.get(123);
  expect(request.headers).toStrictEqual(expectedHeaders);
});

it("Adds any new headers to requests using addCustomHeaders()", () => {
  const customHeaders1 = {
    "x-forwarded-for": "192.168.1.1",
  };
  const customHeaders2 = {
    "X-Proxy-Token": "def",
  };
  const expectedHeaders = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "x-forwarded-for": "192.168.1.1",
    "X-Proxy-Token": "def",
  };
  const factory = new ApiRequestFactory({ apiToken: "abc", customHeaders: customHeaders1 });
  const request = factory.addCustomHeaders(customHeaders2).assignments.get(123);
  expect(request.headers).toStrictEqual(expectedHeaders);
});

it("Replaces custom headers only with setCustomHeaders()", () => {
  const customHeaders1 = {
    "x-forwarded-for": "192.168.1.1",
  };
  const customHeaders2 = {
    "X-Proxy-Token": "def",
  };
  const expectedHeaders = {
    authorization: "Bearer abc",
    "wanikani-revision": "20170710",
    "X-Proxy-Token": "def",
  };
  const factory = new ApiRequestFactory({ apiToken: "abc", customHeaders: customHeaders1 });
  const request = factory.setCustomHeaders(customHeaders2).assignments.get(123);
  expect(request.headers).toStrictEqual(expectedHeaders);
});

it("Throws when trying to set type-checked headers", () => {
  const factory = new ApiRequestFactory({ apiToken: "abc" });
  expect(() => factory.addCustomHeaders({ authorization: "Cheese" })).toThrow(
    "WaniKani API Token should be set via setApiToken() method.",
  );
  expect(() => factory.addCustomHeaders({ "wanikani-revision": "Cheese" })).toThrow(
    "WaniKani API Revision should be set via setApiRevision() method.",
  );
  expect(() => factory.addCustomHeaders({ Accept: "Cheese" })).toThrow(
    `The "Accept" header must be set to "application/json`,
  );
  expect(() => factory.addCustomHeaders({ "content-type": "Cheese" })).toThrow(
    `The "content-type" header must be set to "application/json`,
  );
});
