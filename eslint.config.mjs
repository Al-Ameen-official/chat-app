import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          endOfLine: "auto",
          trailingComma: "es5",
          printWidth: 150,
          tabWidth: 2,
          semi: true,
        },
      ],
    },
  },
  ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended").map((config) => ({
    ...config,
    files: ["**/*.ts"],
  })),
  {
    files: ["**/*.ts"],

    rules: {
      "max-lines": [
        "error",
        {
          max: 900,
        },
      ],

      "max-len": 0,
      "no-underscore-dangle": 0,
      "arrow-body-style": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-unsafe-assignment": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
      "@typescript-eslint/no-unsafe-call": 0,
      "@typescript-eslint/unbound-method": 0,
      "@typescript-eslint/no-floating-promises": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-unused-vars": 0,
      "@typescript-eslint/no-unused-expressions": 0,
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/naming-convention": 0,
      "@typescript-eslint/no-unsafe-return": 0,
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/no-inferrable-types": 0,
      "@typescript-eslint/restrict-template-expressions": 0,
      "jsdoc/newline-after-description": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
      "@typescript-eslint/no-non-null-assertion": 0,
      "@typescript-eslint/no-empty-interface": 0,
      "@typescript-eslint/no-this-alias": 0,
    },
  },
  {
    files: ["src/**/*.ts"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
      },
    },

    rules: {},
  },
];
