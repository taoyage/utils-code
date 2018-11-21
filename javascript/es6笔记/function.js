// ========== 函数默认参数 ==============
function ajax(url = new Error('url不能为空'), method = 'GET', dataType = 'json') {
  console.log(url);
  console.log(method);
  console.log(dataType);
}

ajax('www.baidu.com');

// =========== 展开运算符 ==============
let print = function(a, b, c) {
  console.log(a, b, c);
};

print(...[1, 2, 3]);

// 替代apply
console.log(Math.max.apply(null, [8, 9, 4, 1]));
console.log(Math.max(...[8, 9, 4, 1]));

// 替代concat
let arr1 = [1, 3];
let arr2 = [3, 5];
console.log(arr1.concat(arr2));
console.log([...arr1, ...arr2]);

// ================= 剩余操作符 =====================
let rest = function(a, ...rest) {
  console.log(a, rest);
};
rest(1, 2, 3);

// ================= 解构参数 =====================
let destruct = function({ name, age }) {
  console.log(name, age);
};

destruct({ name: 'bear', age: 3 });

// ================= 函数的名字 =====================
const desc = function descname() {};
// es6给函数添加了一个name属性, desc.name为当前函数的名字
console.log(desc.name);

// ================= 箭头函数 =====================
let sum = (a, b) => a + b;
console.log(sum(1, 2));

//箭头函数的this是定死的，指向外层的this
let obj = {
  name: 'bear',
  getName: () => {
    console.log(this.name); // undefined
  }
};

obj.getName();

let obj1 = {
  name: 'bear',
  getName() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

obj1.getName();
