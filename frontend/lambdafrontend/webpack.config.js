// webpack.config.js
const webpack = require("webpack");
const dotenv = require("dotenv");

// Call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// Create an object to define our environment variables
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  // other webpack config
  plugins: [new webpack.DefinePlugin(envKeys)],
};
