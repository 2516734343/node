const fs = require('fs');
const path = require('path');
const fileName = path.resolve(__dirname, './file/1.txt');

// 异步读取
fs.readFile(fileName, {encoding: 'utf-8', flag: 'r'}, (err, data) => {
    if(err) throw err;
    console.log(data);
});


// 同步读取
const result = fs.readFileSync(fileName, 'utf-8');
console.log(result);
