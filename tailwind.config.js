module.exports = {
    mode: 'jit',
    purge: {
        mode: 'all',
        preserveHtmlElements: false,
        content: ['./src/**/*.{js,vue}', './public/index.html'],
        options: {
            keyframes: true,
        },
    },
}
