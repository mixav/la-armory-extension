let mix = require('laravel-mix');

mix.setPublicPath('dist')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/content-script.js', 'dist/js')
    .copy(['src/manifest.json'], 'dist');