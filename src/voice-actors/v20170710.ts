import * as v from "valibot";
import { BaseCollection, BaseResource, CollectionParameters, DatableString } from "../base/v20170710.js";

/**
 * Available voice actors used for vocabulary reading pronunciation audio.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#voice-actors}
 * @category Resources
 * @category Voice Actors
 */
export interface VoiceActor extends BaseResource {
  /**
   * Data for the returned voice actor.
   */
  data: {
    /**
     * Timestamp for when the voice actor was added to WaniKani.
     */
    created_at: DatableString;

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
  };

  /**
   * A unique number identifying the voice actor.
   */
  id: number;

  /**
   * The kind of object returned.
   */
  object: "voice_actor";
}
export const VoiceActor = v.object(
  v.entriesFromObjects([
    BaseResource,
    v.object({
      data: v.object({
        created_at: DatableString,
        description: v.string(),
        gender: v.picklist(["female", "male"]),
        name: v.string(),
      }),
      id: v.number(),
      object: v.literal("voice_actor"),
    }),
  ]),
);

/**
 * A collection of voice actors returned from the WaniKani API.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
 * @category Collections
 * @category Voice Actors
 */
export interface VoiceActorCollection extends BaseCollection {
  /**
   * An array of returned voice actors.
   */
  data: VoiceActor[];
}
export const VoiceActorCollection = v.object(
  v.entriesFromObjects([
    BaseCollection,
    v.object({
      data: v.array(VoiceActor),
    }),
  ]),
);

/**
 * Parameters that can be passed to the WaniKani API to filter a request for a Voice Actor Collection.
 *
 * @see {@link https://docs.api.wanikani.com/20170710/#get-all-voice-actors}
 * @see {@link stringifyParameters}
 * @category Parameters
 * @category Voice Actors
 */
export type VoiceActorParameters = CollectionParameters;
export const VoiceActorParameters = CollectionParameters;
