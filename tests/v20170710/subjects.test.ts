import * as WK from "../../src/v20170710/index.js";
import * as v from "valibot";
import { describe, expect } from "vitest";
import { testFor } from "./fixtures.js";

describe("SubjectType", () => {
  testFor("Valid Subject Types", ({ subjectTypes }) => {
    if (Array.isArray(subjectTypes)) {
      subjectTypes.forEach((subject) => {
        expect(() => v.assert(WK.SubjectType, subject)).not.toThrow();
        expect(WK.isSubjectType(subject)).toBe(true);
      });
    } else {
      throw new TypeError("Expected subjectTypes to be an array");
    }
  });
  testFor("Invalid Subject Type", () => {
    expect(() => v.assert(WK.SubjectType, "not real")).toThrow();
    expect(WK.isSubjectType("not real")).toBe(false);
  });
});

describe("SubjectTuple", () => {
  testFor("Empty SubjectTuple throws error", ({ emptySubjectTuple }) => {
    expect(() => v.assert(WK.SubjectTuple, emptySubjectTuple)).toThrow();
    expect(WK.isSubjectTuple(emptySubjectTuple)).toBe(false);
  });
  testFor("Partial SubjectTuple is valid", ({ partialSubjectTuple }) => {
    expect(() => v.assert(WK.SubjectTuple, partialSubjectTuple)).not.toThrow();
    expect(WK.isSubjectTuple(partialSubjectTuple)).toBe(true);
  });
  testFor("Full SubjectTuple is valid", ({ fullSubjectTuple }) => {
    expect(() => v.assert(WK.SubjectTuple, fullSubjectTuple)).not.toThrow();
    expect(WK.isSubjectTuple(fullSubjectTuple)).toBe(true);
  });
  testFor("SubjectTuple with repeated items throws error", ({ repeatedSubjectTuple }) => {
    expect(() => v.assert(WK.SubjectTuple, repeatedSubjectTuple)).toThrow();
    expect(WK.isSubjectTuple(repeatedSubjectTuple)).toBe(false);
  });
});

describe("Subjects", () => {
  testFor("Real Radical", ({ radical }) => {
    expect(() => v.assert(WK.Subject, radical)).not.toThrow();
    expect(WK.isSubject(radical)).toBe(true);
  });
  testFor("Real Kanji", ({ kanji }) => {
    expect(() => v.assert(WK.Subject, kanji)).not.toThrow();
    expect(WK.isSubject(kanji)).toBe(true);
  });
  testFor("Real Vocabulary", ({ vocabulary }) => {
    expect(() => v.assert(WK.Subject, vocabulary)).not.toThrow();
    expect(WK.isSubject(vocabulary)).toBe(true);
  });
  testFor("Real Kana-Only Vocabulary", ({ kanaVocabulary }) => {
    expect(() => v.assert(WK.Subject, kanaVocabulary)).not.toThrow();
    expect(WK.isSubject(kanaVocabulary)).toBe(true);
  });
});

describe("Subject Collections", () => {
  testFor("Collection of Radicals", ({ radicalCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, radicalCollection)).not.toThrow();
    expect(WK.isSubjectCollection(radicalCollection)).toBe(true);
  });
  testFor("Collection of Kanji", ({ kanjiCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, kanjiCollection)).not.toThrow();
    expect(WK.isSubjectCollection(kanjiCollection)).toBe(true);
  });
  testFor("Collection of Vocabulary", ({ vocabularyCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, vocabularyCollection)).not.toThrow();
    expect(WK.isSubjectCollection(vocabularyCollection)).toBe(true);
  });
  testFor("Collection of Kana-Only Vocabulary", ({ kanaVocabularyCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, kanaVocabularyCollection)).not.toThrow();
    expect(WK.isSubjectCollection(kanaVocabularyCollection)).toBe(true);
  });
  testFor("Real SubjectCollection", ({ subjectCollection }) => {
    expect(() => v.assert(WK.SubjectCollection, subjectCollection)).not.toThrow();
    expect(WK.isSubjectCollection(subjectCollection)).toBe(true);
  });
});

