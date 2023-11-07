/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */
const path = require("path");

module.exports = {
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@pageObjects": path.resolve(__dirname, "../pageObjects"),
      "@support": path.resolve(__dirname, "../support"),
      "@plugins": path.resolve(__dirname, "../plugins"),
    },
  },
  node: { fs: "empty", child_process: "empty", readline: "empty" },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.feature$/,
        use: [
          {
            loader: "cypress-cucumber-preprocessor/loader",
          },
        ],
      },
    ],
  },
};
