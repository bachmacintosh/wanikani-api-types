import * as v from "valibot";
import { describe, expect, test } from "vitest";
import { SubjectParameters, WK_SUBJECT_MARKUP_MATCHERS } from "../../src/subjects/v20170710.js";
import { DatableString } from "../../src/base/v20170710.js";

describe("SubjectParameters", () => {
  test("Empty SubjectParameters", () => {
    const params1: SubjectParameters = {};
    expect(() => v.parse(SubjectParameters, params1)).not.toThrow();
  });
  test("SubjectParameters with empty arrays", () => {
    const params2: SubjectParameters = {
      ids: [],
      levels: [],
      slugs: [],
    };
    expect(() => v.parse(SubjectParameters, params2)).not.toThrow();
  });
  test("SubjectParameters with many options filled", () => {
    const params3: SubjectParameters = {
      ids: [1, 2, 3],
      levels: [1, 2, 3],
      slugs: ["one", "two", "three"],
      types: ["radical", "kanji"],
      hidden: false,
      page_after_id: 1,
      page_before_id: 1,
    };
    expect(() => v.parse(SubjectParameters, params3)).not.toThrow();
  });
  test("SubjectParameters with Date objects", () => {
    const params4: SubjectParameters = {
      updated_after: new Date(),
    };
    expect(() => v.parse(SubjectParameters, params4)).not.toThrow();
  });
  test("SubjectParameters with DatableString properties", () => {
    const params5: SubjectParameters = {
      updated_after: v.parse(DatableString, new Date().toISOString()),
    };
    expect(() => v.parse(SubjectParameters, params5)).not.toThrow();
  });
});

describe("WK_SUBJECT_MARKUP_MATCHERS", () => {
  test("Matches Japanese text highlighting in <ja> tags", () => {
    const testString = `The romaji "ka" can be written as <ja>か</ja> in hiragana. The romaji "setsu" can be written as <ja>せつ</ja>.`;
    const matchedText = [...testString.matchAll(WK_SUBJECT_MARKUP_MATCHERS.ja)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<ja>か</ja>");
    expect(matchedText[0]?.groups?.innerText).toBe("か");
    expect(matchedText[1]?.[0]).toBe("<ja>せつ</ja>");
    expect(matchedText[1]?.groups?.innerText).toBe("せつ");
  });

  test("Matches Kanji highlighting in <kanji> tags", () => {
    const testString = `Two of WaniKani's Level 1 Kanji are <kanji>山</kanji> and <kanji>人</kanji>.`;
    const matchedText = [...testString.matchAll(WK_SUBJECT_MARKUP_MATCHERS.kanji)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<kanji>山</kanji>");
    expect(matchedText[0]?.groups?.innerText).toBe("山");
    expect(matchedText[1]?.[0]).toBe("<kanji>人</kanji>");
    expect(matchedText[1]?.groups?.innerText).toBe("人");
  });

  test("Matches Meaning highlighting in <meaning> tags", () => {
    const testString = `The kanji 一 means <meaning>one</meaning>. The kanji 二 means <meaning>two</meaning>.`;
    const matchedText = [...testString.matchAll(WK_SUBJECT_MARKUP_MATCHERS.meaning)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<meaning>one</meaning>");
    expect(matchedText[0]?.groups?.innerText).toBe("one");
    expect(matchedText[1]?.[0]).toBe("<meaning>two</meaning>");
    expect(matchedText[1]?.groups?.innerText).toBe("two");
  });

  test("Matches Radical highlighting in <radical> tags", () => {
    const testString = `One of the first radicals is the <radical>ground</radical> radical. A more complex one is <radical>coat rack</radical>.`;
    const matchedText = [...testString.matchAll(WK_SUBJECT_MARKUP_MATCHERS.radical)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<radical>ground</radical>");
    expect(matchedText[0]?.groups?.innerText).toBe("ground");
    expect(matchedText[1]?.[0]).toBe("<radical>coat rack</radical>");
    expect(matchedText[1]?.groups?.innerText).toBe("coat rack");
  });

  test("Matches Reading highlighting in <reading> tags", () => {
    const testString = `The partical は can sound like <reading>ha</reading>, but is also read like <reading>wa</reading>.`;
    const matchedText = [...testString.matchAll(WK_SUBJECT_MARKUP_MATCHERS.reading)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<reading>ha</reading>");
    expect(matchedText[0]?.groups?.innerText).toBe("ha");
    expect(matchedText[1]?.[0]).toBe("<reading>wa</reading>");
    expect(matchedText[1]?.groups?.innerText).toBe("wa");
  });

  test("Matches Vocabulary highlighting in <vocabulary> tags", () => {
    const testString = `The kanji 一 is used in the vocabulary <vocabulary>one thing</vocabulary> and <vocabulary>first floor</vocabulary>.`;
    const matchedText = [...testString.matchAll(WK_SUBJECT_MARKUP_MATCHERS.vocabulary)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<vocabulary>one thing</vocabulary>");
    expect(matchedText[0]?.groups?.innerText).toBe("one thing");
    expect(matchedText[1]?.[0]).toBe("<vocabulary>first floor</vocabulary>");
    expect(matchedText[1]?.groups?.innerText).toBe("first floor");
  });
});
