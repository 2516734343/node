const fs = require('fs');
const path = require('path');
const fileName1 = path.resolve(__dirname, './file/1.txt');
const fileName2 = path.resolve(__dirname, './file/4.txt');
// 不存在目标文件的时候会创建一个
fs.copyFile(fileName1, fileName2,(err) => {
    if(err) throw err;
    console.log('复制成功');
});
