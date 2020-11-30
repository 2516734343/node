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
