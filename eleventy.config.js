const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
  const pathPrefix = process.env.BASEURL + "/workplace/";

  // Copy assets directory
  eleventyConfig.addPassthroughCopy("assets");

  // Add 11ty plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Read YAML files in the _data directory
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  // Watch for changes in additional directories
  eleventyConfig.addWatchTarget("_data");

  // Make these variables available everywhere on the site
  eleventyConfig.addGlobalData("pathPrefix", pathPrefix);

  return {
    pathPrefix,
  }
};
