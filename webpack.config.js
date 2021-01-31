const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ['node_modules']
  },
  output: {
    path: path.resolve(__dirname, "build/assets/js"),
    filename: "bundle.js",
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
    historyApiFallback: true
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./src/**/*",
      },
    }),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
};

module.exports = config;