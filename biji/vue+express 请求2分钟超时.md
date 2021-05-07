#### vue+express 请求2分钟超时

##### 环境说明：

服务端： node + express

接口：

```javascript
const express = require('express');
const app = express();

app.get('/getdata', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
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
    axios.get('http://localhost:3000/getdata',{
        timeout: 0,
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
```

##### 问题描述：

不管axios设置timeout为多少，请求在2min时都会超时

![](F:\wiki\biji\vue+express 请求2分钟超时\image-20210507102038188.png)

##### 问题分析：

造成以上问题，



##### 

