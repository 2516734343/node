const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, './file/1.txt');
const rs = fs.createReadStream(filename, {
    encoding: 'utf-8',
    highWaterMark: 1,
    autoClose: true,
});
rs.on('open', () => {
    console.log('文件被打开了');
});
rs.on('error',() => {
    console.log('出错了');
});
rs.on('data', chunk => {
    console.log('读到一部分数据', chunk);
    rs.pause();
});
rs.on('close',() => {
    console.log('文件关闭了');
});

rs.on('pause',() => {
    console.log('暂停了');
    setTimeout(() => {
        rs.resume();
    }, 1000)
});

rs.on('resume', () => {
    console.log('恢复了');
});
rs.on('end', () => {
    console.log('数据读完了');
})
