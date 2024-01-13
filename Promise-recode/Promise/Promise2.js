const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

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

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }

    if (this.status === PENDING) {
      // 订阅
      this.onResolveCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = Promise;