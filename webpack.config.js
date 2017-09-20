let webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: "inline_sourcemap",
  entry: "./client/js/index.js",
  output: {
    path: __dirname + "/public/static",
    filename: "index.min.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,  loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};
