var path = require('path');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {},
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[fullhash].js'
    },
    plugins: [
      new CompressionPlugin()
    ]
  };
