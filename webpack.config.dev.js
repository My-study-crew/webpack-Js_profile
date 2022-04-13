//* Adquiring our path
const path = require("path");

//* Adquiring our HTML plugin for Webpack
const HtmlWebpackPlugin = require("html-webpack-plugin");

//* Adquiring our CSS plugin for Webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//* Adquiring our Copy plugin for Webpack
const CopyWebpackPlugin = require("copy-webpack-plugin");

//* Adquiring our Dotenv for Webpack
const DotEnvWebpack = require("dotenv-webpack");

//* Adquiring our Bundle Analyzer for Webpack
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

//* Indicating main configurations
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]",
    },
    mode: "development",
    // watch: true, // Watcher mode activated
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
                    MiniCssExtractPlugin.loader,
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
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images",
                },
            ],
        }),
        new DotEnvWebpack(),
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        // contentBase: path.join(__dirname, "dist"), old code
        static: {
            directory: path.join(__dirname, "dist"),
            watch: true,
        },
        watchFiles: path.join(__dirname, "./**"),
        compress: true,
        historyApiFallback: true,
        port: 3005,
    },
};
