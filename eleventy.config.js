const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const yaml = require("js-yaml");
const path = require("path");

module.exports = function(eleventyConfig) {
  const pathPrefix = path.join(process.env.BASEURL || "/", "workplace");

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
    dir: {
      output: path.join("_site", "workplace")
    }
  }
};
