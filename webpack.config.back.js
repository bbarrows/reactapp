/*
module: {
  loaders: [
    {

      entry: [
    './back/index.js'
  ],

      output: {
        path: __dirname + '/backout/',
        publicPath: '/',
        filename: 'index.js'
      },      

      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "back"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.js?$/,

      // Options to configure babel with
      query: {
        plugins: ['transform-runtime']
      }
    },
  ]
}
*/

//npm install --save react-hot-loader react-addons-test-utils babel-preset-react babel-preset-es2015  babel-core babel-loader babel-preset-stage-2 babel-polyfill babel-runtime babel-plugin-transform-runtime koa koa-router


const path = require('path');
const { resolve } = require('path');
const { dependencies } = require('./package.json');

const nodeModules = {};

Object
    .keys(dependencies)
    .forEach((mod) => {
     nodeModules[mod] = `commonjs ${mod}`;
    });

module.exports = {
  entry: [
    'babel-polyfill',
    './back/index.js'
  ],
  output: {
    path: __dirname + '/backout/',
    publicPath: '/',
    filename: 'index.js'
  },      

  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'back'),
        loader: 'babel-loader',
        exclude: /node-modules/,
        query: {
          presets: ['stage-2', 'es2015']
        }
      }
    ]
  },
  externals: nodeModules
};