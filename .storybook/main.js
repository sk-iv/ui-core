const path = require('path')
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')

module.exports = {
  stories: ['../packages/**/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-docs/register',
    'storybook-css-modules-preset',
  ],
  webpackFinal: (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@sivasifr/ui-core': path.resolve(__dirname, '../packages/ui-core'),
      '@sivasifr/ui-carousel': path.resolve(__dirname, '../packages/ui-carousel'),
      '@sivasifr/icons': path.resolve(__dirname, '../packages/icons'),
    }
    const ruleCssIndex = config.module.rules.findIndex(
      (rule) => rule.test.toString() === "/\\.css$/"
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

    config.module.rules.push({
      // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
      //     the docs page from the markdown
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          // may or may not need this line depending on your app's setup
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    });
    // 2b. Run `source-loader` on story files to show their source code
    //     automatically in `DocsPage` or the `Source` doc block.
    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve('@storybook/source-loader'),
      exclude: [/node_modules/],
      enforce: 'pre',
    });

    return config
  },
};