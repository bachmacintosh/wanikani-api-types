# @bachmacintosh/wanikani-api-types

[![Tests (Main)](https://github.com/bachmacintosh/wanikani-api-types/actions/workflows/push.yml/badge.svg)](https://github.com/bachmacintosh/wanikani-api-types/actions/workflows/push.yml)
[![codecov](https://codecov.io/gh/bachmacintosh/wanikani-api-types/branch/main/graph/badge.svg?token=CCVBE1UM9M)](https://codecov.io/gh/bachmacintosh/wanikani-api-types)

Regularly updated type definitions for the [WaniKani API](https://docs.api.wanikani.com/20170710/)

## Documentation

Available at https://wanikani-api-types.bachman.dev

## Package Versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html), with versions formatted as x.y.z.

A new Patch Version z includes backwards-compatible bug fixes, corrections to documentation, and other minute changes.

A new Minor Version y includes new backwards-compatible library features, new backwards-compatible WaniKani API changes (e.g. new revision, new fields on a resource, etc.), widened TypeScript version support, and deprecatiung (but not removing) existing features to be removed in the next major version.

A new Major Version x includes backwards-incompatible changes such as removing previously deprecated items, backwards-incompatible WaniKani API changes (e.g. removing a field on a resource), or a [breaking change in TypeScript](https://github.com/microsoft/TypeScript/wiki/Breaking-Changes) that's introduced into the library (we'll try to avoid these as much as possible).

| Package Version | TypeScript Versions | WaniKani API Version | Latest API Revision |
| --------------- | ------------------- | -------------------- | ------------------- |
| 1.x             | 4.x >= 4.5, 5.0     | 2                    | 20170710            |

## Install

### NPM

```shell
npm install @bachmacintosh/wanikani-api-types
```

Then, import using one of two methods.

#### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "@bachmacintosh/wanikani-api-types/dist/v20170710";
import { stringifyParameters } from "@bachmacintosh/wanikani-api-types/dist/v20170710";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "@bachmacintosh/wanikani-api-types";
import { stringifyParameters } from "@bachmacintosh/wanikani-api-types";
```

### Deno via NPM Specifier

Deno version 1.28 and up can import the library using an [npm specifier](https://deno.land/manual@v1.28.1/node/npm_specifiers).

**Be sure to replace `x.y.z` with your desired version number.**

#### Specific API Revision (Recommended)

The module you import from matches a [WaniKani API Revision](https://docs.api.wanikani.com/20170710/#revisions-aka-versioning); you shouldn't expect any breaking changes from the package.

```typescript
import type {
  WKAssignmentParameters,
  WKDatableString,
} from "npm:@bachmacintosh/wanikani-api-types@x.y.z/dist/v20170710";
import { stringifyParameters } from "npm:@bachmacintosh/wanikani-api-types@x.y.z/dist/v20170710";
```

#### Latest API Revision (Not Recommended)

Importing from the index module will always provide types, methods, etc. for use with the latest and greatest API Revision.

```typescript
import type { WKAssignmentParameters, WKDatableString } from "npm:@bachmacintosh/wanikani-api-types@x.y.z";
import { stringifyParameters } from "npm:@bachmacintosh/wanikani-api-types@x.y.z";
```

### Other Environments

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

## Usage

### Type Definitions

We provide various type definitions to help with sending/receiving type-safe elements to/from the WaniKani API.

- **Base Types** that define essential WaniKani API building blocks
- **Collections/Reports/Resources** that represent whole responses from the API
- **Data** that represents only the actual returned data from the API (i.e. the `data` field on most responses)
- **Parameter Types** that can be broken down into a query string to append to a URI for the API (especially when fetching Collections) -- see below.
- **Payloads** that represent JSON bodies sent to the API when creating/updating certain resources

We also export various subtypes that fall underneath these main types, in case they're needed to work with partial data.

### Type Guards

Most of the types defined here are object types with straightforward structure. Sometimes, however, you may have a string or number that needs to meet specific criteria to be narrowed down to an exact type. So we provide some [type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) to verify if a variable is of a given type; these will usually begin with `is` in their name. See the documentation for more info.

### Helper Functions

We provide a helper function, `stringifyParameters`, that accepts any of the Parameter object types as an argument, and will return a query string to append to a WaniKani API endpoint; so long as the correct resource's parameters are stringified and appended, the request should be valid.

### Examples

See [EXAMPLES.md](https://github.com/bachmacintosh/wanikani-api-types/blob/main/EXAMPLES.md) for examples using this library.

## Contributing

We welcome any contributions to help improve this library. Please see the following documents:

- [CONTRIBUTING.md](https://github.com/bachmacintosh/wanikani-api-types/blob/main/CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](https://github.com/bachmacintosh/wanikani-api-types/blob/main/CODE_OF_CONDUCT.md)

Thank you in advance for your contribution(s)!
