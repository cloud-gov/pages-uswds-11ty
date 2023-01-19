const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const markdownItAnchor = require("markdown-it-anchor");
const yaml = require("js-yaml");
const path = require("path");

module.exports = function(eleventyConfig) {
  const pathPrefix = path.join(process.env.BASEURL || "/", "workplace");

  // Copy assets directory
  eleventyConfig.addPassthroughCopy("assets");

  // Add 11ty plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Add markdown-it plugins
  eleventyConfig.amendLibrary("md", md => md.use(markdownItAnchor));

  // Read YAML files in the _data directory
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  // Watch for changes in additional directories
  eleventyConfig.addWatchTarget("_data");

  // Make these variables available everywhere on the site
  eleventyConfig.addGlobalData("pathPrefix", pathPrefix);

  // Custom shortcodes
  eleventyConfig.addShortcode("feature", featureShortcode);
  eleventyConfig.addPairedShortcode("iconList", iconListShortcode);
  eleventyConfig.addShortcode("iconListItem", iconListItemShortcode);

  return {
    pathPrefix,
    dir: {
      output: path.join("_site", "workplace")
    }
  };
};

function featureShortcode(headingText, actionText, actionUrl, imageUrl) {
  return `
    <section class="usa-hero padding-y-8" style="background-image: url(${imageUrl})">
      <div class="grid-container">
        <h1 class="usa-hero__heading">
          <span class="usa-hero__heading--alt">${headingText}</span>
        </h1>
        <a class="usa-button" href="${actionUrl}">${actionText}</a>
      </div>
    </section>
  `;
}

function iconListShortcode(content) {
  return `
    <ul class="usa-icon-list">
      ${content}
    </ul>
  `;
}

function iconListItemShortcode(classes, icon, text) {
  return `
    <li class="usa-icon-list__item">
      <div class="usa-icon-list__icon ${classes}">
        <svg class="usa-icon" aria-hidden="true" role="img">
          <use xlink:href="assets/uswds/img/sprite.svg#${icon}"></use>
        </svg>
      </div>
      <div class="usa-icon-list__content">
        ${text}
      </div>
    </li>
  `;
}
