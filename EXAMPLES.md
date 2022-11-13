# Examples

Below are some code examples to illustrate the various types, constants, and functions available in the library.

## Get Lessons

```typescript
import type {
  WKAssignmentCollection,
  WKAssignmentData,
  WKAssignmentParameters,
  WKError,
  WKLevel,
  WKSubjectCollection,
  WKSubjectData,
  WKSubjectParameters,
  WKUser,
} from "@bachmacintosh/wanikani-api-types/dist/v20170710.js";
import { WK_API_REVISION, stringifyParameters } from "@bachmacintosh/wanikani-api-types/dist/v20170710.js";

interface WaniKaniLesson {
  subject: WKSubjectData;
  assignment: WKAssignmentData;
}

type WaniKaniLessonLevels = Partial<Record<WKLevel, WaniKaniLesson[]>>;

/*
  NodeJS:
*/
  const WANIKANI_API_TOKEN = process.env("WANIKANI_API_TOKEN");

/*
  Deno:
*/
  const WANIKANI_API_TOKEN = Deno.env.get("WANIKANI_API_TOKEN");
*/
async function getLessons(): Promise<WaniKaniLesson[]> {
  const headers = {
    Authorization: `Bearer ${WANIKANI_API_TOKEN}`,
    "Wanikani-Revision": WK_API_REVISION,
  };
  const init = { headers };

  let url = "https://api.wanikani.com/v2/user";
  let response = await fetch(url, init);
  const user = (await response.json()) as WKError | WKUser;
  if (typeof user.data === "undefined") {
    throw new Error(user.error);
  }
  const batchSize = user.data.preferences.lessons_batch_size;
  const ordering = user.data.preferences.lessons_presentation_order;

  const assignmentParams: WKAssignmentParameters = {
    immediately_available_for_lessons: true,
  };

  url = `https://api.wanikani.com/v2/assignments${stringifyParameters(assignmentParams)}`;
  response = await fetch(url, init);
  let assignments = (await response.json()) as WKAssignmentCollection | WKError;
  if (typeof assignments.data === "undefined" || typeof assignments.pages === "undefined") {
    throw new Error(assignments.error);
  }
  const lessonData: WaniKaniLesson[] = [];
  let moreAssignments = true;
  while (moreAssignments) {
    const ids: number[] = [];
    assignments.data.forEach((assignment) => {
      ids.push(assignment.data.subject_id);
    });
    const subjectParams: WKSubjectParameters = {
      ids,
    };
    url = `https://api.wanikani.com/v2/subjects${stringifyParameters(subjectParams)}`;
    response = await fetch(url, init);
    const subjects = (await response.json()) as WKSubjectCollection | WKError;
    if (typeof subjects.data === "undefined") {
      throw new Error(subjects.error);
    } else {
      if (ordering === "shuffled") {
        // Durstenfeld shuffle
        for (let i = assignments.data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [assignments.data[i], assignments.data[j]] = [assignments.data[j], assignments.data[i]];
        }
        assignments.data.forEach((assignment) => {
          if (typeof subjects.data === "undefined") {
            throw new Error(subjects.error);
          }
          const subject = subjects.data.find((subject) => {
            return subject.id === assignment.data.subject_id;
          });
          if (typeof subject === "undefined") {
            throw new Error("Unexpected missing subject from collection!");
          }
          lessonData.push({
            assignment: assignment.data,
            subject: subject.data,
          });
        });
      } else {
        const levels: WaniKaniLessonLevels = {};
        assignments.data.forEach((assignment) => {
          if (typeof subjects.data === "undefined") {
            throw new Error(subjects.error);
          }
          const subject = subjects.data.find((subject) => {
            return subject.id === assignment.data.subject_id;
          });
          if (typeof subject === "undefined") {
            throw new Error("Unexpected missing subject from collection!");
          }
          if (typeof levels[subject.data.level] === "undefined") {
            levels[subject.data.level] = [];
          }
          levels[subject.data.level]?.push({
            assignment: assignment.data,
            subject: subject.data,
          });
        });
        for (const [_key, value] of Object.entries(levels)) {
          if (ordering === "ascending_level_then_shuffled") {
            for (let i = value.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [value[i], value[j]] = [value[j], value[i]];
            }
          } else if (ordering === "ascending_level_then_subject") {
            value.sort((lessonA, lessonB) => {
              return lessonA.subject.lesson_position - lessonB.subject.lesson_position;
            });
          }
          value.forEach((lesson) => {
            lessonData.push(lesson);
          });
        }
      }
    }
    if (typeof assignments.pages !== "undefined" && assignments.pages.next_url !== null) {
      url = assignments.pages.next_url;
      response = await fetch(url, init);
      assignments = (await response.json()) as WKAssignmentCollection | WKError;
      if (typeof assignments.data === "undefined") {
        throw new Error(assignments.error);
      }
    } else {
      moreAssignments = false;
    }
  }
  return lessonData.slice(0, batchSize);
}
```
