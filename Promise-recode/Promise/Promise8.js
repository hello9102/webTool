const PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
  }

  let called = false;

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then; // throw error

      if (typeof then === 'function') { // Promise
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolveCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
        return;
      }

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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let promise2 = new MyPromise((resolve, reject) => {
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
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch (errorCallback) {
    return this.then(null, errorCallback);
  }
  
  static resolve (value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject (error) {
    return new MyPromise((resolve, reject) => {
      reject(error);
    })
  }

  static all (promiseArr) {
    let resArr = [],
        idx = 0;

    return new MyPromise((resolve, reject) => {
      promiseArr.map((promise, index) => {
        if (isPromise(promise)) {
          promise.then((res) => {
            formatResArr(res, index, resolve);
          }, reject);
        } else {
          formatResArr(promise, index, resolve);
        }
      });
    });

    function formatResArr (value, index, resolve) {
      resArr[index] = value;
      if (++ idx === promiseArr.length) {
        resolve(resArr);
      }
    }

    function isPromise (x) {
      if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let then = x.then;

        return typeof then === 'function';
      }

      return false;
    }
  }
}

MyPromise.defer = MyPromise.deferred = function () {
  let deferred = {};

  deferred.promise = new MyPromise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}

module.exports = MyPromise;