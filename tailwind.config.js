module.exports = {
    mode: 'jit',
    purge: {
        mode: 'all',
        preserveHtmlElements: false,
        content: ['./src/**/*.vue', './public/index.html'],
        options: {
            keyframes: true,
        },
    },
}
