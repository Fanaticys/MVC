const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      merge = require('webpack-merge'),
      webpack = require('webpack'),
      sass = require('./webpack/sass.js'),
      css = require('./webpack/css.js'),
      images = require('./webpack/images.js'),
      extractCSS = require('./webpack/extract.css'),
      uglifyJS = require('./webpack/uglify.js'),
      fonts = require('./webpack/fonts.js'),
      babel = require('./webpack/babel.js'),
      devServer = require('./webpack/devserver');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
};

const common =  merge([
    {
        entry: {
            'app': PATHS.source + "/js/app.js"
        }, 
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                chunks: ['common', 'app'],
                template: PATHS.source + "/index.html"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            })
        ]
    },
    images(),
    fonts(),
    babel()
]);

module.exports = function(env){
    if(env === "development"){
        return merge([
            common,
            devServer(),
            sass(),
            css()
        ])
    }
    if(env === "production"){
        return merge([
            common,
            extractCSS(),
            uglifyJS()
        ])
    }
}