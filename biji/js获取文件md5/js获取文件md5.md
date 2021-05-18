使用[spark-md5](https://github.com/satazor/js-spark-md5)获取文件的md5

```javascript
// 两种引入方式 
// import SparkMD5 from '../../static/spark-md5';
// import SparkMD5 from 'spark-md5';
getFileMd5(file){
  return new Promise((resolve, reject) => {
    let blobSlice = File.prototype.slice,
      chunkSize = 2097152,                             // Read in chunks of 2MB
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();

    fileReader.onload = function (e) {
      console.log('read chunk nr', currentChunk + 1, 'of', chunks);
      spark.append(e.target.result);                   // Append array buffer
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        console.log('finished loading');
        const md5 = spark.end();
        console.log('computed hash', md5);  // Compute hash
        resolve(md5);
      }
    };

    fileReader.onerror = function (e) {
      console.error('Error during file reading.');
      reject(e);
    };

    const loadNext = () => {
      let start = currentChunk * chunkSize,
        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
    loadNext();
  });
}
```

使用：

```html
 <input id="file" type="file">
```

```javascript
   let _this = this;
   console.dir(document.getElementById('file'));
   document.getElementById('file').addEventListener('change', function() {
   let file = this.files[0];
     _this.getFileMd5(file);
   });
```

  

  

