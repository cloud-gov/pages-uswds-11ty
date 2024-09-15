module.exports = {
    plugins: [
        require('autoprefixer')({
            map: process.env.ELEVENTY_ENV !== 'production'
        }),
    ],
};