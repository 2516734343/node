// 读取一个目录中的所有子目录和文件
const fs = require('fs');
const path = require('path');

class File {
    constructor(filename, name,ext,isFile, size, createTime, updateTime) {
        this.filename = filename;
            this.name = name;
            this.ext = ext;
            this.isFile = isFile;
            this.size = size;
            this.createTime = createTime;
            this.updateTime = updateTime;
    }
    // 获得文件
    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime);
        return new File(filename, name,ext,isFile,size,createTime,updateTime);
    }
    // 获得目录下的子文件
    async getChildren() {
        if(this.isFile) {
            return [];
        }
        let children = await fs.promises.readdir(this.filename);
        children = children.map(item => {
            const result = path.resolve(this.filename, item);
            return File.getFile(result);
        });
        return Promise.all(children);
    }
    // 获得文件内容
    async getContent(isBuffer = false) {
        if(this.isFile) {
            if(isBuffer) {
                return await fs.promises.readFile(this.filename);
            } else {
                return await fs.promises.readFile(this.filename, 'utf-8');
            }
        }
        return null;
    }
}
// 读取目录下的子文件
async function readDir(dirname) {
    const file = await File.getFile(dirname);
    return await file.getChildren();
}

async function test() {
    const dirname = path.resolve(__dirname, './file');
    console.log(dirname);
    const result = await readDir(dirname);
    console.log(result);
    const datas = await result[0].getContent(isBuffer = false);
    console.log(datas);
}
test();
