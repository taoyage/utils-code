// ================= 模版字符串 =====================
function replace(desc) {
  return desc.replace(/\$\{([^}]+)\}/g, function(matched, key) {
    return eval(key);
  });
}

let name = 'bear';
let age = 3;
let desc = '${name}今年${age}岁了';

console.log(replace(desc));

function tep(strings, ...values) {
  let result = '';
  for (let i = 0; i < values.length; i++) {
    result += strings[i] + values[i];
  }
  result += strings[strings.length - 1];
  return result.toUpperCase();
}

let str = tep`${name}今年${age}岁了`;
console.log(str);

// ================= 字符串前缀和后缀 =====================

let address1 = 'http://www.baidu.com';
let address2 = 'ftp://www.baidu.com';

if (address1.startsWith('http')) {
  console.log('http网址');
}
if (address2.startsWith('ftp')) {
  console.log('ftp服务器');
}

let filename = 'avatar.jpg';
if (filename.endsWith('jpg') || filename.endsWith('png')) {
  console.log('picture');
}

// ================= 字符串中是否包含某个字符 =====================

let content = 'bear';
console.log(content.includes('b'));
console.log(content.indexOf('b') !== -1);

// ================= 重复当前字符串 =====================
console.log('yage'.repeat(3));

// ================= 补全字符串 =====================
let str1 = '7';
console.log(str1.padStart(3, '0'));
console.log(str1.padEnd(2, '0'));
