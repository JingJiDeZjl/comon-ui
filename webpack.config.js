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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.resolve(__dirname, 'dist/images/[name].[hash:7].[ext]')
        }
      }
		]
	},
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "Common UI Build Done"
    })
  ],
  stats: {
    modules: false
  }
}
