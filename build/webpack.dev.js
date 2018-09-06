const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: false,     //如果指定路径的话则是从dist目录读取文件
        // contentBase: './dist',
        // contentBase: path.join(__dirname, "../dist"),//服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    }
});