describe("SubjectParameters", () => {
  testFor("Empty SubjectParameters", ({ emptyParams }) => {
    expect(() => v.assert(WK.SubjectParameters, emptyParams)).not.toThrow();
  });
  testFor("SubjectParameters with empty arrays", ({ subjectParamsWithEmptyArrays }) => {
    expect(() => v.assert(WK.SubjectParameters, subjectParamsWithEmptyArrays)).not.toThrow();
  });
  testFor("SubjectParameters with many options filled", ({ subjectParamsWithManyOptions }) => {
    expect(() => v.assert(WK.SubjectParameters, subjectParamsWithManyOptions)).not.toThrow();
  });
  testFor("SubjectParameters with Date objects", ({ subjectParamsWithDates }) => {
    expect(() => v.assert(WK.SubjectParameters, subjectParamsWithDates)).not.toThrow();
  });
  testFor("SubjectParameters with DatableString properties", ({ subjectParamsWithDatableStrings }) => {
    expect(() => v.assert(WK.SubjectParameters, subjectParamsWithDatableStrings)).not.toThrow();
  });
});

describe("WK_SUBJECT_MARKUP_MATCHERS", () => {
  testFor("Matches Japanese text highlighting in <ja> tags", () => {
    const testString = `The romaji "ka" can be written as <ja>か</ja> in hiragana. The romaji "setsu" can be written as <ja>せつ</ja>.`;
    const matchedText = [...testString.matchAll(WK.WK_SUBJECT_MARKUP_MATCHERS.ja)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<ja>か</ja>");
    expect(matchedText[0]?.groups?.innerText).toBe("か");
    expect(matchedText[1]?.[0]).toBe("<ja>せつ</ja>");
    expect(matchedText[1]?.groups?.innerText).toBe("せつ");
  });

  testFor("Matches Kanji highlighting in <kanji> tags", () => {
    const testString = `Two of WaniKani's Level 1 Kanji are <kanji>山</kanji> and <kanji>人</kanji>.`;
    const matchedText = [...testString.matchAll(WK.WK_SUBJECT_MARKUP_MATCHERS.kanji)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<kanji>山</kanji>");
    expect(matchedText[0]?.groups?.innerText).toBe("山");
    expect(matchedText[1]?.[0]).toBe("<kanji>人</kanji>");
    expect(matchedText[1]?.groups?.innerText).toBe("人");
  });

  testFor("Matches Meaning highlighting in <meaning> tags", () => {
    const testString = `The kanji 一 means <meaning>one</meaning>. The kanji 二 means <meaning>two</meaning>.`;
    const matchedText = [...testString.matchAll(WK.WK_SUBJECT_MARKUP_MATCHERS.meaning)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<meaning>one</meaning>");
    expect(matchedText[0]?.groups?.innerText).toBe("one");
    expect(matchedText[1]?.[0]).toBe("<meaning>two</meaning>");
    expect(matchedText[1]?.groups?.innerText).toBe("two");
  });

  testFor("Matches Radical highlighting in <radical> tags", () => {
    const testString = `One of the first radicals is the <radical>ground</radical> radical. A more complex one is <radical>coat rack</radical>.`;
    const matchedText = [...testString.matchAll(WK.WK_SUBJECT_MARKUP_MATCHERS.radical)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<radical>ground</radical>");
    expect(matchedText[0]?.groups?.innerText).toBe("ground");
    expect(matchedText[1]?.[0]).toBe("<radical>coat rack</radical>");
    expect(matchedText[1]?.groups?.innerText).toBe("coat rack");
  });

  testFor("Matches Reading highlighting in <reading> tags", () => {
    const testString = `The partical は can sound like <reading>ha</reading>, but is also read like <reading>wa</reading>.`;
    const matchedText = [...testString.matchAll(WK.WK_SUBJECT_MARKUP_MATCHERS.reading)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<reading>ha</reading>");
    expect(matchedText[0]?.groups?.innerText).toBe("ha");
    expect(matchedText[1]?.[0]).toBe("<reading>wa</reading>");
    expect(matchedText[1]?.groups?.innerText).toBe("wa");
  });

  testFor("Matches Vocabulary highlighting in <vocabulary> tags", () => {
    const testString = `The kanji 一 is used in the vocabulary <vocabulary>one thing</vocabulary> and <vocabulary>first floor</vocabulary>.`;
    const matchedText = [...testString.matchAll(WK.WK_SUBJECT_MARKUP_MATCHERS.vocabulary)];
    expect(matchedText).toHaveLength(2);
    expect(matchedText[0]?.[0]).toBe("<vocabulary>one thing</vocabulary>");
    expect(matchedText[0]?.groups?.innerText).toBe("one thing");
    expect(matchedText[1]?.[0]).toBe("<vocabulary>first floor</vocabulary>");
    expect(matchedText[1]?.groups?.innerText).toBe("first floor");
  });
});
