import antfu from '@antfu/eslint-config'

export default antfu({
    formatters: false,
    unocss: true,
    vue: true,
    stylistic: false
}, {
    rules: {
        'indent': ["error", 4, { "SwitchCase": 1 }],
        'vue/html-indent': ["error", 4],
        'vue/html-closing-bracket-spacing': "off"
    }
})
