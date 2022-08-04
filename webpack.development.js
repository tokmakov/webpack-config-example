const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'), // директория dist
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'asset/[hash][ext][query]',
        clean: true
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.png'),
                    to: path.resolve(__dirname, 'dist') // директория dist
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/, // файл css-стилей
                use: [
                    'style-loader', // <style> внутри <head>
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
        ]
    },
    devServer: {
        port: 9000,
        open: true,
        devMiddleware: {
            writeToDisk: true, // записывать файлы сборки на диск
        },
    },
    watchOptions: {
        ignored: /node_modules/, // не отслеживать node_modules
        poll: 1000, // проверять изменения каждую секунду
    },
}
