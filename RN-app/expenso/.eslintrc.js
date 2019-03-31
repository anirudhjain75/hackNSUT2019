module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  env: {
    jest: true
  },
  rules: {
    "react/no-multi-comp": "off",
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    "no-console": "off",
    "comma-dangle": "off",
    "react/sort-comp": "off",
    "no-underscore-dangle": "off",
    "react/prefer-stateless-function": "off",
    "no-else-return": "off",
    quotes: ["error", "single"],
    // "object-curly-newline": ["error", {
    //     "ObjectExpression": "always",
    //     "ObjectPattern": { "multiline": true },
    //     "ImportDeclaration": "never",
    //     "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    // }],
    "object-curly-newline": "off",
    "global-require": "off",
    'no-unused-vars': 'off',
    "import/prefer-default-export": "off",
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  globals: {
    fetch: false
  }
};
