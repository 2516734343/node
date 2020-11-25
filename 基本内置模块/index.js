// os模块
// const os = require('os');
// console.log(os.homedir()); // 当前用户的主目录
// console.log(os.tmpdir()); // 默认的临时文件路径
// console.log(os.cpus()); //每个逻辑的cpu信息
// console.log(os.arch()); // 操作系统的cpu架构
// console.log(os.freemem()); // 返回空闲的系统内存量,以字节为单位
// console.log(os.hostname()); // 返回操作系统的主机名
// path模块
// const path = require('path');
// console.log(path.basename('/Users/jingmeimei/Desktop/my-node/node/node的模块化/myModule.js'));// 返回 path 的最后一部分
// console.log('/my-node/node/node的模块化/myModule.js'.split(path.sep));// 提供平台特定的路径片段分隔符
// console.log(process.env.PATH);
// console.log(process.env.PATH.split(path.delimiter)); // 提供平台特定的路径定界符
// console.log(path.dirname('my-node/node/node的模块化/myModule.js')); // 返回path的目录名
// console.log(path.extname('my-node/node/node的模块化/myModule.js'));// 返回path的最后一部分
// console.log(path.join('/a', 'b' , 'node', '..'));// 所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。
// console.log(path.normalize('src/node/\\module/..')); // 规范化给定的 path，解析 '..' 和 '.' 片段。
// console.log(path.relative('src/node/a/b', 'src/node/test/c')); // path.relative() 方法根据当前工作目录返回 from 到 to 的相对路径。
// console.log(path.resolve('src','node','./test/a','../b')); // 将路径或路径片段的序列解析为绝对路径。

// url
// const url = require('url');
// const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// console.log(myURL);

// util
const util = require('util');

// async function test() {
//         console.log('hello world');
// }
//
// const callbackFunction = util.callbackify(test);
// callbackFunction((err,val) => {
//         if(err) throw err;
//         console.log(val);
// });
//
// function test() {
//         return Promise.reject(null);
// }
// const callbackFunction = util.callbackify(test);
// callbackFunction((err,val) => {
//         console.log(err);
//         console.log(err && err.hasOwnProperty('reason') && err.reason === null);
// });

// 不建议使用inherits
// class Animal {
//     constructor(type,name) {
//         this.type = type;
//         this.name = name;
//     }
//     run() {
//         console.log(`${this.name} + 'wangwangwang'`);
//     }
// }
// class Dog {
//     constructor(age) {
//         this.age = age;
//     }
//     speak() {
//         console.log('dog' + this.age);
//     }
//
// }
// util.inherits(Dog, Animal);
// let dog = new Dog('dog','大黄', 1);
// console.log(dog.type,dog.name,dog.speak(),dog.run());
var obj1 = {
    name: 'xlj'
};
var obj2 = {
    name: 'rjm'
}
console.log(util.isDeepStrictEqual(obj1,obj2)); // false

// util.promisify
function fn () {
    console.log('hello world');
}
async function test(fn) {
    fn();
}

const callfn = util.promisify(test);
callfn.then((err,val) => {
    if(err) throw err;
    console.log(val);
})
