const path = require('path');
const glob = require('glob'); //这里的glob是nodejs的glob模块，是用来读取webpack入口目录文件的

let utils = {};
utils.getEntry = function (globPath, type) {
    let entries = {},
        tmp, pathname, newPath = [];
    glob.sync(globPath).map(function (v) {
        if (v.indexOf("components") == -1) {
            newPath.push(v);
        }
    });
    newPath.forEach(function (entry) {
        let entryCopy = entry.replace(path.extname(entry), ""),
            entryCopyArr = entryCopy.split('/');
        if (type == "html") {
            tmp = entryCopyArr.length == 4 ? entryCopyArr.splice(-1, 1) : entryCopyArr.splice(-3, 1).concat(entryCopyArr.splice(-1, 1));
        } else {
            tmp = entryCopyArr.length == 5 ? entryCopyArr.splice(-1, 1) : entryCopyArr.splice(-3, 1).concat(entryCopyArr.splice(-1, 1));
        }
        tmp = tmp.join("/");
        pathname = tmp;
        entries[pathname] = entry;
    });
    return entries;
}

module.exports = utils