const path = require('path')

module.exports = {
  stories: ['../packages/**/**/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
    'storybook-css-modules-preset',
  ],
  webpackFinal: (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@sivasifr/ui-core': path.resolve(__dirname, '../packages/ui-core/src'),
      '@sivasifr/ui-carousel': path.resolve(__dirname, '../packages/ui-carousel/src'),
      '@sivasifr/icons': path.resolve(__dirname, '../packages/icons/src'),
    }
    const ruleCssIndex = config.module.rules.findIndex(
      (rule) => rule.test.toString() === "/\\.module\\.css$/"
    )
    config.module.rules[ruleCssIndex].use.map((item) => {
      if (item.loader && item.loader.includes("\\css-loader\\")) {
        item.options = {
          localsConvention: "camelCase",
        }
        item.options.modules = {
          mode: "local",
          localIdentName: "[name]__[local]__[hash:base64:5]",
        }
      }
      return item
    })

    return config
  },
};