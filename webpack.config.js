const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dev = process.env.NODE_ENV === "dev"
const plugins = [];


module.exports = {
    context: path.resolve(__dirname, './'),
    entry : './src/app.js',
    watch: dev,
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
        chunkFilename: 'chunk.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: !dev ? '[name].[contenthash].css' : '[name].css',
      }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
              test: /\.s[ac]ss$/i,
                use: [
                  { loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader },
                  {
                    loader: 'css-loader'
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        config: path.resolve(__dirname, './postcss.config.js'),
                        plugins: [
                          [
                            'postcss-preset-env',
                            {
                              // Options
                            },
                          ],
                        ]
                      },                      
                    }
                  },
                  {
                    loader: 'sass-loader', options: { sourceMap: true }
                  }
                ],
              },
              {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
              },
        ],

    },
};





