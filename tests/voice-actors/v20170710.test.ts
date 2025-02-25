import * as v from "valibot";
import {
  VoiceActor,
  VoiceActorCollection,
  isVoiceActor,
  isVoiceActorCollection,
} from "../../src/voice-actors/v20170710.js";
import { describe, expect } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("VoiceActor", () => {
  testFor("Real VoiceActor", ({ voiceActor }) => {
    expect(() => v.assert(VoiceActor, voiceActor)).not.toThrow();
    expect(isVoiceActor(voiceActor)).toBe(true);
  });
});

describe("VoiceActorCollection", () => {
  testFor("Real VoiceActorCollection", ({ voiceActorCollection }) => {
    expect(() => v.assert(VoiceActorCollection, voiceActorCollection)).not.toThrow();
    expect(isVoiceActorCollection(voiceActorCollection)).toBe(true);
  });
});
