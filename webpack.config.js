const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const glob = require('glob');

const config = {
    // Common webpack configuration
    module: {
        rules: [
            // perform js babelization on all .js files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // compile all .scss files
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js',
                            },
                        },
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        // launch browsersync at http://localhost:3000/
    ],
    optimization: {
        minimizer: [
            // enable the js minification plugin
            new UglifyJSPlugin({
                sourceMap: true,
                cache: true,
                parallel: true,
            }),
            // enable the css minification plugin
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
};

// Global javascript and css
const configGlobal = Object.assign({}, config, {
    entry: ['./js/global/global-script.js', './scss/styles.scss'],
    output: {
        filename: './dist/global-script.min.[hash].js',
        path: path.resolve(__dirname),
    },
    plugins: [
        // clean out build directories on each build
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist/*.js', './dist/*.js.map', './dist/*.css', './dist/*.css.map'],
        }),
        // extract css into dedicated file
        new MiniCssExtractPlugin({
            filename: './dist/styles.min.[hash].css',
            devtool: 'source-map',
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8888/',
            // trigger refresh on all php changes in root files
            files: ['./*.php'],
        }),
    ],
});

// Single javascript files
const configSingle = Object.assign({}, config, {
    entry: glob.sync('./js/single/*.js').reduce(function(obj, el) {
        obj[path.parse(el).name] = el;
        return obj;
    }, {}),
    output: {
        filename: './dist/single/[name].min.[hash].js',
        path: path.resolve(__dirname),
    },
    plugins: [
        // clean out build directories on each build
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist/single/*'],
        }),
    ],
});

module.exports = [configGlobal, configSingle];
