function Promise(task) {
  let that = this;
  // 默认状态为pending
  that.status = 'pending';

  that.value = undefined;

  that.onResolvedCallbacks = [];

  that.onRejectedCallbacks = [];

  function resolve(value) {
    if (that.status === 'pending') {
      that.status = 'fulfilled';
      that.value = value;
      that.onResolvedCallbacks.forEach(item => item(value));
    }
  }

  function reject(reason) {
    if (that.status === 'pending') {
      that.status = 'rejected';
      that.value = reason;
      that.onRejectedCallbacks.forEach(item => item(reason));
    }
  }

  try {
    task(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function(onFullfiled, onReject) {
  let that = this;
  if (that.status === 'fulfilled') {
    onFullfiled(that.value);
  }

  if (that.status === 'rejected') {
    onReject(that.value);
  }

  if (that.status === 'pending') {
    that.onResolvedCallbacks.push(onFullfiled);
    that.onRejectedCallbacks.push(onReject);
  }
};

module.exports = Promise;
