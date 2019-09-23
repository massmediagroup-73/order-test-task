const path = require('path')

module.exports = {
  productionSourceMap: false,
  integrity: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/styles/settings/*.scss')],
    },
  },
}
