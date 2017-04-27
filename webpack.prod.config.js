var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// 产出html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 单独样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
    entry: [
      'babel-polyfill',
      path.resolve(__dirname, 'app/main.jsx')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "boudle.js",
        publicPath: '/jifen/',
        chunkFilename: '[name].[chunkhash:5].js'
    },
    resolve: {
      extension: ['', '.jsx', '.js', '.json'],
      alias: {}
    },
    'display-error-details': true,
    module: {
      loaders: [
        {
          test: /\.js[x]?$/,
          loaders: ['babel-loader'],
          exclude: path.resolve(__dirname, 'node_modules')
        },
        { 
          test: /\.scss$/,
          include: path.resolve(__dirname, 'app'), 
          loader: 'style!css!sass?sourceMap'
        },
        {
          test: /\.css/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url?limit=8192'
        },
          {
              test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
              loader : 'file-loader'
          }

      ]
    },
    plugins: [
      new ExtractTextPlugin("main.css", {
          allChunks: true,
          disable: false
      }),
      new webpack.DefinePlugin({
        "process.env": { 
          NODE_ENV: JSON.stringify("production") 
        }
      }),
      new CompressionWebpackPlugin({ //gzip 压缩
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
        ),
        threshold: 10240,
        minRatio: 0.8
     }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new uglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        title: '积分商城',
        template: './app/index.html',
      }),
      new webpack.optimize.MinChunkSizePlugin({
        compress: {
          warnings: false
        }
      }),
      // 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块,明显提升打包速度
      new webpack.optimize.DedupePlugin(),
      // 按引用频度来排序 ID，以便达到减少文件大小的效果
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin({
      			minSizeReduce: 1.5,
      			moveToParents: true
      	}),
    ]
};
