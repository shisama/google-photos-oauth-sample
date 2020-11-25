const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.ts",
    photos: "./src/photos.ts"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
      "process.env.CLIENT_SECRET": JSON.stringify(process.env.CLIENT_SECRET),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: false,
    port: 9000
  }
}