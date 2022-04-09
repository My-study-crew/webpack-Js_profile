//* Adquiring our path
const path = require("path");

//* Adquiring our HTML plugin for Webpack
const htmlWebpackPlugin = require("html-webpack-plugin");

//* Adquiring our CSS plugin for Webpack
const miniCssExtractPlugin = require("mini-css-extract-plugin");

//* Adquiring our Copy plugin for Webpack
const copyWebpackPlugin = require("copy-webpack-plugin");

//* Adquiring our Minimizer plugin for Webpack
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");

//* Adquiring our Terser plugin for Webpack
const terserWebpackPlugin = require("terser-webpack-plugin");

//* Adquiring our Dotenv for Webpack
const dotEnvWebpack = require("dotenv-webpack");

//* Indicating main configurations
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]",
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@templates": path.resolve(__dirname, "src/templates/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@images": path.resolve(__dirname, "src/assets/images/"),
        },
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
            {
                test: /\.png/,
                type: "asset/resource",
            },
            // { Old code we used to use
            //     test: /\.(woff|woff2)$/,
            //     use: {
            //         loader: "url-loader",
            //         options: {
            //             limit: 10000,
            //             mimetype: "application/font-woff",
            //             name: "[name].[contenthash].[ext]",
            //             outputPath: "./assets/fonts/",
            //             publicPath: "../assets/fonts/",
            //             esModule: false,
            //         },
            //     },
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash][ext]",
                },
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new miniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css",
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images",
                },
            ],
        }),
        new dotEnvWebpack(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new cssMinimizerPlugin(), new terserWebpackPlugin()],
    },
};
