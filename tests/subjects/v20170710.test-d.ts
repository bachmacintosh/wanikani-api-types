import type {
  KanaVocabulary,
  KanaVocabularyCollection,
  Kanji,
  KanjiCollection,
  Radical,
  RadicalCollection,
  Subject,
  SubjectCollection,
  SubjectParameters,
  Vocabulary,
  VocabularyCollection,
} from "../../src/subjects/v20170710.js";
import { assertType, describe } from "vitest";
import { testFor } from "../fixtures/v20170710.js";

describe("Subjects", () => {
  testFor("Real Radical", ({ radical }) => {
    assertType<Radical>(radical);
    assertType<Subject>(radical);
  });
  testFor("Real Kanji", ({ kanji }) => {
    assertType<Kanji>(kanji);
    assertType<Subject>(kanji);
  });
  testFor("Real Vocabulary", ({ vocabulary }) => {
    assertType<Vocabulary>(vocabulary);
    assertType<Subject>(vocabulary);
  });
  testFor("Real KanaVocabulary", ({ kanaVocabulary }) => {
    assertType<KanaVocabulary>(kanaVocabulary);
    assertType<Subject>(kanaVocabulary);
  });
});

describe("Subject Collections", () => {
  testFor("Real RadicalCollection", ({ radicalCollection }) => {
    assertType<RadicalCollection>(radicalCollection);
    assertType<SubjectCollection>(radicalCollection);
  });
  testFor("Real KanjiCollection", ({ kanjiCollection }) => {
    assertType<KanjiCollection>(kanjiCollection);
    assertType<SubjectCollection>(kanjiCollection);
  });
  testFor("Real VocabularyCollection", ({ vocabularyCollection }) => {
    assertType<VocabularyCollection>(vocabularyCollection);
    assertType<SubjectCollection>(vocabularyCollection);
  });
  testFor("Real KanaVocabularyCollection", ({ kanaVocabularyCollection }) => {
    assertType<KanaVocabularyCollection>(kanaVocabularyCollection);
    assertType<SubjectCollection>(kanaVocabularyCollection);
  });
  testFor("Real SubjectCollection", ({ subjectCollection }) => {
    assertType<SubjectCollection>(subjectCollection);
  });
});

describe("SubjectParameters", () => {
  testFor("Empty SubjectParameters", ({ emptyParams }) => {
    assertType<SubjectParameters>(emptyParams);
  });
  testFor("SubjectParameters with empty arrays", ({ subjectParamsWithEmptyArrays }) => {
    assertType<SubjectParameters>(subjectParamsWithEmptyArrays);
  });
  testFor("SubjectParameters with many options filled", ({ subjectParamsWithManyOptions }) => {
    assertType<SubjectParameters>(subjectParamsWithManyOptions);
  });
  testFor("SubjectParameters with Date objects", ({ subjectParamsWithDates }) => {
    assertType<SubjectParameters>(subjectParamsWithDates);
  });
  testFor("SubjectParameters with DatableString properties", ({ subjectParamsWithDatableStrings }) => {
    assertType<SubjectParameters>(subjectParamsWithDatableStrings);
  });
});
