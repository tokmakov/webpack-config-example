const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildMode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const outputDir = process.env.NODE_ENV === 'production' ? 'build' : 'dist'
const sourceMap = process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'eval-source-map'

const loaderCSS = process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'

const config = {
    mode: buildMode,
    devtool: sourceMap,
    entry: {
        main: path.resolve(__dirname, 'src/ts/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, outputDir),
        filename: '[name].[contenthash].bundle.js',
        // здесь будут файлы ресурсов, для которых не задан путь в настройках загрузчика
        assetModuleFilename: 'asset/[hash][ext][query]',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '...'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack config example',
            template: path.resolve(__dirname, 'src/index.html'), // файл шаблона
            filename: 'index.html', // выходной файл
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.png'),
                    to: path.resolve(__dirname, outputDir)
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.txt$/i, // простой текст
                type: 'asset/source'
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i, // изображение
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4096 // ограничение 4kb
                    }
                },
                generator: {
                    filename: 'img/[hash][ext][query]' // все изображения в dist/img
                }
            },
            {
                test: /\.s?css$/, // файл css-стилей
                use: [
                    loaderCSS,
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
            {
                test: /\.(woff2?|eot|ttf|otf)$/i, // файлы шрифтов
                type: 'asset/resource',
                generator: {
                    filename: 'font/[hash][ext][query]' // все шрифты в dist/font
                }
            },
            {
                test: /\.(ts|js)$/, // js и ts файлы, транспиляция
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },
        ],
    },
    devServer: {
        port: 9000,
        open: true, // открыть браузер
    },
    watchOptions: {
        ignored: /node_modules/, // не отслеживать node_modules
        poll: 1000, // проверять изменения каждую секунду
    },
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'})
    )
}

module.exports = config
