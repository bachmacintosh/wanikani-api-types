const complexity = 20;
const maxDepth = 4;
const maxLines = 1000;
const maxLinesPerFunction = 1000;
const maxParams = 4;

const noRestrictedSyntaxSelectors = [
  "error",
  {
    selector: 'PropertyDefinition[key.type="PrivateIdentifier"]',
    message: `Avoid using #private properties/methods; they don't always behave well, e.g. when proxying a class.
              Make their access "private", or if this is intentional for security reasons, disable for this line.`,
  },
  {
    selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
    message: "setTimeout must always be invoked with two arguments.",
  },
  {
    selector: "CallExpression[callee.object.name][callee.property.name='forEach'][arguments.0.async=true]",
    message: `Don't use async/await in a forEach callback on an array. Use a for...of loop or Promise.all() instead.
              If this is intentional on an item that is not an array, disable for this line.`,
  },
  {
    selector: "TSEnumDeclaration[const=true]",
    message: "Don't use const enums; they don't work well with common TypeScript configurations.",
  },
];

const maxLenRules = [
  "error",
  {
    code: 120,
    tabWidth: 2,
    ignoreUrls: true,
    ignoreTemplateLiterals: true,
    ignoreRegExpLiterals: true,
  },
];

const classMemberOrdering = {
  memberTypes: [
    /*
      Group by Fields - Static Initialization - Constructors - Methods
      Group Fields and Methods by Static and Instance
      Group Static and Instance by Visibility (public - protected - private - #private)
      For Fields, Group Visibilities by presence/absence of readonly modifier
    */

    // Fields
    "public-static-readonly-field",
    "public-static-field",
    "protected-static-readonly-field",
    "protected-static-field",
    "private-static-readonly-field",
    "private-static-field",
    "#private-static-readonly-field",
    "#private-static-field",
    "static-readonly-field",
    "static-field",

    "public-readonly-field",
    "public-field",
    "protected-readonly-field",
    "protected-field",
    "private-readonly-field",
    "private-field",
    "#private-readonly-field",
    "#private-field",
    "readonly-field",
    "field",

    // Static Initialization
    "static-initialization",

    // Constructors
    "public-constructor",
    "protected-constructor",
    "private-constructor",
    "constructor",

    // Methods
    "public-static-method",
    "protected-static-method",
    "private-static-method",
    "#private-static-method",
    "static-method",

    "public-method",
    "protected-method",
    "private-method",
    "#private-method",
    "method",
  ],
  // Required, then optional at the lowest subgroup
  optionalityOrder: "required-first",
  // Within the required and optional final subgroups, alphabetical order
  order: "natural",
};

const interfaceAndTypeLiteralMemberOrdering = {
  memberTypes: ["readonly-field", "field", "readonly-signature", "signature", "constructor", "method"],
  order: "natural",
  optionalityOrder: "required-first",
};

const defaultMemberOrdering = {
  memberTypes: ["readonly-field", "field", "readonly-signature", "signature", "method"],
  order: "natural",
  optionalityOrder: "required-first",
};

const memberOrderingRules = [
  "error",
  {
    classes: classMemberOrdering,
    classExpressions: classMemberOrdering,
    interfaces: interfaceAndTypeLiteralMemberOrdering,
    typeLiterals: interfaceAndTypeLiteralMemberOrdering,
    default: defaultMemberOrdering,
  },
];

const indicativePrefixes = [
  "are",
  "can",
  "could",
  "does",
  "has",
  "have",
  "is",
  "may",
  "might",
  "shall",
  "should",
  "was",
  "were",
];

