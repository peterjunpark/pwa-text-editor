const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { GenerateSW } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      hot: "only",
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new InjectManifest({
        srcSW: "./src-sw",
        destSW: "src-sw.js",
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        background_color: "#225ca3",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
          },
        ],
        lang: "en",
        // using default configs for crossorigin, fingerprints, inject,
        // orientation, display, etc.
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["css-loader", "style-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
