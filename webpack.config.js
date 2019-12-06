const {version} = require('./package');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package');
const path = require('path');

module.exports = {
    mode: 'production',

    entry: {
        'bavary.lib.js': './src/index.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        filename: '[name]',
        path: `${__dirname}/lib`,
        library: 'BavaryLib',
        libraryTarget: 'umd',

        // See https://github.com/webpack/webpack/issues/6525
        globalObject: `(() => {
                if (typeof self !== 'undefined') {
                    return self;
                } else if (typeof window !== 'undefined') {
                    return window;
                } else if (typeof global !== 'undefined') {
                    return global;
                } else {
                    return Function('return this')();
                }
            })()`
    },

    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'ts-loader',
                    'eslint-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin({
            banner: `Bavary Library ${version} MIT | https://github.com/Simonwep/bavary-lib`
        }),

        new webpack.SourceMapDevToolPlugin({
            filename: '[name].map'
        }),

        new webpack.DefinePlugin({
            VERSION: JSON.stringify(pkg.version)
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                sourceMap: true,
                terserOptions: {
                    module: true,
                    ecma: 6
                }
            })
        ]
    }
};
