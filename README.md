[Webpack. Начало работы, часть 1 из 2](https://tokmakov.msk.ru/blog/item/708)

По большей части, сайты больше не пишутся на чистом HTML с небольшим количеством JavaScript — часто они создаются только с помощью JavaScript. Поэтому возникает необходимость в сборке, минификации и транспиляции кода. Вот здесь webpack и приходит на помощь разработчику. Вебпак — это сборщик модулей.

[Webpack. Начало работы, часть 2 из 2](https://tokmakov.msk.ru/blog/item/709)

Давайте скачаем шрифт Roboto, распакуем архив и положим ttf-файлы в директорию src/font/roboto. Потом создадим файл src/css/roboto.css и импортируем его в файле src/css/style.css. И запустим сборку, чтобы посмотреть, что получилось. Все отработало правильно, шрифт подключился, но ttf-файлы оказались…

-----

Файл `webpack.config-single.js` — пример конфигурации в одном файле.

Файлы `webpack.config.js`, `webpack.common.js`, `webpack.development.js`, `webpack.production.js` — пример конфигурации с объединением конфигурации из `webpack.common.js` с конфигурацией из `webpack.development.js` или `webpack.production.js`.

    const { merge } = require('webpack-merge')
    const commonConfig = require('./webpack.common.js')

    module.exports = (env, argv) => {
        const buildMode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
        const modeConfig = require(`./webpack.${buildMode}.js`)
        return merge(commonConfig, modeConfig)
    }
