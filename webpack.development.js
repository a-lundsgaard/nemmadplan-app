const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const base = require("./webpack.config");
const path = require("path");

const nonce = require("./app/electron/create-nonce")();


module.exports = merge(base, {
  mode: "development",
  devtool: "source-map", // Show the source map so we can debug when developing locally
  devServer: {
    host: "localhost",
    port: "40992",
    hot: true, // Hot-reload this server if changes are detected
    compress: true, // Compress (gzip) files that are served
    contentBase: path.resolve(__dirname, "app/dist"), // Where we serve the local dev server's files from
    watchContentBase: true, // Watch the content base for changes
    watchOptions: {
      ignored: /node_modules/ // Ignore this path, probably not needed since we define contentBase above
    }
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/src/index.ejs"),
      filename: "index.html",
      nonce: nonce  // added a new property for ejs template

    }),
    new CspHtmlWebpackPlugin({
      "base-uri": ["'self'"],
      "object-src": ["'none'"],
      "script-src": ["'self'"],
      "style-src": ["'self'", `'nonce-${nonce}'`],
      "frame-src": ["'none'"],
      "worker-src": ["'none'"]
    })
  ]
})