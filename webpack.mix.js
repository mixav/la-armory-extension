let mix = require('laravel-mix');

mix.webpackConfig({
    experiments: {
        topLevelAwait: true
    }
})
    .setPublicPath('dist')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/content-script.js', 'dist/js')
    .js('src/js/popup.js', 'dist/js')
    .copy(['src/manifest.json', 'src/static/popup.html'], 'dist');