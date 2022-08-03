const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = (env, argv) => {
    const buildMode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
    const modeConfig = require(`./webpack.${buildMode}.js`)
    return merge(commonConfig, modeConfig)
}
