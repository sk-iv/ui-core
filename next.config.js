
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });
    //https://github.com/vercel/next.js/discussions/15818
    config.module.rules[1].oneOf.forEach((moduleLoader) => {
      Array.isArray(moduleLoader.use) &&
      moduleLoader.use.forEach((l) => {
        if (l.loader.includes('css-loader') && !l.loader.includes('postcss-loader')) {
          delete l.options.modules.getLocalIdent;
          l.options.modules = {
            ...l.options.modules,
            // Your custom css-modules options below.
            localIdentName: '[name]_[local]_[hash:base64:5]',
            exportLocalsConvention: "dashesOnly",
          };
        }
      });
    });

    return config;
  },
}