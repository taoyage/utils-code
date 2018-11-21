// =========== from ==============
const objArr = {
  0: '1',
  1: '2',
  2: '3',
  length: 3
};

// 将一个数组或者类数组变成数组
let newArr = Array.from(objArr, item => {
  return item * 2;
});

console.log(newArr);
// 代替了 Array.prototype.slice.call()
console.log(Array.prototype.slice.call(objArr));

// =========== of是为了将一组数值,转换为数组 ==============
console.log(Array.of(3,4,5));

// =========== copyWithin ==============
console.log([1, 2, 3, 4, 5].copyWithin(1, 2, 1));

// =========== 查找对应的元素和索引 ==============
let arr = [2, 1, 3, 3, 4, 5];

Array.prototype.find = function(fn) {
  for (let i = 0; i < this.length; i++) {
    let flag = fn(this[i]);
    if (flag) {
      return this[i];
    }
  }
};

let find = arr.find((item, index, arr) => {
  return item === 1;
});

Array.prototype.findIndex = function(fn) {
  for (let i = 0; i < this.length; i++) {
    let flag = fn(this[i]);
    if (flag) {
      return i;
    }
  }
};

let findIndex = arr.findIndex((item, index, arr) => {
  return item === 3;
});

console.log(find, findIndex);

// =========== map ==============
const mapArr = [1, 2, 3];
const map1 = mapArr.map(x => x * 2);

// =========== reduce ==============
const reduceArr = [2, 3, 4];
const sum = reduceArr.reduce((sum, item) => {
  sum = sum + item;
  return sum;
}, 0);

Array.prototype.reduce = function(reducer, initialVal) {
  for (let i = 0; i < this.length; i++) {
    initialVal = reducer(initialVal, this[i], i, this);
  }
  return initialVal;
};

console.log('reduce', sum);

// =========== every ============
let everyArr = [5, 6, 7];

Array.prototype.every = function(fn) {
  for (let i = 0; i < this.length; i++) {
    let flag = fn(this[i]);
    if (!flag) {
      return false;
    }
  }
  return true;
};

console.log(everyArr.every(item => item > 1));

// =========== some ============

let someArr = [5, 6, 7];

Array.prototype.some = function(fn) {
  for (let i = 0; i < this.length; i++) {
    let flag = fn(this[i]);
    if (flag) {
      return flag;
    }
  }
  return false;
};

console.log(someArr.some(item => item > 6));

// =========== filter ==============
let arr1 = [1, 2, 3, 4, 5];
let filter = arr1.filter(item => item > 3);
console.log('filter', filter);

Array.prototype.filter = function(fn) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    flag = fn(this[i]);
    if (flag) {
      newArr.push(this[i]);
    }
  }
  return newArr;
};

// =========== forEach ==============
