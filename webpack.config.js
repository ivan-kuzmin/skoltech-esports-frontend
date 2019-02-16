const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';


const games = ['pageOne', 'balls']
const entryGames = {}
for (name of games) {
  entryGames[name] = `./src/games/${name}/index.js`
}
const htmlGames = games.map(name =>
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/games/index.html',
    filename: `games/${name}/index.html`,
    chunks: [name],
  })
)


const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    port: 9000,
    stats: {
      children: false, // hide children errors
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  }
};


const gamesConfig = Object.assign({}, config, {
  entry: entryGames,
  output: {
    filename: 'games/[name]/index.js',
    path: __dirname + '/dist',
  },
  plugins: [
    ...htmlGames,
  ],
});


const appConfig = Object.assign({}, config, {
  entry: {
    app: './src/app/index.js',
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/app/index.html',
      filename: `index.html`,
      chunks: ['app'],
    }),
    new CleanWebpackPlugin('dist', {})
  ],
});

module.exports = [appConfig, gamesConfig]
