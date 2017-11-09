var path = require('path');

module.exports = {
  entry: './pages/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  devServer: {
    contentBase: './build/main.bundle.js'
  },
};