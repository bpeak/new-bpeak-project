const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
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
  mode: 'development',
  entry: './src/client/index.tsx',
  output: {
    publicPath: `/dist/`,
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].chunk.js',
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
                  // console.log(localIdentName);
                  // console.log(options);
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
      template: './public/index.html',
      // favicon: "./public/favicon.ico"
    }),
    new DefinePlugin({
      FetchUrl: JSON.stringify('https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist'),
    }),
    new webpack.NormalModuleReplacementPlugin(/\.\/pages/, './pages/index.async.ts'),
    // 여기에 헤더, 모달등 분리할거 전부다 추가...
    // new webpack.NormalModuleReplacementPlugin(/^pages$/, "pages/index.async.js")
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // host: "localhost",
    publicPath: 'http://localhost:5000/dist/',
    port,
    open: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    alias: {
      components: path.resolve(__dirname, 'src/shared/components'),
      lib: path.resolve(__dirname, 'src/shared/lib'),
      store: path.resolve(__dirname, 'src/shared/store'),
      hooks: path.resolve(__dirname, 'src/shared/hooks'),
      scss: path.resolve(__dirname, 'src/shared/scss'),
    },
  },

  // bundle로부터 vender, chunk 파일 분리해줌
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
