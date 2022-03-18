const path = require('path');
const Image = require('@11ty/eleventy-img');

module.exports.imageWithClassShortcode = async function imageWithClassShortcode(
  src,
  cls,
  alt
) {
  const ext = path.extname(src);
  const fileType = ext.replace('.', '');

  const metadata = await Image(src, {
    formats: [fileType],
    outputDir: './_site/img/',
  });

  const data = metadata[fileType] ? metadata[fileType][0] : metadata.jpeg[0];
  return `<img src="${data.url}" class="${cls}" alt="${alt}" loading="lazy" decoding="async">`;
};


module.exports.imageShortcode = async function imageShortcode(src, alt) {
  return await this.imageWithClassShortcode(src, '', alt)
};
