const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
  console.log(x);
}

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolveCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 发布
        this.onResolveCallbacks.forEach((fn) => fn());
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 发布
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  // x 普通值  promise
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        // 订阅
        this.onResolveCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });

    return promise2;
  }
}

module.exports = Promise;