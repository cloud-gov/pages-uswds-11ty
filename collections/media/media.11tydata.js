module.exports = {
  layout: "layouts/media",
  tags: ["media"],
  permalink: "/media/{{ page.fileSlug }}/",
  eleventyComputed: {
    thumbnail_alt: (data) => data.thumbnail_alt || data.title,
    description: (data) => data.description || data.excerpt,
  },
};
