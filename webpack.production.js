const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    devtool: 'nosources-source-map',
    output: {
        path: path.resolve(__dirname, 'build'), // директория build
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'asset/[hash][ext][query]',
        clean: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.png'),
                    to: path.resolve(__dirname, 'build'), // директория build
                },
            ],
        }),
        new MiniCssExtractPlugin({ // <link> внутри <head>
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/, // файл css-стилей
                use: [
                    MiniCssExtractPlugin.loader, // <link> внутри <head>
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    'postcss-preset-env': {
                                        browsers: 'last 3 versions',
                                    },
                                },
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
}
