// ========= 对象字面量 ============
let person = {
  name: 'bear',
  age: 8,
  getName: function() {
    console.log(this.name);
  }
};

person.getName();

// ========= Object.is 对比两个值是否相等 ============
console.log(Object.is(NaN, NaN));

// ========= Object.assign ============
// 把多个对象的属性复制到一个对象中,
// 第一个参数是复制的对象,
// 从第二个参数开始往后,都是复制的源对象
let obj1 = { name: 'a' };
let obj2 = { age: 2, home: { city: 'wenzhou' } };
let obj3 = Object.assign({}, obj1, obj2);

console.log(obj3);

// 深拷贝
let copyObj1 = JSON.parse(JSON.stringify(obj3));

function clone(origin) {
  let newObj = {};
  for (let key in origin) {
    if (typeof origin[key] === 'object') {
      newObj[key] = clone(origin[key]);
    } else {
      newObj[key] = origin[key];
    }
  }
  return newObj;
}

console.log(clone(obj3));

// ========= Object.setPrototypeOf ============
// 将一个指定的对象的原型设置为另一个对象或者null

var obj4 = { name: 'bear1' };
var obj5 = { name: 'bear2' };
var ob6 = {};
Object.setPrototypeOf(ob6, obj4);
console.log(ob6.name);
console.log(Object.getPrototypeOf(ob6));
Object.setPrototypeOf(ob6, obj5);
console.log(ob6.name);
console.log(Object.getPrototypeOf(ob6));

// ========= proto ============
// 直接在对象表达中设置prototype

var obj7 = { name: 'bear' };

var obj8 = {
  __proto__: obj7
};

console.log(obj8.name);
console.log(Object.getPrototypeOf(obj8));

// ========= super ============
// 通过super可以调用prototype上的属性或方法

var person1 = {
  eat() {
    return 'milk ';
  }
};

var student = {
  __proto__: person1,
  eat() {
    return super.eat() + 'bread';
  }
};

console.log(student.eat());
