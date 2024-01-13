/**
 * ES Module   import export
 * 
 * CommonJS    require    module.exports
 * 
 * 
 * 
 */

// function test (a, b, cb) {
//   const res = a + b;
//   cb && cb(res);
// }

// test(1, 2, function (res) {
//   console.log(res + 3);
// })

// readFile   readFileSync   Async

/**
 * Node API 
 * 
 * readFile(path, cb);
 * 
 */

// console.log(1);
// var res = a + b;

// console.log(2);

// function test () {
//     return res + 1;
// }

// readFile('./demo.json', function (res) {
//     console.log(res);
// });

// var newRes = test();
// console.log(newRes);

// poll phase

/**
 * 同步：按照顺序往下执行
 * 异步：和顺序无关，和是否执行完和是否得到结果无关的执行
 */

// console.log(1);

// new Promise(resolve => {
//     console.log(2);
//     resolve('');
// }).then(() => {
//     console.log(3);
// });

// console.log(4);

/**
 * 给我读文件1
 */

const { readFileSync, readFile } = require('fs');

// console.log(readFileSync('1.txt', 'utf-8'));
// console.log('1.txt');

// /**
//  * 给我读文件2
//  */

// console.log(readFileSync('2.txt', 'utf-8'));
// console.log('2.txt');

// readFile('1.txt', 'utf-8', function (err, data) {
//     console.log(data);
// });

// console.log('1.txt');

// readFile ('2.txt', 'utf-8', function (err, data) {
//     console.log(data);
// });

// console.log('2.txt');

// I/O
// function test1 (cb) {
//   // ......
//   cb && cb();
// }

// function test2 (cb) {
//   // ......
//   cb && cb();
// }

// function test3 (cb) {
//   // ......
//   cb && cb();
// }

// test1, test2, test3 各个线程 -> node主线程 -> cb (同步执行)

// test2 执行完毕 -> node主线程 -> cb        
     //       test1 执行完毕 -> node主线程 -> cb
	     // test3 -> node主线程 -> cb

		 // test2 cb -> test3 cb -> test1 cb  同步

  // test4 -> 线程 -> node主线程 -> test4 cb

  // readFile  writeFile

  // readFile('1.txt', 'utf-8', function (err, data) {
  //   console.log(data);
  // })

// promise.then1
// Promise.resolve().then(() => {
//   console.log(1);
// });

// // nextTick1
// process.nextTick(() => {
//   console.log(2);
// });

// console.log('start');

// // readFile1
// readFile('1.txt', 'utf-8', () => {
  
//   // setTimeout2
//   setTimeout(() => {
//     console.log(3);
//   }, 0);
  
//   // nextTick2
//   process.nextTick(() => {
//     console.log(4);
//   });
  
//   // setImmediate2
//   setImmediate(() => {
//     console.log(5);
//   });

//   console.log(6);
// });

// console.log(7);

// // setTimeout1
// setTimeout(() => {
//   console.log(8);
// }, 0);

// // setImmediate1
// setImmediate(() => {
//   console.log(9);
// });

// console.log('end');

/**
 * start
 * 7
 * end
 * 2
 * 1
 * 9
 * 8
 * 6
 * 4
 * 5
 * 3
 */

/**
 * 微任务
 * nextTick1 x
 * nextTick2 x
 * promise.then1 x
 * nextTick3 x
 * nextTick4 x
 * 
 * timers
 * setTimeout1 x -> cb x
 * setTimeout2 x -> cb x
 * setTimeout3 x -> cb x
 * setTimeout4 x -> cb x
 * 
 * poll
 * readFile1 -> cb x
 * readFile2 -> cb x
 * 
 * checks
 * setImmediate1 x
 * setImmediate2 x
 * setImmediate3 x
 * 
 *  start end 1 2 3 4 5 6 7 10 9 12 8 11
 * 
 */

// nextTick1
// process.nextTick(() => {
//   console.log(1);
// });

// console.log('start');

// // setTimeout1
// setTimeout(() => {
//   console.log(2);
// }, 0);

// // setTimeout2
// setTimeout(() => {
//   console.log(3);
// }, 0);

// // setImmediate1
// setImmediate(() => {
//   console.log(4);
  
//   // nextTick2
//   process.nextTick(() => {
//     console.log(5);
    
//     // promise.then1
//     Promise.resolve().then(() => {
//       console.log(6)
//     });
//   });
// });

// // readFile1
// readFile('1.txt', 'utf-8', () => {
//   // nextTick3
//   process.nextTick(() => {
//     console.log(7);
//   });
//   // setTimeout3
//   setTimeout(() => {
//     console.log(8);
//   }, 0);
  
//   // setImmediate2
//   setImmediate(() => {
//     console.log(9);
//   });
// });

// // readFile2
// readFile('2.txt', 'utf-8', () => {
  
//   // nextTick4
//   process.nextTick(() => {
//     console.log(10);
//   });
  
//   // setTimeout4
//   setTimeout(() => {
//     console.log(11);
//   }, 0);
  
//   // setImmediate3
//   setImmediate(() => {
//     console.log(12);
//   });
// });

// console.log('end');


function plus (a, b, cb) { // -> 线程池 -> +线程
  const res = a + b; 
  cb(res);
}

function minus (a, b, cb) { // -> 线程池 -> -线程
  const res = a - b;
  cb(res);
}

function mul (a, b, cb) {  // -> 线程池 -> * 线程
  const res = a * b;
  cb(res);
}

function div (a, b, cb) {  // -> 线程池 -> / 线程
  const res = a / b;
  cb(res);
}

// 多线程异步执行

plus(1, 2, function (res) {
  console.log(res);
});
console.log(1);
minus(2, 1, function (res) {
  console.log(res);
})
console.log(2);
mul(2, 3, function (res) {
  console.log(res);
})
console.log(3);
div(3, 2, function (res) {
  console.log(res);
})
console.log(4);

// plus minus mul div -> 线程 -> 完成了运行 -> res
/**
 * 主线程 -> 代码 -> plus -> 事件队列 -> （线程）事件环
 *              -> console.log(1)
 *              -> minus -> 事件队列 -> 事件环
 *              -> console.log(2)                     ---> 通知主线程  div, minus, plus, mul -> 执行回调
 *              -> mul -> 事件队列 -> 事件环          
 *              -> console.log(3);
 *              -> div -> 事件队列 -> 事件环
 *              -> console.log(4);
 *             
 * 
 *              -> 主线程 空闲 JavaScript 单线程 
 *              -> 回调队列执行 （同步）
 *                 div cb
 *                 minus cb
 *                 plus cb
 *                 mul cb
 *              
 *         
 * 
 * 
 */