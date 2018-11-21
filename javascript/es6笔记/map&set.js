// ============ set =============
// 一个Set是一堆东西的集合，Set有点像数组，
// 不过跟数组不一样的是，set里面不能有重复的内容

var books = new Set();

books.add('js');
books.add('html');

// set可以进行foreach循环
books.forEach(function(book) {
  console.log(book);
});

// 集合中元素的个数
console.log(books.size);

// 判断集合中是否有此元素
console.log(books.has('js'));

books.clear(); // 清空 set

// ============ map =============
// 可以使用Map来组织这种键值对的数据
var books1 = new Map();

// map添加元素
books1.set('js', { name: 'js' });
books1.set('html', 'html');
// map元素长度
console.log(books1.size);

// 获取某个key的map元素值
console.log(books1.get('html'));

// 判断map中有没有key
console.log(books1.has('js'));

books1.forEach((value, key) => {
  console.log(key + '=' + value);
});

books.clear();
