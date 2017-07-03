const path = require('path')
const webpack = require('webpack')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
		'comon-ui': './src/index'
	},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'ComonUI',
		libraryTarget: 'umd'
  },
	resolve: {
		extensions: [".js", ".es6", ".vue", ".scss", ".css"]
	},
	module: {
    rules: [
			{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
		]
	},
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "Common UI Build Done"
    })
  ],
  devServer: {
    hot: false
  },
  stats: {
    modules: false
  }
}
