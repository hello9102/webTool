// const fs = require('fs');
// const fs = require('fs').promises;
const fs = require("fs");
const bluebird = require("bluebird");

// fs.readFile('./data/user.json', 'utf8', function (err, data) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(data);
// })

// fs.readFile('./data/user.json', 'utf8').then((res) => {
//   console.log(res);
// }, (err) => {
//   console.log(err);
// })

const readFile = bluebird.promisify(fs.readFile);

readFile("./data/user.json", "utf8").then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

// catch在Promise的源码层面上就是一个then，Catch也是遵循then的运行原则的

// 成功的条件
// then return 普通的JavaScript value
// then return 新的promise成功态的结果 value

// 失败的条件
// then return 新的promise失败的原因 reason
// then 抛出了异常 throw new Error

// promise 链式调用
// javascript jQuery return this
// then 不具备this
// return new Promise
