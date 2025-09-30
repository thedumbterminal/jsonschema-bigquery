const { defineConfig } = require('eslint/config')

module.exports = (async () => {
  const mochaPlugin = await import('eslint-plugin-mocha')
  const js = await import('@eslint/js')
  const globals = await import('globals')
  return defineConfig({
    extends: [
      js.default.configs.recommended,
      mochaPlugin.default.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.default.node,
        ...globals.mocha,
      },
    },
    rules: {
      'mocha/no-mocha-arrows': 0,
      'comma-dangle': 0,
      'space-before-function-paren': 0,
      camelcase: 0,
    },
  })
})()
