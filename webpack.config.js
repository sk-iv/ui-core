const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
      '@sivasifr/ui-core': path.resolve(__dirname, './packages/ui-core/src'),
      '@sivasifr/ui-carousel': path.resolve(__dirname, './packages/ui-carousel/src'),
      '@sivasifr/icons': path.resolve(__dirname, './packages/icons/src'),
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
              // '@babel/preset-env',
              '@babel/preset-react',
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
                localIdentName: '[name]_[local]_[hash:base64:5]',
                exportLocalsConvention: 'dashesOnly',
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
    ],
  },
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
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
