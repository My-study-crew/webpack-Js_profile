//* Adquiring our path
const path = require("path");

//* Adquiring our HTML plugin for Webpack
const htmlWebpackPlugin = require("html-webpack-plugin");

//* Adquiring our CSS plugin for Webpack
const miniCssExtractPlugin = require("mini-css-extract-plugin");

//* Adquiring our Copy plugin for Webpack
const copyWebpackPlugin = require("copy-webpack-plugin");

//* Indicating main configurations
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    resolve: {
        extensions: [".js"],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css|.styl$/i,
                use: [
                    miniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader",
                ],
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new miniCssExtractPlugin(),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images",
                },
            ],
        }),
    ],
};
