#### vue+express 请求2分钟超时

##### 问题描述：

不管axios设置timeout为多少，请求在2min时都会超时

![image-20210507102038188](.\image-20210507102038188.png)

##### 环境说明：

服务端： node + express

接口：

```javascript
const express = require('express');
const app = express();

app.get('/getdata', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 允许跨域
    setTimeout(() => {
        console.log('end: ' + new Date().getTime());
        res.send('Hello World!')
    }, 1000 * 60 * 3);
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
```



前端：vue + axios + webpack

请求：

```javascript
    const axios = require('axios');
    axios.get('/getdata',{}).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
```

代理：

```js
module.exports = {
    devServer: {
        proxy: {
            '/getdata': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
};
```

##### 问题分析：

造成以上问题，可能有以下原因：

- express默认2分钟超时

 针对这种情况可使用以下方式解决（[参考](https://stackoverflow.com/questions/21708208/express-js-response-timeout)）：

```js
app.use(function(req, res, next){
    // 设置超时时间为3分钟
    res.setTimeout(180000, function(){
        console.log('Request has timed out.');
            res.send(408);
        });
    next();
});

```

- webpack中http-proxy-middleware插件配置的代理超时（默认超时时间为2分钟）

  可以在配置代理的时候设置超时时间

  ```javascript
  module.exports = {
      devServer: {
          proxy: {
              '/getdata': {
                  target: 'http://localhost:3000',
                  changeOrigin: true,
                  // 超时时间设置为4分钟， proxyTimeout 和 timeout都要设置
                  proxyTimeout: 1000 * 60 * 4, // 代理未从目标接收到响应时的超时（以毫秒为单位）
                  timeout: 1000 * 60 * 4, // 传入请求的超时（以毫秒为单位）
              }
          }
      }
  };
  ```

- axios设置了timeout

  检查axios是否设置了timeout，如果因为timeout造成超时，status为canceled

  ![image-20210507152754429](.\image-20210507152754429.png)

  可以将timeout设置为0，表示永不超时

  ```javascript
  axios.get('/getdata',{
      timeout: 0
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  });
  ```

