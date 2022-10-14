module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  rules: {
    'max-len': ['off'],
  },
};
