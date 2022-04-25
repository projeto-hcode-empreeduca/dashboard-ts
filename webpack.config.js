const path = require("path");

module.exports = {
    mode: "development",
    entry: "./public/typescript/index.ts",
    output: {
        filename: "bundle.js",
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    devServer: {
        writeToDisk: true,
        static: {
            directory: path.join(__dirname, "public"),
        },
    },
};