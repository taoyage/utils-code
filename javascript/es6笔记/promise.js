const Promise = require('./original-promise');

let p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    let num = Math.random();
    if (num > 0.5) {
      resolve('成功');
    } else {
      reject('失败');
    }
  }, 2000);
});

let p1 = p.then(
  function(data) {
    console.log('data', data);
    return data + 100;
  },
  function(err) {
    console.log('err', err);
    return err + 100;
  }
);

p1.then(
  function(data) {
    console.log(data);
  },
  function(err) {
    console.log(err);
  }
);

// p.then(
//   function(value) {
//     console.log('成功2：', value);
//   },
//   function(reason) {
//     console.log('失败2：', reason);
//   }
// );
