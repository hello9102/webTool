
/**
 * generator 生成器函数 -> * 函数名
 * iterator 迭代器对象
 * yield 产出一个值
 */

// function * generator () {
//   // 按指针一步一步执行
//   yield '姓名：小野';
//   yield '年龄：34';
//   yield '爱好：旅游';
//   return '我爱JavaScript';
// }

// 生成器编译结果
// function generator$ (ctx) {
//   while (true) {
//     switch (ctx.prev = ctx.next) {
//       case 0:
//         ctx.next = 1;
//         return '姓名：小野';
//       case 1:
//         ctx.next = 2;
//         return '年龄：34';
//       case 2:
//         ctx.next = 3;
//         return '爱好：旅游';
//       case 3:
//         ctx.finish();
//         return '我爱JavaScript';
//     }
//   }
// }

// const generator = function () {
//   const ctx = {
//     prev: 0,
//     next: 0,
//     done: false,
//     finish () {
//       this.done = true;
//     }
//   }

//   return {
//     next() {
//       return {
//         value: generator$(ctx),
//         done: ctx.done
//       }
//     }
//   }
// }

// 生成器函数实现
// function generator (arr) {
//   let nextIdx = 0;

//   return {
//     next: function () {
//       return nextIdx < arr.length - 1
//              ?
//              { value: arr[nextIdx ++], done: false }
//              :
//              { value: arr[nextIdx ++] || undefined, done: true }
//     }
//   }
// }

module.exports = generator;

