const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/ts/index.ts'),
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
                    filename: 'img/[hash][ext][query]' // все изображения в dist/img или build/img
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i, // файлы шрифтов
                type: 'asset/resource',
                generator: {
                    filename: 'font/[hash][ext][query]' // все шрифты в dist/font или build/font
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
}
