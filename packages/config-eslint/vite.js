import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

module.exports = tseslint.config(
  {
    ignores: ["node_modules/", "dist/"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-unused-private-class-members": ["warn"],
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
);
