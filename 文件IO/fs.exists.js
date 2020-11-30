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
