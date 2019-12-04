const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const createUniqueIdGenerator = require('./webpackUtils/createUniqueIdGenerator');
const nodeExternals = require('webpack-node-externals');
const uniqueIdGenerator = createUniqueIdGenerator();
const generateScopedName = (localName, resourcePath) => {
  return `${uniqueIdGenerator(resourcePath + localName)}`;
};

module.exports = {
  // node: {
  //   __dirname: false
  // },
  mode: 'development',
  target: 'node',
  node: false,
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src/server/server.tsx'),
  // entry: "./src/server/server.tsx",
  output: {
    path: path.join(__dirname, 'build'),
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
            '@babel/plugin-proposal-class-properties',
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
            loader: 'css-loader',
            options: { onlyLocals: true },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.server.json' })],
    alias: {
      components: path.resolve(__dirname, 'src/shared/components'),
      lib: path.resolve(__dirname, 'src/shared/lib'),
      store: path.resolve(__dirname, 'src/shared/store'),
      hooks: path.resolve(__dirname, 'src/shared/hooks'),
      scss: path.resolve(__dirname, 'src/shared/scss'),
    },
  },
};
