const MyPromise = require("./MyPromise");

let promise = new MyPromise((resolve, reject) => {
  resolve("success");
  // reject("error");
  // throw new Error("Exception:Error");

  // setTimeout(() => {
  //   resolve("success");
  // }, 2000);
});

promise.then(
  (value) => {
    console.log("FulFulled1: " + value);
  },
  (reason) => {
    console.log("Rejected1: " + reason);
  }
);

promise.then(
  (value) => {
    console.log("FulFulled2: " + value);
  },
  (reason) => {
    console.log("Rejected2: " + reason);
  }
);
