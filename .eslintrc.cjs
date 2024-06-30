module.exports = {
  env: {
    browser: true,
    es2023: true
  },
  extends: ['@nuxtjs', '@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['prettier'],
  rules: {
    'no-undef': 'off',
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
    'linebreak-style': ['off']
  }
}
