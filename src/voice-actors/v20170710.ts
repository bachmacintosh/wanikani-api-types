import type { WKCollection, WKCollectionParameters, WKDatableString, WKResource } from "../v20170710.js";

/**
 * Available voice actors used for vocabulary reading pronunciation audio.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#voice-actors}
 * @category Resources
 * @category Voice Actors
 */
export interface WKVoiceActor extends WKResource {
	/**
	 * A unique number identifying the voice actor.
	 */
	id: number;

	/**
	 * The kind of object returned.
	 */
	object: "voice_actor";

	/**
	 * Voice Actor data
	 */
	data: WKVoiceActorData;
}

/**
 * A collection of voice actors returned from the WaniKani API
 *
 * @category Collections
 * @category Voice Actors
 */
export interface WKVoiceActorCollection extends WKCollection {
	/**
	 * An array of returned voice actors.
	 */
	data: WKVoiceActor[];
}

/**
 * Data for a voice actor returned from the WaniKani API.
 *
 * @category Data
 * @category Voice Actors
 */
export interface WKVoiceActorData {
	/**
	 * Timestamp for when the voice actor was added to WaniKani.
	 */
	created_at: WKDatableString;

	/**
	 * Details about the voice actor.
	 */
	description: string;
	/**
	 * The voice actor's gender, either `male` or `female`.
	 */
	gender: "female" | "male";

	/**
	 * The voice actor's name
	 */
	name: string;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Voice Actor Collection
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
 * @category Parameters
 * @category Voice Actors
 */
export interface WKVoiceActorParameters extends WKCollectionParameters {
	/**
	 * Only `voice_actors` where `data.id` matches one of the array values are returned.
	 */
	ids?: number[];

	/**
	 * Only `voice_actors` updated after this time are returned.
	 */
	updated_after?: Date | WKDatableString;
}
