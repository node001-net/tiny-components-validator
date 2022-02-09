const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.webpackConfig({
    module: {
       rules: [{
           test: /\.riot$/,
           exclude: '/node_modules/',
           use: [{
               loader: '@riotjs/webpack-loader',
               options: {
                   hot: false
               }
           }]
       }]
   }
})

mix.js('src/example.js', 'example')
    .sass('src/example.scss', 'example')
    .options({
        terser: {
            extractComments: false,
        },
        processCssUrls: false
    })
