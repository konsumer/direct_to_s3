import { DefinePlugin, optimize } from 'webpack'
import { resolve } from 'path'
import BabiliPlugin from 'babili-webpack-plugin'
const { ModuleConcatenationPlugin } = optimize

// exposed environemnt
const env = {
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:8000/')
  }
}

// output location, on the webserver
const publicPath = '/build/'

const config = {
  devServer: {
    publicPath,
    stats: {colors: true},
    stats: 'errors-only'
  },
  entry: {
    client: [
      './src/client'
    ]
  },
  output: {
    path: resolve(__dirname, './webroot/build'), // YOUR OUTPUT LOCATION
    publicPath,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: [
          {loader: 'babel-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
              sourceMap: process.env.NODE_ENV !== 'production',
              modules: true
            }
          },
          {
            loader: 'resolve-url-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: process.env.NODE_ENV === 'production',
              sourceMap: process.env.NODE_ENV !== 'production'
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ]

      },
      {
        test: /\.((woof|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin(env)
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new ModuleConcatenationPlugin())
  config.plugins.push(new BabiliPlugin({}, {comments: false}))
} else {
  config.devtool = 'source-map'
}

export default config
