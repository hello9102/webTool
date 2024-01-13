const fs = require("fs").promises;

// function* getUserClasses(uid) {
//   // 返回一个promise
//   let userDatas = yield fs.readFile("./data/user.json", "utf8");
//   userDatas = JSON.parse(userDatas);
//   const userData = userDatas.find((user) => user.id === uid);
//   let classDatas = yield fs.readFile("./data/class.json", "utf8");
//   classDatas = JSON.parse(classDatas);

//   let userClassData = {
//     id: userData.id,
//     name: userData.name,
//     classes: [],
//   };

//   classDatas.map((c) => {
//     const studentsArr = JSON.parse(c.students);
//     studentsArr.map((s) => {
//       if (s === uid) {
//         userClassData.classes.push({
//           id: c.id,
//           name: c.name,
//         });
//       }
//     });
//   });

//   return userClassData;
// }

// 异步迭代函数

// async await
async function getUserClasses(uid) {
  // 返回一个promise
  let userDatas = await fs.readFile("./data/user.json", "utf8");
  userDatas = JSON.parse(userDatas);
  const userData = userDatas.find((user) => user.id === uid);
  let classDatas = await fs.readFile("./data/class.json", "utf8");
  classDatas = JSON.parse(classDatas);

  let userClassData = {
    id: userData.id,
    name: userData.name,
    classes: [],
  };

  classDatas.map((c) => {
    const studentsArr = JSON.parse(c.students);
    studentsArr.map((s) => {
      if (s === uid) {
        userClassData.classes.push({
          id: c.id,
          name: c.name,
        });
      }
    });
  });

  return userClassData;
}

function co(iterator) {
  // 最终肯定是要返回一个Promise 在每次迭代的时候
  return new Promise((resolve, reject) => {
    // 迭代器递归函数 参数 传给next的数据
    function walk(data) {
      // 执行next -> value done对象
      const { value, done } = iterator.next(data);

      // 如果 done === false
      if (!done) {
        // value -> then -> 拿到新的迭代时 程序执行的结果
        Promise.resolve(value).then((res) => {
          // 肯定要继续执行迭代器递归函数
          walk(res);
          // promise出错了 -> 本次返回的Promise的reject
        }, reject);
      } else {
        // done === true 迭代结束 成功抛出value
        resolve(value);
      }
    }
    walk();
  });
}

// generator + co异步迭代函数 === async函数 + await
// generator + yield + co === async +await => 语法糖

module.exports = {
  getUserClasses,
  co,
};
