import { expect, it } from "@jest/globals";
import type { WKStudyMaterialCreatePayload, WKStudyMaterialUpdatePayload } from "../../src/study-materials/v20170710";
import type { WKUserPreferences, WKUserPreferencesPayload } from "../../src/user/v20170710";
import type { WKAssignmentPayload } from "../../src/assignments/v20170710";
import type { WKReviewPayload } from "../../src/reviews/v20170710";
import { validatePayload } from "../../src/base/v20170710";

const assignmentStartPayload: Required<WKAssignmentPayload> = {
	started_at: new Date(),
};
const reviewCreatePayloadAssignment: Required<WKReviewPayload> = {
	review: {
		assignment_id: 1,
		incorrect_meaning_answers: 0,
		incorrect_reading_answers: 0,
	},
};
const reviewCreatePayloadSubject: Required<WKReviewPayload> = {
	review: {
		subject_id: 1,
		incorrect_meaning_answers: 0,
		incorrect_reading_answers: 0,
	},
};
const studyMaterialCreatePayload: Required<WKStudyMaterialCreatePayload> = {
	subject_id: 1,
	meaning_synonyms: ["one"],
	meaning_note: "one",
	reading_note: "one",
};
const studyMaterialUpdatePayload: Required<WKStudyMaterialUpdatePayload> = {
	meaning_synonyms: ["one"],
	meaning_note: "one",
	reading_note: "one",
};
const preferences: Required<WKUserPreferences> = {
	default_voice_actor_id: 1,
	extra_study_autoplay_audio: true,
	lessons_autoplay_audio: true,
	lessons_batch_size: 3,
	lessons_presentation_order: "ascending_level_then_subject",
	reviews_autoplay_audio: true,
	reviews_display_srs_indicator: true,
	reviews_presentation_order: "shuffled",
};
const userPreferencesPayload: Required<WKUserPreferencesPayload> = {
	user: {
		preferences,
	},
};

it("Successfully validates Assignment Start Payloads", () => {
	expect(validatePayload("PUT /assignments/<id>/start", assignmentStartPayload)).toBe(undefined);
});

it("Successfully validates Review Create Payloads", () => {
	expect(validatePayload("POST /reviews", reviewCreatePayloadAssignment)).toBe(undefined);
	expect(validatePayload("POST /reviews", reviewCreatePayloadSubject)).toBe(undefined);
});

it("Successfully validates Study Material Create Payloads", () => {
	expect(validatePayload("POST /study_materials", studyMaterialCreatePayload)).toBe(undefined);
});

it("Successfully validates Study Material Update Payloads", () => {
	expect(validatePayload("PUT /study_materials/<id>", studyMaterialUpdatePayload)).toBe(undefined);
});

it("Successfully validates User Preferences Update Payloads", () => {
	expect(validatePayload("PUT /user", userPreferencesPayload)).toBe(undefined);
});

it("Throws errors on bad payloads", () => {
	/// @ts-expect-error
	expect(() => validatePayload("POST /reviews", assignmentStartPayload)).toThrow(
		/Key "(?<name>\w+?)" is not valid for a payload sent to POST \/reviews \./u,
	);
	/// @ts-expect-error
	expect(() => validatePayload("POST /study_materials", assignmentStartPayload)).toThrow(
		/Key "(?<name>\w+?)" is not valid for a payload sent to POST \/study_materials \./u,
	);
	/// @ts-expect-error
	expect(() => validatePayload("PUT /assignments/<id>/start", reviewCreatePayloadAssignment)).toThrow(
		/Key "(?<name>\w+?)" is not valid for a payload sent to PUT \/assignments\/<id>\/start \./u,
	);
	expect(() => validatePayload("PUT /study_materials/<id>", studyMaterialCreatePayload)).toThrow(
		/Key "(?<name>\w+?)" is not valid for a payload sent to PUT \/study_materials\/<id> \./u,
	);
	/// @ts-expect-error
	expect(() => validatePayload("PUT /user", assignmentStartPayload)).toThrow(
		/Key "(?<name>\w+?)" is not valid for a payload sent to PUT \/user \./u,
	);
});
