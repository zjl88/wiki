#### 介绍

- 属性名的遍历

  Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

  但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

  ```javascript
  const obj = {};
  let a = Symbol('a');
  let b = Symbol('b');
  
  obj[a] = 'Hello';
  obj[b] = 'World';
  
  const objectSymbols = Object.getOwnPropertySymbols(obj);
  
  objectSymbols
  // [Symbol(a), Symbol(b)]
  
  Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
  let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
  };
  
  Reflect.ownKeys(obj)
  //  ["enum", "nonEnum", Symbol(my_key)]
  ```

- Symbol.for()

  有时，我们希望重新使用同一个 Symbol 值，`Symbol.for()`方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局

  `Symbol.for()`与`Symbol()`这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。比如，如果你调用`Symbol.for("cat")`30 次，每次都会返回同一个 Symbol 值，但是调用`Symbol("cat")`30 次，会返回 30 个不同的 Symbol 值。

  ```javascript
  let s1 = Symbol.for('foo');
  let s2 = Symbol.for('foo');
  
  s1 === s2 // true
  ```

  注意，`Symbol.for()`为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。`Symbol.for()`的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

  ```javascript
  iframe = document.createElement('iframe');
  iframe.src = String(window.location);
  document.body.appendChild(iframe);
  
  iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
  // true
  ```

- Symbol.keyFor() 

  `Symbol.keyFor()`方法返回一个已登记的 Symbol 类型值的`key`。

  ```javascript
  let s1 = Symbol.for("foo");
  Symbol.keyFor(s1) // "foo"
  
  let s2 = Symbol("foo");
  Symbol.keyFor(s2) // undefined
  ```


#### 用途

- 作为属性名的 Symbol

  由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

  ```javascript
  
   let mySymbol = Symbol();
  
    // 第一种写法
    let a = {};
    a[mySymbol] = 'Hello!';
  
    // 第二种写法
    let a = {
      [mySymbol]: 'Hello!'
    };
  
    // 第三种写法
    let a = {};
    Object.defineProperty(a, mySymbol, { value: 'Hello!' });
  
    // 以上写法都得到同样结果
    a[mySymbol] // "Hello!"
  ```

  

- vue中作为组件的key，避免重复

  <template>
  	<div>
      	<YourComponent v-for="index in [1,2,3]" :key="makeKey(index)"></YourComponent>
      </div>
  </template>

  ```javascript
  <script>
    export default {
      methods:{
        makeKey(desc){
          return Symbol(desc);
        }
      }
  
    }
  </script>
  ```

- 消除魔术字符串

  ```javascript
  const shapeType = {
    triangle: Symbol()
  };
  
  function getArea(shape, options) {
    let area = 0;
    switch (shape) {
      case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;
    }
    return area;
  }
  
  getArea(shapeType.triangle, { width: 100, height: 100 });
  ```

#### 内置的 Symbol 值

- Symbol.hasInstance

  对象的`Symbol.hasInstance`属性，指向一个内部方法。当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo`在语言内部，实际调用的是`Foo[Symbol.hasInstance](foo)`。

- Symbol.isConcatSpreadable

  对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开。

- Symbol.species

  对象的`Symbol.species`属性，指向一个构造函数。创建衍生对象时，会使用该属性。

```javascript
// class MyArray extends Array {
//     static [Symbol.species] = Array;
// }

class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
}
const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true
```

- Symbol.match(暂不理解)

- Symbol.replace(暂不理解)

- Symbol.search(暂不理解)

- Symbol.split (暂不理解)

- Symbol.iterator（看完iterator再回来看）

  对象的`Symbol.iterator`属性，指向该对象的默认遍历器方法。

- Symbol.toPrimitive

  对象的`Symbol.toPrimitive`属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

- Symbol.toStringTag

  对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。

  ```javascript
  // 例一
  ({[Symbol.toStringTag]: 'Foo'}.toString())
  // "[object Foo]"
  
  // 例二
  class Collection {
      get [Symbol.toStringTag]() {
          return 'xxx';
      }
  }
  let x = new Collection();
  Object.prototype.toString.call(x) // "[object xxx]"
  ```
  
- Symbol.unscopables(不推荐使用)

  对象的`Symbol.unscopables`属性，指向一个对象。该对象指定了使用`with`关键字时，哪些属性会被`with`环境排除。