const namingConventionRules = [
  "error",
  {
    // Any used booleans should start with an indicative word for truth/falsehood
    selector: ["accessor", "classProperty", "parameter", "parameterProperty", "variable"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: indicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any unused booleans should start with an underscore, followed by the indicative word just like above
    selector: ["accessor", "classProperty", "parameter", "parameterProperty", "variable"],
    types: ["boolean"],
    modifiers: ["unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: indicativePrefixes,
    //  Leading underscore, then prefix, are trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // PascalCase for classes, interfaces, enums, and type aliases/parameters
    selector: ["class", "enum", "enumMember", "interface", "typeAlias", "typeParameter"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["PascalCase"],
  },
  {
    // If something is private, prefix it with an underscore ( _ )
    selector: ["accessor", "classMethod", "classProperty", "parameterProperty"],
    modifiers: ["private"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // No need for an underscore for built-in privates
    selector: ["classMethod", "classProperty"],
    modifiers: ["#private"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // Relaxed format for properties, as they tend to reflect external APIs.
    selector: ["objectLiteralProperty", "typeProperty"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "snake_case", "PascalCase", "UPPER_CASE"],
  },
  {
    /* And if their property names need quotes, only forbid starting/ending underscores, cause we likely can't stick
        to a format if we need quotes. */
    selector: ["objectLiteralProperty", "typeProperty"],
    modifiers: ["requiresQuotes"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: null,
  },
  {
    // Require an underscore at the start of unused variables
    selector: ["parameter", "variable"],
    modifiers: ["unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // Allow constants to be uppercase
    selector: ["variable"],
    modifiers: ["const"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // Unused constants need an underscore at the beginning
    selector: ["variable"],
    modifiers: ["const", "unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // A good catch-all for everything else
    selector: "default",
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
];

const noMagicNumbersRules = [
  "error",
  {
    ignoreDefaultValues: true,
    ignoreEnums: true,
    ignoreNumericLiteralTypes: true,
    ignoreReadonlyClassProperties: true,
    ignoreTypeIndexes: true,
    ignore: [0, 1, "0n", "1n"],
  },
];

const noUnusedVarsRules = [
  "error",
  {
    vars: "all",
    args: "after-used",
    ignoreRestSiblings: false,
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
  },
];

const noUseBeforeDefineRules = [
  "error",
  {
    functions: false,
    classes: true,
    variables: true,
    enums: true,
    typedefs: true,
    ignoreTypeReferences: true,
    allowNamedExports: true,
  },
];

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  root: true,
  ignorePatterns: ["dist/**", "docs/**", "tests/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
  },
  plugins: ["@typescript-eslint", "import"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".mts", ".cts"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    // Possible Problems

    "array-callback-return": "error",
    "no-await-in-loop": "error",
    "no-constant-binary-expression": "error",
    "no-constructor-return": "error",
    "no-promise-executor-return": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable-loop": "error",
    "no-unused-private-class-members": "error",
    "require-atomic-updates": "error",

    // Suggestions

    "accessor-pairs": "error",
    "arrow-body-style": ["error", "always"],
    "block-scoped-var": "error",
    "capitalized-comments": ["error", "always", { ignoreConsecutiveComments: true }],
    "class-methods-use-this": "error",
    complexity: ["error", complexity],
    "consistent-return": "error",
    "consistent-this": ["error", "that"],
    curly: ["error", "all"],
    "default-case": "error",
    "default-case-last": "error",
    eqeqeq: ["error", "always"],
    "func-name-matching": "error",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "guard-for-in": "error",
    "id-length": ["error", { exceptions: ["t"], properties: "never" }],
    "max-depth": ["error", maxDepth],
    "max-lines": ["error", maxLines],
    "max-lines-per-function": ["error", maxLinesPerFunction],
    "max-nested-callbacks": ["error"],
    "max-params": ["error", maxParams],
    "multiline-comment-style": ["error", "bare-block"],
    "new-cap": "error",
    "no-array-constructor": "error",
    "no-bitwise": "warn",
    "no-caller": "error",
    "no-confusing-arrow": ["error", { allowParens: false }],
    "no-console": ["error"],
    "no-continue": "error",
    "no-div-regex": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-implicit-coercion": "error",
    "no-implied-eval": "error",
    "no-implicit-globals": ["error", { lexicalBindings: true }],
    "no-inline-comments": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-mixed-operators": "error",
    "no-multi-assign": "error",
    "no-multi-str": "error",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-proto": "error",
    "no-restricted-syntax": noRestrictedSyntaxSelectors,
    "no-return-assign": ["error", "always"],
    "no-script-url": "error",
    "no-sequences": ["error"],
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-unneeded-ternary": "error",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-void": "error",
    "no-warning-comments": ["error", { terms: ["fixme", "xxx"] }],
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "operator-assignment": ["error", "always"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["error", { object: true, array: false }],
    "prefer-exponentiation-operator": "error",
    "prefer-named-capture-group": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-has-own": "error",
    "prefer-object-spread": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    radix: "error",
    "require-unicode-regexp": "error",
    "sort-imports": "error",
    "spaced-comment": ["error", "always"],
    strict: "error",
    "symbol-description": "error",
    "vars-on-top": "error",
    yoda: "error",

    // Layout & Formatting

    "line-comment-position": "error",
    "max-len": maxLenRules,
    "max-statements-per-line": "error",
    "no-tabs": ["error"],

    // TypeScript Rules

    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never",
      },
    ],
    "@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: true,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "explicit" }],
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/member-ordering": memberOrderingRules,
    "@typescript-eslint/method-signature-style": ["error", "property"],
    "@typescript-eslint/naming-convention": namingConventionRules,
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/parameter-properties": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/sort-type-constituents": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // TypeScript ESLint Extensions

    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "error",
    "init-declarations": "off",
    "@typescript-eslint/init-declarations": ["error", "always"],
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": "error",
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": "error",
    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this": "error",
    "no-loop-func": "off",
    "@typescript-eslint/no-loop-func": "error",
    "no-magic-numbers": "off",
    "@typescript-eslint/no-magic-numbers": noMagicNumbersRules,
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": noUnusedVarsRules,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": noUseBeforeDefineRules,

    // Import Rules
    "import/exports-last": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-absolute-path": "error",
    "import/no-amd": "error",
    "import/no-anonymous-default-export": "error",
    "import/no-cycle": "error",
    "import/no-deprecated": "error",
    "import/no-dynamic-require": "error",
    "import/no-empty-named-blocks": "error",
    "import/no-extraneous-dependencies": "error",
    "import/no-import-module-exports": "error",
    "import/no-mutable-exports": "error",
    "import/no-self-import": "error",
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    "import/no-webpack-loader-syntax": "error",
    "import/prefer-default-export": ["error", { target: "single" }],
  },
  overrides: [
    {
      files: ["*.?(c|m)js?(x)"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      rules: {
        "dot-notation": "error",
        "no-implied-eval": "error",
        "no-throw-literal": "error",
        "no-unused-vars": noUnusedVarsRules,
        "require-await": "error",
      },
    },
  ],
  reportUnusedDisableDirectives: true,
};
