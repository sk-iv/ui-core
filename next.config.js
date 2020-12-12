const withCSS = require('@zeit/next-css')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[name]_[local]__[hash:base64:5]",
  },
  postcssLoaderOptions: {
    parser: true,
  },
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

    return config;
  },
}