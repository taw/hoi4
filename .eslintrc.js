module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es6": true,
  },
  "plugins": ["react"],
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "ecmaFeatures": {"jsx": true},
    "sourceType": "module",
  },
  "rules": {
    "indent": ["error",  2],
    "react/prop-types": 0,
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
    "eqeqeq": ["error", "always"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "no-unused-vars":  ["error", { "args": "none" }],
  },
  // Should apply to cypress/ only
  "globals": {
    "cy": "readonly",
    "it": "readonly",
    "expect": "readonly",
    "beforeEach": "readonly",
    "context": "readonly",
  },
};
