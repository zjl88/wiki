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

- 