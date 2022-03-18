const Image = require('@11ty/eleventy-img');

module.exports.imageWithClassShortcode = async function imageWithClassShortcode(
  src,
  cls,
  alt
) {
  let metadata = await Image(src, {
    formats: ['webp', 'png', 'jpeg', 'svg'],
    outputDir: './_site/img/',
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `<img src="${data.url}" class="${cls}" alt="${alt}" loading="lazy" decoding="async">`;
};

module.exports.imageShortcode = async function imageShortcode(src, alt) {
  return await this.imageWithClassShortcode(src, '', alt);
};
