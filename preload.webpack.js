const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname),
    // filename: './src/preload/preload.js',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
