## <center>vue代码编写规范</center>

#### 规范目的

1. 提高代码质量

2. 提高团队协作效率

3. 降低后期维护成本

#### 命名规范

命名规范中需要注意的核心点：

- 语义明确

##### 1. 变量

普通变量：

- 使用驼峰命名法

- 命名复数变量时使用对应单词的复数

eg:

```javascript
let expiredAccount = null; // 过期账号
let users = []; // 用户列表
```

常量：

使用`const`定义，并且单词全部大写，单词之间使用下划线分割

eg:

```javascript
const REQUEST_URL = 'http://www.baidu.com';
const MIN_NUM = 2;
```

##### 2. 文件夹

- 文件夹使用`kebab-case`风格命名
- 尽量使用语义清晰的模块名称命名文件夹
- 全局通用的组件放在 /src/components下
- 其他业务组件，放在各自模块下的 ./components文件夹下
- components文件夹下最多只有一层子文件夹，且子文件夹名称为组件的名称，子文件夹下必须有`index.vue`或
   `index.js`

##### 3. 组件命名规范

遵循[官方推荐](https://cn.vuejs.org/v2/guide/components-registration.html#%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99)和[风格指南](https://cn.vuejs.org/v2/style-guide/index.html#%E4%BC%98%E5%85%88%E7%BA%A7-B-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90-%E5%A2%9E%E5%BC%BA%E5%8F%AF%E8%AF%BB%E6%80%A7)的命名规范

##### 4. props命名

- props命名使用camelCase，小写字母开头
- 需要指定props类型和默认值
- props名称语义明确
- 在模板中使用props时采用kebab-case形式

##### 4. method 方法命名命名规范

- 使用驼峰式命名
- 小写字母开头
- 统一使用动词或者动词+名词形式
- 单词要语义明确
- 请求数据方法，以 data 结尾

eg:

```javascript
jumpPage、openUserinfoDialog、getUserListData
```

**附：** 函数方法常用的动词:

```
get 获取/set 设置,
add 增加/remove 删除
create 创建/destory 移除
start 启动/stop 停止
open 打开/close 关闭,
read 读取/write 写入
load 载入/save 保存,
create 创建/destroy 销毁
begin 开始/end 结束,
backup 备份/restore 恢复
import 导入/export 导出,
split 分割/merge 合并
inject 注入/extract 提取,
attach 附着/detach 脱离
bind 绑定/separate 分离,
view 查看/browse 浏览
edit 编辑/modify 修改,
select 选取/mark 标记
copy 复制/paste 粘贴,
undo 撤销/redo 重做
insert 插入/delete 移除,
add 加入/append 添加
clean 清理/clear 清除,
index 索引/sort 排序
find 查找/search 搜索,
increase 增加/decrease 减少
play 播放/pause 暂停,
launch 启动/run 运行
compile 编译/execute 执行,
debug 调试/trace 跟踪
observe 观察/listen 监听,
build 构建/publish 发布
input 输入/output 输出,
encode 编码/decode 解码
encrypt 加密/decrypt 解密,
compress 压缩/decompress 解压缩
pack 打包/unpack 解包,
parse 解析/emit 生成
connect 连接/disconnect 断开,
send 发送/receive 接收
download 下载/upload 上传,
refresh 刷新/synchronize 同步
update 更新/revert 复原,
lock 锁定/unlock 解锁
check out 签出/check in 签入,
submit 提交/commit 交付
push 推/pull 拉,
expand 展开/collapse 折叠
begin 起始/end 结束,
start 开始/finish 完成
enter 进入/exit 退出,
abort 放弃/quit 离开
obsolete 废弃/depreciate 废旧,
collect 收集/aggregate 聚集
```

#### 项目结构

```
src                                      
├─api                        接口
├─assets                     静态资源（经过webpack，存放本系统的资源文件）
├─components                 公用组件
├─datas                      临时数据
├─filters                    过滤器
├─mock                       模拟数据
├─plugins                    插件
├─router                     路由
├─static                     静态资源（不经过webpack，存放第三方资源）
├─store                      vuex
└─views                      视图目录
    └─user                   模块目录
        ├─components         模块组件
		 └─index.vue         模块首页
```

#### 多个属性的元素规范

属性个数超过3个的元素应该分多行，每个属性一行，增加代码可读性

```
// bad
<my-component name="jack" :age="12" sex="man" hobby="basketball"></my-component>

// good
<my-component
    name="jack"
    :age="12"
    sex="man"
    hobby="basketball"
>
</my-component>
```

#### 元素属性的顺序

前后顺序：原生属性 、自定义属性、指令

eg：

```
  - class
  - id,ref
  - name
  - data-*
  - src, for, type, href,value,max-length,max,min,pattern
  - title, alt，placeholder
  - aria-*, role
  - required,readonly,disabled
  - is
  - v-for
  - key
  - v-if
  - v-else-if
  - v-else
  - v-show
  - v-cloak
  - v-pre
  - v-once
  - v-model
  - v-bind,:
  - v-on,@
  - v-html
  - v-text
```

#### 组件/实例选项顺序

按照[官方风格指南](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6-%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%89%E9%A1%B9%E7%9A%84%E9%A1%BA%E5%BA%8F%E6%8E%A8%E8%8D%90)规范

#### 注释

##### 1. 文件注释规范

单个文件注释规范，每个独立的VUE文件开头都要进行注释，表明该文件的描述信息、作者、创建时间等。

```html
<!--
 * @FileDescription: 该文件的描述信息
 * @Author: 作者信息
 * @Date: 文件创建时间
 * @LastEditors: 最后更新作者
 * @LastEditTime: 最后更新时间
 -->
```

##### 2. 方法注释规范

VUE文件中method中的方法注释：在变量的后面进行变量的注释说明

```javascript
/**
 * 方法描述
 * @param {参数类型} 参数名称
 * @returns 没有返回信息可不写 / 有返回信息 {返回类型} 描述信息
 */
```

##### 4. 变量的注释

vue文件中data声明的变量的注释

```javascript
 data() {
     return {
     	let activeName = 'first'; // 默认选中的tab页
     }
 }

```

##### 5. 行内注释和代码块的注释

当方法体中有较为复杂的处理逻辑时，需要使用行内注释或代码块注释进行说明

代码块注释：

```javascript
/**
* 1. 首先重新构造一个新数组
* 2. 然后进行排序
* 3. 最后剔除不符合满足要求的数据
**/
```

行内注释：

```javascript
// 此处进行对象合并处理
let obj = merge(obj1, obj2);
```

#### 指令规范

- 指令有缩写一律采用缩写形式

  使用`:class`，而不是用`v-bind:class`；使用`@click`，而不是` v-on:click`

- v-for 循环必须加上 key 属性，且在整个 for 循环中 key 值要唯一

- 避免 v-if 和 v-for 同时用在一个元素上

#### 其他

- 禁止简写`if`和`else`，必须使用{}

  

  








