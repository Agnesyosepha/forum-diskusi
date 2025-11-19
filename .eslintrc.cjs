module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/prop-types": 0,
  },

  overrides: [
    {
      files: ["src/test/**"],
      env: {
        jest: true, // supaya describe, it, expect dikenali
      },
      rules: {
        "no-unused-vars": "off", // matikan unused vars khusus test
      },
    },
  ],
};
