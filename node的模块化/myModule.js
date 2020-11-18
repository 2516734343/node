// console.log(__dirname);
console.log('mymodule');
console.log("当前模块路径", __dirname);
console.log("当前模块的文件",__filename);
exports.c = 3;
// module.exports = {
//     a: 1,
//     b: 2,
// };
module.exports.a = 1;
module.exports.b = 2;
this.m = 5;
// console.log(this); // 在node模块中this指向exports
// console.log(module.exports);
console.log(this === exports);
console.log(this === module.exports);
