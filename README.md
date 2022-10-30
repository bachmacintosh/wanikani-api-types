# @bachmacintosh/wanikani-api-types

Regularly updated type definitions for the [WaniKani API](https://docs.api.wanikani.com/20170710/)

## ⚠️ We're in Beta!

Type definitions, type guards, and helper methods are still being reviewed, tested, and finalized.

## Package Versioning

Major releases indicate a new version of the WaniKani API, or a [breaking change in TypeScript](https://github.com/microsoft/TypeScript/wiki/Breaking-Changes) that's introduced into the library (we'll try to avoid these as much as possible). Minor releases accommodate new/updated WaniKani API revisions. Patch versions denote bug fixes to the library.

| Package Version | TypeScript Versions | WaniKani API Version | Latest API Revision |
| --------------- | ------------------- | -------------------- | ------------------- |
| 0.x             | 4.x >= 4.5.0        | 2                    | 20170710            |

## Usage

### Install with NPM

```shell
npm install --save-dev @bachmacintosh/wanikani-api-types
```

Then, import using one of two methods.

#### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "@bachmacintosh/wanikani-api-docs/v20170710.js";
import { stringifyParameters } from "@bachmacintosh/wanikani-api-docs/v20170710.js";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "@bachmacintosh/wanikani-api-docs";
import { stringifyParameters } from "@bachmacintosh/wanikani-api-docs";
```

### Deno and Other Environments

You can import the modules directly with `esm.sh`.

**Be sure to replace `x.y.z` with your desired version number.**

#### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import type {
	WKAssignmentParameters,
	WKDatableString,
} from "https://esm.sh/@bachmacintosh/wanikani-api-types@x.y.z/dist/v20170710.js";
import { stringifyParameters } from "https://esm.sh/@bachmacintosh/wanikani-api-types@x.y.z/dist/v20170710.js";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "https://esm.sh/@bachmacintosh/wanikani-api-types@x.y.z";
import { stringifyParameters } from "https://esm.sh/@bachmacintosh/wanikani-api-types@x.y.z";
```

### Documentation

Available at https://wanikani-api-types.bachman.dev

### Type Definitions

We provide various type definitions to help with sending/receiving type-safe elements to/from the WaniKani API.

- **Base Types** that define essential WaniKani API building blocks
- **Collections/Reports/Resources** that represent whole responses from the API
- **Data** that represents only the actual returned data from the API (i.e. the `data` field on most responses)
- **Parameter Types** that can be broken down into a query string to append to a URI for the API (especially when fetching Collections) -- see below.
- **Payloads** that represent JSON bodies sent to the API when creating/updating certain resources

We also export various subtypes that fall underneath these main types, in case they're needed to work with partial data.

### Type Guards

Most of the types defined here are object types with straightforward structure. The exception is the ISO-8601 date-time strings that WaniKani uses in both request payloads and responses, which we've named a `WKDatableString`. We provide a [type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) to verify if a variable is not only a `string`, but is in the correct ISO-8601 format.

### Helper Functions

We provide a helper function, `stringifyParameters`, that accepts any of the Parameter object types as an argument, and will return a query string to append to a WaniKani API endpoint; so long as the correct resource's parameters are stringified and appended, the request should be valid.

### Example

Here's a quick example code snippet that lays the foundation of fetching a collection of assignments, possibly using an old `data_updated_at` value from a previous collection of assignments, or a date calculated from a time period library.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "@bachmacintosh/wanikani-api-docs/v20170710.js";
import { stringifyParameters } from "@bachmacintosh/wanikani-api-docs/v20170710.js";

function getAssignments(newerThan?: WKDatableString | Date) {
	let params: WKAssignmentParameters = {};
	if (typeof newerThan !== "undefined") {
		if (newerThan instanceof Date || isWKDatableString(newerThan)) {
			params = {
				updated_after: newerThan,
			};
		} else {
			throw new Error("Invalid Start Date!");
		}
	}
	const queryString = stringifyParameters(params);
	const url = `https://api.wanikani.com/v2/assignments${queryString}`;

	/* Send request to WaniKani, etc. */
}
```

## Contributing

We welcome any contributions to help improve this library. Please see the following documents:

- [CONTRIBUTING.md](https://github.com/bachmacintosh/wanikani-api-types/blob/main/CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](https://github.com/bachmacintosh/wanikani-api-types/blob/main/CODE_OF_CONDUCT.md)

Thank you in advance for your contribution(s)!
