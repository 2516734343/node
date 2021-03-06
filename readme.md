node笔记
=================

   * [node笔记](#node笔记)
   * [1、node概述](#1node概述)
      * [1.1 安装与更新](#11-安装与更新)
      * [1.2 版本管理工具nvm](#12-版本管理工具nvm)
      * [1.3 基本用法](#13-基本用法)
      * [1.4 REPL环境](#14-repl环境)
      * [1.5 异步操作](#15-异步操作)
   * [2. 全局对象和全局变量](#2-全局对象和全局变量)
   * [3.node模块化](#3node模块化)
      * [模块的查找](#模块的查找)
      * [module对象](#module对象)
      * [require函数](#require函数)
   * [node内置模块](#node内置模块)
      * [1. os](#1-os)
      * [2. path](#2-path)
      * [3. url](#3-url)
      * [4. util](#4-util)
   * [文件I/O](#文件io)


# 1、node概述

### 1.1 安装与更新
> https://nodejs.org/en/
### 1.2 版本管理工具nvm
> 如果想在同一台机器，同时安装多个版本的node.js，就需要用到版本管理工具nvm。
```javascript
$ git clone https://github.com/creationix/nvm.git ~/.nvm
$ source ~/.nvm/nvm.sh

# 安装最新版本
$ nvm install node

# 安装指定版本
$ nvm install 0.12.1

# 使用已安装的最新版本
$ nvm use node

# 使用指定版本的node
$ nvm use 0.12

# 查看本地安装的所有版本
$ nvm ls

# 查看服务器上所有可供安装的版本。
$ nvm ls-remote

# 退出已经激活的nvm，使用deactivate命令。
$ nvm deactivate
```
### 1.3 基本用法

当前目录的demo.js脚本文件，可以这样执行。
```javascript
$ node demo
# 或者
$ node demo.js
```
使用-e参数，可以执行代码字符串。
```javascript
$ node -e 'console.log("Hello World")'
Hello World
```
### 1.4 REPL环境
### 1.5 异步操作
> Node约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象。如果第一个参数传的是null代表前面的异步操作没有发生错误。另外，这样还可以层层传递错误。
```javascript

var callback = function (error, value) {
  if (error) {
    return console.log(error);
  }
  console.log(value);
}
```
```javascript
// db.User.get是一个异步操作
try {
  db.User.get(userId, function(err, user) {
    if(err) {
      throw err
    }
    // ...
  })
} catch(e) {
  console.log(‘Oh no!’);
}
```

# 2. 全局对象和全局变量
>Node提供以下几个全局对象，它们是所有模块都可以调用的。

* global：表示Node所在的全局环境，类似于浏览器的window对象。需要注意的是，如果在浏览器中声明一个全局变量，实际上是声明了一个全局对象的属性，比如var x = 1等同于设置window.x = 1，但是Node不是这样，至少在模块中不是这样（REPL环境的行为与浏览器一致）。在模块文件中，声明var x = 1，该变量不是global对象的属性，global.x等于undefined。这是因为模块的全局变量都是该模块私有的，其他模块无法取到。  

* process：该对象表示Node所处的当前进程，允许开发者与该进程互动。  

* console：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。  

>Node还提供一些全局函数。

* setTimeout()：用于在指定毫秒之后，运行回调函数。实际的调用间隔，还取决于系统因素。间隔的毫秒数在1毫秒到2,147,483,647毫秒（约24.8天）之间。如果超过这个范围，会被自动改为1毫秒。**该方法返回一个对象，而不像在浏览器中返回一个整数**。  
```javascript
Timeout {
  _idleTimeout: 1000,
  _idlePrev: [TimersList],
  _idleNext: [TimersList],
  _idleStart: 28,
  _onTimeout: [Function],
  _timerArgs: undefined,
  _repeat: null,
  _destroyed: false,
  [Symbol(refed)]: true,
  [Symbol(asyncId)]: 2,
  [Symbol(triggerId)]: 1
}

```
* clearTimeout()：用于终止一个setTimeout方法新建的定时器。  
* setInterval()：用于每隔一定毫秒调用回调函数。由于系统因素，可能无法保证每次调用之间正好间隔指定的毫秒数，但只会多于这个间隔，而不会少于它。指定的毫秒数必须是1到2,147,483,647（大约24.8天）之间的整数，如果超过这个范围，会被自动改为1毫秒。该方法返回一个整数，代表这个新建定时器的编号。  
* clearInterval()：终止一个用setInterval方法新建的定时器。  
* setImmediate(): 类似于setTimeout()  
* require()：用于加载模块。  
* Buffer()：用于操作二进制数据。  
* process
>Node提供两个全局变量，都以两个下划线开头。

* __filename：指向当前运行的脚本文件名。  
* __dirname：指向当前运行的脚本所在的目录。  
>除此之外，还有一些对象实际上是模块内部的局部变量，指向的对象根据模块不同而不同，但是所有模块都适用，可以看作是伪全局变量，主要为module, module.exports, exports等。

# 3.node模块化
### 模块的查找
* 绝对路径： 根据绝对路径直接加载模块
```javascript
const result1 = require('/Users/xxx/Desktop/my-node/node/node的模块化/myModule'); 
```
* 相对路径： ./ 或 ../ 相对于当前模块 转化为绝对路径 加载模块
```javascript
const result = require('../myModule'); // 2、相对路径
```
* 相对路径  
检查是否是内置模块，如fs，会优先输出内置模块。  
检查当前目录中的node_modules  
检查上级目录中的node_modules  
转换为绝对路径  
加载模块
```javascript
const result2 = require('fs');//相对路径，检查是否是内置模块
```
* 关于后缀名  
如果不提供后缀名，自动补全 js、json、node、mjs  
* 关于文件名
> 如果只提供目录，不提供文件名，则自动寻找改目录下的index.js  
>有时候，一个模块本身就是一个目录，目录中包含多个文件。这时候，Node在package.json文件中，寻找main属性所指明的模块入口文件。  
>main字段表示包的默认入口，导入或执行包时若仅提供目录，则使用main补全入口，默认值为index.js
### module对象
> 记录当前模块的信息
```javascript
Module {
  id: '.',
  path: '/Users/xxx/Desktop/my-node/node/node的模块化',
  exports: { c: 3, a: 1, b: 2, m: 5 },
  parent: null,
  filename: '/Users/xxx/Desktop/my-node/node/node的模块化/myModule.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/xxx/Desktop/my-node/node/node的模块化/node_modules',
    '/Users/xxx/Desktop/my-node/node/node_modules',
    '/Users/xxx/Desktop/my-node/node_modules',
    '/Users/xxx/Desktop/node_modules',
    '/Users/xxx/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}

```

>node模块中的this指向exports
```javascript
console.log(this === exports); // true
  console.log(this === module.exports); // true
```
### require函数
当执行一个模块或使用require时，会将模块放置在一个函数环境中
# 4、node内置模块
### 1. os
```javascript
const os = require('os');
console.log(os.homedir()); // 当前用户的主目录
console.log(os.tmpdir()); // 默认的临时文件路径
console.log(os.cpus()); //每个逻辑的cpu信息
console.log(os.arch()); // 操作系统的cpu架构
console.log(os.freemem()); // 返回空闲的系统内存量,以字节为单位
console.log(os.hostname()); // 返回操作系统的主机名

```
### 2. path
```javascript
const path = require('path');
console.log(path.basename('/Users/jingmeimei/Desktop/my-node/node/node的模块化/myModule.js'));// 返回 path 的最后一部分
console.log('/my-node/node/node的模块化/myModule.js'.split(path.sep));// 提供平台特定的路径片段分隔符
console.log(process.env.PATH);
console.log(process.env.PATH.split(path.delimiter)); // 提供平台特定的路径定界符
console.log(path.dirname('my-node/node/node的模块化/myModule.js')); // 返回path的目录名
console.log(path.extname('my-node/node/node的模块化/myModule.js'));// 返回path的最后一部分
console.log(path.join('/a', 'b' , 'node', '..'));// 所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。
console.log(path.normalize('src/node/\\module/..')); // 规范化给定的 path，解析 '..' 和 '.' 片段。
console.log(path.relative('src/node/a/b', 'src/node/test/c')); // path.relative() 方法根据当前工作目录返回 from 到 to 的相对路径。
console.log(path.resolve('src','node','./test/a','../b')); // 将路径或路径片段的序列解析为绝对路径。
```
### 3. url
```javascript
const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(myURL);

URL {
  href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.host.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.host.com:8080',
  hostname: 'sub.host.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}

```
### 4. util
* util.callbackify  
>将 async 异步函数（或者一个返回值为 Promise 的函数）转换成遵循异常优先的回调风格的函数，例如将 (err, value) => ... 回调作为最后一个参数。 在回调函数中，第一个参数为拒绝的原因（如果 Promise 解决，则为 null），第二个参数则是解决的值。  
>回调函数是异步执行的，并且有异常堆栈错误追踪。 如果回调函数抛出一个异常，进程会触发一个 'uncaughtException' 异常，如果没有被捕获，进程将会退出。  
>null 在回调函数中作为一个参数有其特殊的意义，如果回调函数的首个参数为 Promise 拒绝的原因且带有返回值，且值可以转换成布尔值 false，这个值会被封装在 Error 对象里，可以通过属性 reason 获取。
```javascript
async function test() {
        console.log('hello world');
}

const callbackFunction = util.callbackify(test);
callbackFunction((err,val) => {
        if(err) throw err;
        console.log(val);
});
// hello wolrd

function test() {
        return Promise.reject(null);
}
const callbackFunction = util.callbackify(test);
callbackFunction((err,val) => {
        console.log(err);
        console.log(err && err.hasOwnProperty('reason') && err.reason === null);
});

// 结果

Error [ERR_FALSY_VALUE_REJECTION]: Promise was rejected with falsy value
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  reason: null,
  code: 'ERR_FALSY_VALUE_REJECTION'
}
true

```
* util.inherits  
> util.inherits(constructor, superConstructor)
* util.isDeepStrictEqual  
> 是否严格相等。
* util.promisify  
> 传入一个遵循常见的错误优先的回调风格的函数（即以 (err, value) => ... 回调作为最后一个参数），并返回一个返回 promise 的版本。
# 5、文件I/O
> Sync函数是同步的，会导致JS运行阻塞，极其影响性能，通常，在程序启动时运行有限的次数即可。
* fs.readFile
> path <string>  <Buffer> | <URL> | <integer> 文件名或文件描述符。  
> options <Object> | <string>  
>> encoding <string> | <null> 默认值: null。  
>>flag <string> 参见文件系统 flag 的支持。 默认值: 'r'。  
返回: <string> | <Buffer> 
返回 path 的内容。 

```javascript
const fs = require('fs');
const path = require('path');
const fileName = path.resolve(__dirname, './file/1.txt');
// 异步读取
fs.readFile(fileName, {encoding: 'utf-8', flag: 'r'}, (err, data) => {
    if(err) throw err;
    console.log(data);
});
```
* fs.readFileSync  
```javascript
// 同步读取
const result = fs.readFileSync(fileName, 'utf-8');
console.log(result);
```
* fs.writeFile  
```javascript
const fs = require('fs');
const path = require('path');
const fileName = path.resolve(__dirname, './file/3.js');
const data = "console.log('test2')";
// 如果没有文件，则会创建一个文件
// 异步
fs.writeFile(fileName, data, (err) => {
    if(err) throw err;
    console.log('文件已经被保存');
});
```
* fs.writeFileSync  
```javascript

// 同步
fs.writeFileSync(fileName, data);
```
* fs.stat  
> 返回文件的信息
```javascript
const fs = require('fs');
const path = require('path');
const fileName = path.resolve(__dirname, './file/1.txt');
async function test() {
    const result = await fs.promises.stat(fileName);
    console.log(result);
    console.log('是否是目录', result.isDirectory());
    console.log('是否是文件', result.isFile());
}
test();

```
* fs.mkdir  
> 创建一个新目录
```javascript
const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './file/test');
async function test() {
    await fs.promises.mkdir(dirname);
    console.log('创建成功');
}
test();

```
* fs.readdir  
```javascript
const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './file');
async function test() {
    const result = await fs.promises.readdir(dirname);
    console.log(result); // 返回目录中文件的名称的数组
}
test();
```
* fs.exists  
```javascript
const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './file/test2');
async function exists(filename) {
    try {
        await fs.promises.stat(filename);
        return true;
    } catch (e) {
        if (e.code === 'ENOENT') { // 文件不存在
            return false;
        }
        throw e;
    }
}

async function test() {
    const result = await exists(dirname);
    if (result) {
        console.log('目录已存在');
    } else {
        await fs.promises.mkdir(dirname);
        console.log('创建成功');
    }
}

test();

```s
* fs.copyFile  
```javascript
const fs = require('fs');
const path = require('path');
const fileName1 = path.resolve(__dirname, './file/1.txt');
const fileName2 = path.resolve(__dirname, './file/4.txt');
// 不存在目标文件的时候会创建一个
fs.copyFile(fileName1, fileName2,(err) => {
    if(err) throw err;
    console.log('复制成功');
});

```
# 6、文件流