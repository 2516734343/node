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


// 同步
fs.writeFileSync(fileName, data);
