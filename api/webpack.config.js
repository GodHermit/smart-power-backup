const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
require('dotenv').config({ path: './.env' });

module.exports = {
  mode: 'production',
  entry: path.resolve('src/index.js'),
  output: {
    path: path.resolve('build'),
    filename: 'pico-w-software.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  externals: {
    events: 'commonjs events',
    gpio: 'commonjs gpio',
    led: 'commonjs led',
    button: 'commonjs button',
    pwm: 'commonjs pwm',
    adc: 'commonjs adc',
    i2c: 'commonjs i2c',
    spi: 'commonjs spi',
    uart: 'commonjs uart',
    rp2: 'commonjs rp2',
    cyw43_arch: 'commonjs cyw43_arch',
    graphics: 'commonjs graphics',
    at: 'commonjs at',
    stream: 'commonjs stream',
    net: 'commonjs net',
    dgram: 'commonjs dgram',
    http: 'commonjs http',
    wifi: 'commonjs wifi',
    url: 'commonjs url',
    path: 'commonjs path',
    flash: 'commonjs flash',
    fs: 'commonjs fs',
    rtc: 'commonjs rtc',
    vfs_lfs: 'commonjs vfs_lfs',
    vfs_fat: 'commonjs vfs_fat',
    sdcard: 'commonjs sdcard',
    pico_cyw43: 'commonjs pico_cyw43',
  },
  devtool: 'source-map',
};
