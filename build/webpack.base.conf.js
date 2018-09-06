const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //重新生成dist/index.html
const webpack = require('webpack');
const glob = require('glob'); //这里的glob是nodejs的glob模块，是用来读取webpack入口目录文件的

const entrys = getEntry('./src/pages/**/*.js',"js");
module.exports = {
    // entry: {
    //     index: './src/pages/index/index.js'
    // },
    entry: entrys,
    output: {
        filename: 'js/[name]-[hash].js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: './'    //有这个的话开发环境需要指定服务器从打包后的静态文件读取
    },
    mode: "production",
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // contentBase: path.join(__dirname, "../dist"),//服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        contentBase: './dist',
        // compress: true,//一切服务都启用gzip 压缩
        port: 8080,
        hot: true
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    // presets: ['@babel/preset-env'],
                    // plugins: ['@babel/transform-runtime']
                  }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            //相当于可以使用iframe ，具体用法查看html-loader
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
        ]
    }
};

function getEntry(globPath,type) {
    var entries = {},  tmp, pathname, newPath = [];
    glob.sync(globPath).map(function (v) {
        if (v.indexOf("components") == -1) {
            newPath.push(v);
        }
    });
    newPath.forEach(function (entry) {
        var entryCopy = entry.replace(path.extname(entry), ""),
            entryCopyArr = entryCopy.split('/');
        if(type=="html"){
            tmp = entryCopyArr.length == 4 ? entryCopyArr.splice(-1, 1) : entryCopyArr.splice(-3, 1).concat(entryCopyArr.splice(-1, 1));
        }else{
            tmp = entryCopyArr.length == 5 ? entryCopyArr.splice(-1, 1) : entryCopyArr.splice(-3, 1).concat(entryCopyArr.splice(-1, 1));
        }
        tmp = tmp.join("/");
        pathname = tmp;
        entries[pathname] = entry;
    });
    return entries;
}

var pages = getEntry('src/pages/**/*.html','html');
console.log(pages, "pages");
for (var pathname in pages) {
    console.log(pathname);
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块
        inject: true // js插入位置
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}