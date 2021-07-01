const path = require('path');

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}/dist`;

module.exports = {
  entry: [require.resolve('../../src/preload/index.ts')],
  output: {
    publicPath: '../../src/preload',
    filename: 'preload.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),

          },
        ],
      },
    ],
  },
  resolve: {

    extensions: ['.ts']
  },
};
