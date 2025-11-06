//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";

export default [
  ...tanstackConfig,
  {
    rules: {
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
    }
  }
];
