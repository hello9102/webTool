let promise = new Promise((resolve, reject) => {
  resolve("First resolve");
});

// 通过return传递结果
// promise
//   .then((value) => {
//     return value; // 普通值
//   })
//   .then((value) => {
//     console.log(value); // First resolve
//   });

// 通过新的promise resolve结果
// promise
//   .then((value) => {
//     return value; // 普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(value);
//       }, 2000);
//     });
//   })
//   .then((value) => {
//     console.log(value); // First resolve
//   });

// 通过新的promise reject原因
// promise
//   .then((value) => {
//     return value; // 普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject("ERROR");
//       }, 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log(value);
//     },
//     (reason) => {
//       console.log("Rejected: " + reason); // Rejected: ERROR
//     }
//   );

// then走了失败的回调函数后，再走then
// promise
//   .then((value) => {
//     return value; // 普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject("ERROR");
//       }, 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log(value);
//     },
//     (reason) => {
//       console.log("Rejected: " + reason); // Rejected: ERROR
//       // 默认 return undefined
//     }
//   )
//   .then(
//     (value) => {
//       console.log(value); // undefined
//       console.log("Fulfilled: " + value); // Fulfilled: undefined
//     },
//     (reason) => {
//       console.log("Rejected: " + reason);
//     }
//   );

// then中使用 throw new Error
// promise
//   .then((value) => {
//     return value; // 普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject("ERROR");
//       }, 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log(value);
//     },
//     (reason) => {
//       console.log("Rejected: " + reason); // Rejected: ERROR
//       // 默认 return undefined
//     }
//   )
//   .then((value) => {
//     throw new Error("Throw Error");
//   })
//   .then(
//     (value) => {
//       console.log(value);
//     },
//     (reason) => {
//       console.log("Exeption: " + reason); // Exeption: Error: Throw Error
//     }
//   );

// cathch捕获异常
promise
  .then((value) => {
    return value; // 普通值
  })
  .then((value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("ERROR");
      }, 2000);
    });
  })
  .then(
    (value) => {
      console.log(value);
    },
    (reason) => {
      console.log("Rejected: " + reason); // Rejected: ERROR
      // 默认 return undefined
    }
  )
  .then((value) => {
    throw new Error("Throw Error");
  })
  .then(
    (value) => {
      console.log(value);
    }
    // (reason) => {
    //   console.log("Then " + reason);// then捕获错误的话走不到catch
    // }
  )
  .catch((err) => {
    console.log("Catch: " + err); // Catch: Error: Throw Error
    return "Catch Error";
  })
  .then((value) => {
    console.log("Then: " + value); // Then: Catch Error
  });

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
