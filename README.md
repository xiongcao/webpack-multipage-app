# webpack-multipage-app
此项目是依照webpack4官方文档和一些cli手动配置的多页应用模板，虽然功能没有一些cli强大，但是可以满足正常开发需求。比较简陋，没有引用多余的插件、多余的包，从一定程度上节省了项目内存和提高了项目性能。

### 实现功能
1. 可使用sass预处理器和es6高效开发项目
2. 将css和js分离为单独文件，提取js和css公共代码
3. 对打包后的js和css文件进行了最大程度的压缩
4. 对html、js、css、图片和字体进行了多级目录打包

### 命令使用
1. build 打包项目
2. watch 监听代码更新并打包
3. dev、start 开发环境的代码热更新

### 在css或scss文件中@import .css文件报错：
##### 原因：
1. 因为sass/scss文件中引用了css文件，而sass-loader将这个css文件识别为一个模块
##### 解决办法：
1. 将路径写全，即不要使用配置文件中的路径别名，直接使用相对路径或者绝对路径
2. 将css文件改写为sass/scss文件，即不引用css转而将样式写在sass/scss文件中引入。

### webpack4弃用extract-text-webpack-plugin推荐使用mini-css-extract-plugin分离css问题：
1. mini-css-extract-plugin和style-loader无法共存。npm官方说明：This plugin should be used only on production builds without style-loader in the loaders chain, especially if you want to have HMR in development.
2. 由于mini-css-extract-plugin和style-loader无法共存，为保证在开发阶段实现css热替换，将使用style-loader不适用mini-css-extract-plugin，所以在开发阶段无法将css分离。
