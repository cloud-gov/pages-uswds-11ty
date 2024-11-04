const fs = require('fs/promises');
const path = require('path');
const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');

async function getFontFiles(assetPath, pathPrefix) {
  const assetDirs = await fs.readdir(assetPath, {withFileTypes: true});
  const fonts = await Promise.all(
    assetDirs.map(async (item) => {
      const itemPath = path.join(assetPath, item.name);
      const stats = await fs.lstat(itemPath);
      if (stats.isFile() && path.extname(item.name) === '.woff2') {
        return item.name;
      }
      return null;
    })
  );
  return fonts.filter(item => item !== null)
    .map((file) => {
      const {name, ext} = path.parse(file);
      const hashedAt = name.lastIndexOf('-');
      const originalName = name.slice(0, hashedAt);
      const key = `${originalName}${ext}`;
      return {[key]: `${pathPrefix}/assets/${file}`};
    });
}

async function createAssetPaths() {
  let pathPrefix = '';

  if (process.env.BASEURL) {
    pathPrefix = process.env.BASEURL;
  }

  const assetPath = path.join(__dirname, '../_site/assets');
  let assetDirs = await fs.readdir(assetPath, { withFileTypes: true });
  const fontFiles = await getFontFiles(assetPath, pathPrefix);

  assetDirs = assetDirs
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  const assetsFiles = await Promise.all(
    assetDirs.map(async (dir) => {
      const files = await fs.readdir(
        path.join(__dirname, '../_site/assets', dir),
      );
      return files.map((file) => {
        const { name, ext } = path.parse(file);
        const hashedAt = name.lastIndexOf('-');
        const originalName = hashedAt > -1 ? name.slice(0, hashedAt) : name;
        const key = `${originalName}${ext}`;
        return {
          [key]: `${pathPrefix}/assets/${dir}/${file}`,
        };
      });
    })
  );
  const assets = Object.assign({}, ...assetsFiles.flat(), ...fontFiles.flat());
  const outputData = path.join(__dirname, '../_data/assetPaths.json');

  return await fs.writeFile(outputData, JSON.stringify(assets, null, 2));
}

esbuild
  .build({
    entryPoints: ['styles/styles.scss', 'js/app.js', 'js/admin.js', 'js/uswds-init.js'],
    entryNames: '[dir]/[name]-[hash]',
    outdir: '_site/assets',
    format: 'iife',
    loader: {
      '.jpg': 'file',
      '.gif': 'file',
      '.png': 'file',
      '.webp': 'file',
      '.svg': 'file',
      '.ttf': 'file',
      '.woff': 'file',
      '.woff2': 'file',
    },
    minify: process.env.ELEVENTY_ENV === 'production',
    sourcemap: process.env.ELEVENTY_ENV !== 'production',
    target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
    plugins: [sassPlugin({
      loadPaths: [
        "./node_modules/@uswds",
        "./node_modules/@uswds/uswds/packages"
      ]
    })],
    bundle: true,
  })
  .then(() => createAssetPaths())
  .then(() => {
    console.log('Assets have been built!');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
