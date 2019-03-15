const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  const buildDir = path.join(__dirname, devMode ? 'dist' : 'build');

  const games = [
    'balls',
    'reaction_test',
    // 'reaction_decision_test',
    'two_hands_coordination',
    'keyboard_mouse_coordination',
    'keys_reaction_test',
    'mouse_tracking',
    'mouse_aiming',
    'optimal_trajectory',
    'visual_search_with_time_limit',
    'expanding_ball',
    'memory_test',
  ];

  const entryGames = {};
  for (const name of games) {
    entryGames[name] = `./src/games/${name}/index.js`;
  }
  const htmlGames = games.map(name => new HtmlWebpackPlugin(
    {
      hash: true,
      template: './src/games/index.html',
      filename: `games/${name}/index.html`,
      chunks: [name],
    },
  ));

  const config = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: buildDir,
      compress: true,
      port: 9000,
      stats: {
        children: false, // hide children errors
      },
    },
    devtool: 'inline-source-map',
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  };

  const gamesConfig = {
    ...config,
    entry: entryGames,
    output: {
      filename: 'games/[name]/index.js',
      path: buildDir,
    },
    plugins: [
      ...htmlGames,
    ],
  };

  const appConfig = {
    ...config,
    entry: {
      app: './src/app/index.js',
    },
    output: {
      filename: 'index.js',
      path: buildDir,
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        template: './src/app/index.html',
        filename: 'index.html',
        chunks: ['app'],
      }),
      new CleanWebpackPlugin('dist', {}),
    ],
  };

  return [appConfig, gamesConfig];
};
