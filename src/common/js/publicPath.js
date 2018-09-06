import 'babel-polyfill';//解决IE中乱七八糟的问题,但是会增大打包的文件体积,可配置useBuiltIns来相对减少体积

var basePath = location.protocol + '//' + location.host;
var ossBasePath = '//oss.test.com/';

// var requestApi = 'http://192.168.0.21/api/';
// var requestOssApi = 'http://192.168.0.21/zuul/api/';
// var requestWs = 'http://192.168.0.21/';

var requestApi = 'https://www.test.com/api/';
var requestOssApi = 'https://www.test.com/zuul/api/';
var requestWs = 'https://www.test.com/';

export default {
    basePath: basePath,
    ossBasePath: ossBasePath,
    requestApi: requestApi,
    requestOssApi: requestOssApi,
    requestWs: requestWs
}