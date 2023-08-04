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
   * Data for the returned voice actor.
   */
  data: WKVoiceActorData;
}

/**
 * A collection of voice actors returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
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
 * @see {@link https://docs.api.wanikani.com/20170710/#voice-actors}
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
   * The voice actor's name.
   */
  name: string;
}

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Voice Actor Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Voice Actors
 */
export type WKVoiceActorParameters = WKCollectionParameters;
