const { getUserClasses, co } = require("./generator2");

// 通过生成器函数生成迭代器函数
// const iterator = generator(
//   [
//     '姓名：小野',
//     '年龄：34',
//     '爱好：旅游',
//     '我爱JavaScript'
//   ]
// );

// // 迭代器函数有一个next方法，没执行一次产出一个对象
// /**
//  * { value: 每次yield出的value，done: yield是否被迭代完成 bool }
//  */
// let res;
// res = iterator.next();
// console.log(res); // { value: '姓名：小野', done: false }
// res = iterator.next();
// console.log(res); // { value: '年龄：34', done: false }
// res = iterator.next();
// console.log(res); // { value: '爱好：旅游', done: false }
// res = iterator.next();
// console.log(res); // { value: '我爱JavaScript', done: true }

const uid = 1;

// const it = getUserClasses(uid);
// const { value, done } = it.next();

// value.then((res) => {
//   const { value, done } = it.next(res);
//   value.then((res) => {
//     const { value, done } = it.next(res);
//     console.log(value);
//   })
// })

// co(getUserClasses(uid)).then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// })

// async await
getUserClasses(uid)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
