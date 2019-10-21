const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    build: './src/index.js',
    admin: './src/admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader'
      // }
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]'
            }
          },
          {
            loader: 'html-loader',
            options: {
              root: path.resolve(__dirname, 'src')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/assets/',
    port: 8000,
    hot: true,
    historyApiFallback: true
  }
};
