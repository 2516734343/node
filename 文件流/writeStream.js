const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, './file/1.txt');
const ws = fs.createWriteStream(filename, {
    encoding: 'utf-8',
    highWaterMark: 1 * 1024,
});


// let flag = ws.write('a'); // 返回一个布尔值，表示写入通道是否被填满
// console.log(flag);


// let i=1;
// function write() { // 一只写，直到通道被填满了，
//     let flag = true;
//     while(i < 1024 * 1024 * 2 && flag) {
//         flag = ws.write('a');
//         i++;
//     }
// }
// write();
// ws.on('drain', () => {
//     write();
// });


// 文件复制
// 方法一

async function method1() {
    const from = path.resolve(__dirname, './file/a.txt');
    const to = path.resolve(__dirname, './file/b.txt');
    console.time('方法一');
    content  = await fs.promises.readFile(from);
    await fs.promises.writeFile(to,content);
    console.timeEnd('方法一');
    console.log('复制完成');
}
// method1();

// 方法二

async function method2() {
    const from = path.resolve(__dirname, './file/a.txt');
    const to = path.resolve(__dirname, './file/b.txt');
    console.time('方式二');
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);

    // rs.on('data', chunk => {
    //     const flag = ws.write(chunk);
    //     if(!flag) { // 表示下一次写入，会造成背压。
    //         rs.pause(); // 停止读入
    //     }
    // })
    // ws.on('drain', () => {
    //     // 可以继续写了
    //     rs.resume(); // 恢复读入
    // })
    // rs.on('close',() => {
    //     ws.end();
    //     console.timeEnd('方式二');
    //     console.log('复制完毕');
    // })

    rs.pipe(ws);
}
method2();
