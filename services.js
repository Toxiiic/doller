/**
 * 来源：services目录下的所有js
 * 命名要求：svc-<bareName>.js
 * 调用方式：services.<bareName>Svc
*/
const fs = require('fs');

//读取目录下所有文件名，得到数组
let allFileNames = fs.readdirSync(__dirname + '/services');
//过滤后缀，只要js
let jsFileNames = allFileNames.filter((fName)=>{
    return fName.endsWith('.js');
});

//循环把所有文件都require，并放入导出对象
let bareName;
for(let fileName of jsFileNames) {
    //去掉后缀后的文件名
    bareName = fileName.substring(4, fileName.length - 3);
    module.exports[bareName+'Svc'] = require(`${__dirname}/services/svc-${bareName}`);
}


// const fs = require('fs');
// const db = require('./db');

// let files = fs.readdirSync(__dirname + '/models');

// let js_files = files.filter((f)=>{
//     return f.endsWith('.js');
// }, files);

// module.exports = {};

// for (let f of js_files) {
//     console.log(`import model from file ${f}...`);
//     let name = f.substring(0, f.length - 3);
//     module.exports[name] = require(__dirname + '/models/' + f);
// }

// module.exports.sync = () => {
//     db.sync();
// };