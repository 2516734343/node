const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './file');
async function test() {
    const result = await fs.promises.readdir(dirname);
    console.log(result); // 返回目录中文件的名称的数组
}
test();
