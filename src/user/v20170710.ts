import type {
	WKDatableString,
	WKLevel,
	WKMaxLessonBatchSize,
	WKMaxLevels,
	WKMinLessonBatchSize,
	WKMinLevels,
	WKResource,
} from "../v20170710.js";
import type { Range } from "../internal/index.js";

/**
 * A user and their status/information on WaniKani.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 * @category Resources
 * @category User
 */
export interface WKUser extends WKResource {
	id?: never;

	/**
	 * The kind of object returned.
	 */
	object: "user";

	/**
	 * Data for the returned user.
	 */
	data: WKUserData;
}

/**
 * Data for a user returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 * @category Data
 * @category User
 */
export interface WKUserData {
	/**
	 * If the user is on vacation, this will be the timestamp of when that vacation started. If the user is not on
	 * vacation, this is `null`.
	 */
	current_vacation_started_at: WKDatableString | null;

	/**
	 * A user's unique ID string.
	 */
	id: string;

	/**
	 * The current level of the user. This ignores subscription status.
	 */
	level: WKLevel;

	/**
	 * User settings specific to the WaniKani application.
	 */
	preferences: WKUserPreferences;

	/**
	 * The URL to the user's public facing profile page.
	 */
	profile_url: string;

	/**
	 * The signup date for the user.
	 */
	started_at: WKDatableString;

	/**
	 * Details about the user's subscription state.
	 */
	subscription: WKUserSubscription;

	/**
	 * The user's username.
	 */
	username: string;
}

/**
 * User settings specific to the WaniKani application.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 * @category User
 */
export interface WKUserPreferences {
	/**
	 * The voice actor to be used for lessons and reviews. The value is associated to
	 * `subject.pronunciation_audios.metadata.voice_actor_id`.
	 */
	default_voice_actor_id: number;

	/**
	 * Automatically play pronunciation audio for vocabulary during extra study.
	 */
	extra_study_autoplay_audio: boolean;

	/**
	 * Automatically play pronunciation audio for vocabulary during lessons.
	 */
	lessons_autoplay_audio: boolean;

	/**
	 * Number of subjects introduced to the user during lessons before quizzing.
	 */
	lessons_batch_size: Range<WKMinLessonBatchSize, WKMaxLessonBatchSize>;

	/**
	 * The order in which lessons are presented. The options are `ascending_level_then_subject`, `shuffled`, and
	 * `ascending_level_then_shuffled`. The default (and best experience) is `ascending_level_then_subject`.
	 */
	lessons_presentation_order: "ascending_level_then_shuffled" | "ascending_level_then_subject" | "shuffled";

	/**
	 * Automatically play pronunciation audio for vocabulary during reviews.
	 */
	reviews_autoplay_audio: boolean;

	/**
	 * Toggle for display SRS change indicator after a subject has been completely answered during review.
	 */
	reviews_display_srs_indicator: boolean;

	/**
	 * The order in which reviews are presented. The options are `lower_levels_first` and `shuffled`.
	 */
	reviews_presentation_order: "lower_levels_first" | "shuffled";

	/**
	 * Whether or not the user has enabled Script Compatibility Mode in the WaniKani app.
	 */
	wanikani_compatibility_mode: boolean;
}

/**
 * The payload sent to the WaniKani API to update a user's preferences.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#update-user-information}
 * @category Payloads
 * @category User
 */
export interface WKUserPreferencesPayload {
	/**
	 * The user object, as part of the payload.
	 */
	user: {
		/**
		 * The user preferences to be updated; only those specified in the object will be updated.
		 */
		preferences: Partial<WKUserPreferences>;
	};
}

/**
 * Details about the user's subscription state.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#user}
 * @category User
 */
export interface WKUserSubscription {
	/**
	 * Whether or not the user currently has a paid subscription.
	 */
	active: boolean;

	/**
	 * The maximum level of content accessible to the user for lessons, reviews, and content review. For unsubscribed/free
	 * users, the maximum level is `3`. For subscribed users, this is `60`.
	 *
	 * **Any application that uses data from the WaniKani API must respect these access limits.**
	 */
	max_level_granted: WKMaxLevels | WKMinLevels;

	/**
	 * The date when the user's subscription period ends. If the user has subscription type `lifetime` or `free` then the
	 * value is `null`.
	 */
	period_ends_at: WKDatableString | null;

	/**
	 * The type of subscription the user has. Options are following: `free`, `recurring`, and `lifetime`. A type of
	 * `unknown` means the user subscription state isn't exactly known. This is a weird state on WaniKani, should be
	 * treated as `free`, and reported to the WaniKani developers.
	 */
	type: "free" | "lifetime" | "recurring" | "unknown";
}
