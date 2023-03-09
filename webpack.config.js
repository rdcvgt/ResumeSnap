const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		// publicPath: "/",
	},
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		template: "dist/index.html",
	// 		favicon: "dist/favicon.ico",
	// 	}),
	// ],
	//DevServer 設定
	devServer: {
		static: "./dist",
		historyApiFallback: true,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
};
