module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        jquery: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
    },
    extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
    plugins: [],
    // add your custom rules here
    rules: {
        'vue/attribute-hyphenation': 0,
        'vue/no-v-html': 0,
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'no-console': 0
    }
}