export default {
  permalink: (data) => {
    let pagePath = data.page.inputPath
      .replace(/^\.\/pages/, "")
      .replace(/\.(md|html|njk)$/, "");

    if (pagePath.endsWith("/index")) {
      pagePath = pagePath.slice(0, -6) + "/";
    } else {
      pagePath += "/index.html"; // Add .html extension for non-index files
    }

    return pagePath;
  },
};
