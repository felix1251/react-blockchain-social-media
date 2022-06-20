const path = require("path");
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
      target: 'web',
      entry: "./src/index.js",
      output: {
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js",
      },
      externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
      externals: [nodeExternals({
            importType: 'umd'
      })],
      module: {
            rules: [
                  {
                        test: /\.(js|jsx)$/,
                        exclude: /(node_modules)/,
                        include: path.resolve(__dirname, "src"),
                        use: {
                              loader: "babel-loader"
                        }
                  },
                  {
                        test: /\.css$/i,
                        use: ["style-loader", "css-loader"],
                  },
                  {
                        test: /\.(png|jpe?g|gif)$/i,
                        use: [
                              {
                                    loader: 'file-loader',
                              },
                        ],
                  },
                  {
                        test: /\.svg$/,
                        loader: 'svg-inline-loader'
                  },
                  {
                        test: /\.bundle\.js$/,
                        use: 'bundle-loader'
                  },
                  {
                        test: /\.js$/,
                        enforce: 'pre',
                        use: ['source-map-loader'],
                  },
                  {
                        test: /\.html$/,
                        use: [
                              {
                                    loader: "html-loader"
                              }
                        ]
                  }

            ]
      },
      plugins: [
            new Dotenv(),
            new HtmlWebPackPlugin({
                  template: "./public/index.html",
                  filename: "./index.html"
            })
      ],
      devServer: {
            historyApiFallback: true
      },
      resolve: {
            extensions: ["*", ".js", ".jsx", ".css"],
            fallback: {
                  "crypto": require.resolve("crypto-browserify"),
                  "stream": require.resolve("stream-browserify"),
                  "assert": require.resolve("assert"),
                  "http": require.resolve("stream-http"),
                  "https": require.resolve("https-browserify"),
                  "os": require.resolve("os-browserify"),
                  "url": require.resolve("url")
            }
      },
      optimization: {
            minimize: false
      }

};