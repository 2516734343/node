// 模块的查找
const result1 = require('/Users/jingmeimei/Desktop/my-node/node/node的模块化/myModule'); // 1.绝对路径
const result = require('../myModule'); // 2、相对路径
console.log(result);
const result2 = require('fs');//相对路径，检查是否是内置模块
// console.log(result2);
