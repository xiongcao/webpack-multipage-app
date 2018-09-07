const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "../dist"), //服务器从哪里提供内容。只有在你想要提供静态文件时才需要,
        // compress: true,//一切服务都启用gzip 压缩
        inline: true,
        port: 8080,
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(), //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        new webpack.HotModuleReplacementPlugin()
    ]
});