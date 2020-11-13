// 全局对象
// console.log(global);

const obj = {
    setTimeout: function () {},
    console:function () {},
};
obj.setTimeout();

const timer = setTimeout(function () {

},1000);
// console.log(timer);

const buffer = Buffer.from('abcdefg','utf-8');
console.log(buffer);
