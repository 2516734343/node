node笔记
=================

   * [1、node概述](#1node概述) 
     * [1.1 安装与更新](#11-安装与更新)
     * [1.2 版本管理工具nvm](#12-版本管理工具nvm)
     * [1.3 基本用法](#13-基本用法)
     * [1.4 REPL环境](#14-repl环境)
     * [1.5 异步操作](#15-异步操作)
     * [1.6 全局对象和全局变量](#16-全局对象和全局变量)


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

### 1.6 全局对象和全局变量
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

