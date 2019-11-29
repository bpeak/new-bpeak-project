const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const incstr = require('incstr');
const webpack = require('webpack');
const path = require('path');

const port = process.env.PORT || 5000;
const createUniqueIdGenerator = require('./webpackUtils/createUniqueIdGenerator');
const uniqueIdGenerator = createUniqueIdGenerator();
const generateScopedName = (localName, resourcePath) => {
  return `${uniqueIdGenerator(resourcePath + localName)}`;
};

module.exports = {
  // mode: "development",
  entry: './src/client/index.tsx',
  output: {
    publicPath: `/dist/`,
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          plugins: [
            'react-hot-loader/babel',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
            [
              'react-css-modules',
              {
                autoResolveMultipleImports: true,
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss', // your preprocessor
                  },
                },
                generateScopedName,
              },
            ],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: (context, localIdentName, localName, options) => {
                  return generateScopedName(localName, context.resourcePath);
                },
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(svg|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/client.html',
      // favicon: "./public/favicon.ico"
    }),
    new DefinePlugin({
      FetchUrl: JSON.stringify('https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist'),
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    index: 'index.html',
    publicPath: 'http://localhost:5000/dist/',
    port,
    historyApiFallback: {
      index: '/dist/',
    },
    // open: true,
    // historyApiFallback: true,
    // hot: true,
    // inline: true,
    // proxy: {
    //   "*": "http://localhost:5000/dist"
    // }
    // // contentBase: path.join(__dirname, "dist"),
    // // host: "localhost",
    // publicPath: "http://localhost:5000/dist/",
    // port,
    // open: true,
    // historyApiFallback: true,
    // hot: true,
    // inline: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/shared/components'),
      lib: path.resolve(__dirname, 'src/shared/lib'),
      store: path.resolve(__dirname, 'src/shared/store'),
      hooks: path.resolve(__dirname, 'src/shared/hooks'),
      scss: path.resolve(__dirname, 'src/shared/scss'),
    },
  },
};
