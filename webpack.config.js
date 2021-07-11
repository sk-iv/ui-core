const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

// eslint-disable-next-line camelcase
__webpack_base_uri__ = 'http://localhost:8080';

// Try the environment variable, otherwise use root
// argv.mode !== 'production' ? '/' : 'assets/'

module.exports = (env, argv) => ({
  entry: {
    main: path.resolve(__dirname, './pages/index.js'),
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: argv.mode !== 'production' ? '/' : 'assets/',
  },
  resolve: {
    alias: {
      '@sivasifr/ui-core': path.resolve(__dirname, './packages/ui-core'),
      '@sivasifr/ui-carousel': path.resolve(__dirname, './packages/ui-carousel'),
      '@sivasifr/icons': path.resolve(__dirname, './packages/icons'),
    },
    extensions: ['*', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-syntax-jsx',
            ],
          },
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          (argv.mode !== 'production' ? MiniCssExtractPlugin.loader : 'style-loader'),
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: argv.mode !== 'production'
                  ? '[name]_[local]_[hash:base64:5]'
                  : '[name]_[local]',
                exportLocalsConvention: 'dashesOnly',
                auto: (resourcePath) => resourcePath.endsWith('.mdl.css'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
    ],
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './pages/template.html'), // template file
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new ESLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({}),
    // argv.mode !== 'production' && new webpack.HotModuleReplacementPlugin(),
    argv.mode !== 'production' && new ReactRefreshWebpackPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
