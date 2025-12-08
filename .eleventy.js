const { DateTime } = require("luxon");
const path = require("path");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItNamedHeadings = require("markdown-it-named-headings");
const yaml = require("js-yaml");
const svgSprite = require("eleventy-plugin-svg-sprite");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = async function (config) {
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

  // Set pathPrefix for site
  let pathPrefix = "/";

  // Copy the `admin` folders to the output
  config.addPassthroughCopy("admin");
  config.addPassthroughCopy("uploads");
  config.addPassthroughCopy("favicon.ico");

  // Add plugins
  config.addPlugin(pluginRss);
  config.addPlugin(pluginNavigation);
  config.addPlugin(EleventyHtmlBasePlugin);
  config.addPlugin(eleventyImageTransformPlugin, {
    failOnError: false,
    widths: ["auto", 600],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {},
      fallback: "largest", // or "smallest"
    },
  });

  // SVG Sprite Plugin for USWDS icons
  config.addPlugin(svgSprite, {
    path: "./node_modules/@uswds/uswds/dist/img/uswds-icons",
    svgSpriteShortcode: "uswds_icons_sprite",
    svgShortcode: "uswds_icons",
  });

  config.addPlugin(svgSprite, {
    path: "./node_modules/@uswds/uswds/dist/img/usa-icons",
    svgSpriteShortcode: "usa_icons_sprite",
    svgShortcode: "usa_icons",
  });

  // Allow yaml and CSV to be used in the _data dir
  config.addDataExtension("yaml", (contents) => yaml.load(contents));

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItNamedHeadings);
  config.setLibrary("md", markdownLibrary);

  // Set image shortcodes
  config.addLiquidShortcode("uswds_icon", function (name) {
    return `<svg class="usa-icon" aria-hidden="true" role="img"><use xlink:href="#svg-${name}"></use></svg>`;
  });

  config.addCollection("postsByYear", (collection) => {
    const posts = collection.getFilteredByTag("announcements").reverse();
    const years = posts.map((post) => post.date.getFullYear());
    const uniqueYears = [...new Set(years)];

    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(
        (post) => post.date.getFullYear() === year
      );

      return [...prev, [year, filteredPosts]];
    }, []);

    return postsByYear;
  });

  // If BASEURL env variable exists, update pathPrefix to the BASEURL
  if (process.env.BASEURL) {
    pathPrefix = process.env.BASEURL;
  }

  return {
    pathPrefix,
  };
};
