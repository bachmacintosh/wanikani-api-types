import type { VoiceActor, VoiceActorCollection } from "../../src/voice-actors/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("VoiceActor", () => {
  testFor("Real VoiceActor", ({ voiceActor }) => {
    assertType<VoiceActor>(voiceActor);
  });
});

describe("VoiceActorCollection", () => {
  testFor("Real VoiceActorCollection", ({ voiceActorCollection }) => {
    assertType<VoiceActorCollection>(voiceActorCollection);
  });
});
