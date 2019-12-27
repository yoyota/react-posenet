module.exports = {
  extends: [
    "airbnb",
    "prettier/react",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:prettier/recommended"
  ],
  env: {
    jest: true,
    browser: true
  },
  plugins: ["jest", "promise", "prettier", "react", "react-hooks"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "no-alert": "error",
    "no-console": "error",
    "no-param-reassign": ["error", { props: false }],
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "_"
      }
    ],
    "jsx-a11y/media-has-caption": "off",
    "prettier/prettier": [
      "error",
      {
        semi: false
      }
    ],
    "react/prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  }
}
