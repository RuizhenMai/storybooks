const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

// const withSourceMaps = require("@zeit/next-source-maps")();
module.exports = withCSS(
  withSass()
  // withSourceMaps({
  //   webpack(config, options) {
  //     return config;
  //   }
  // })
);
