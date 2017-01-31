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
  output: {
    path: __dirname + '/frontout/',
    publicPath: '/',
    filename: 'index.js'
  },       
  entry: [
    'babel-polyfill',
    './front/index.jsx'
  ],
  externals: {
    'jquery': 'jQuery',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  },  
  module: {
    loaders: [
      {
        //loader: 'react-hot!babel-loader',
        loader: 'babel-loader',

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "front"),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.(js|jsx)$/,

        // Options to configure babel with
        query: {
          presets: ['stage-2', 'es2015', 'react']
        }
      },
    ]
  }
};