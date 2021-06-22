module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: process.env.API_HOST,
                changeOrigin: true,
            },
        },
    },
}
