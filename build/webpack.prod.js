const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理dist文件夹
const common = require('./webpack.base.conf');

module.exports = merge(common, {
    // devtool: 'source-map',//避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
    devtool: false,
    output:{
        publicPath:'./' //并不会对生成文件的路径造成影响，主要是对你的页面里面引入的资源的路径做对应的补全
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')//任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量
        }),
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname, '../'),   //根目录
            verbose:  true,
        })
    ],
    performance: {//建议每个输出的 js 文件的大小不要超过 250k
        hints: 'process.env.NODE_ENV' ? false : 'warning',
        // maxAssetSize: 300000, // 整数类型（以字节为单位）
        // maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        // assetFilter: function(assetFilename) {
        //     // 提供资源文件名的断言函数
        //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
        // }
    }
});