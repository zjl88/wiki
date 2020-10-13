## git reset
`git reset --<参数> <版本号>`命令用于将当前分支回退到指定版本
### 参数
- `soft`: 不改变工作区和缓存区，只移动 HEAD 到指定 commit。
- `mixed`: 只改变缓存区，不改变工作区。这是默认参数，通常用于撤销git add。
- `hard`：改变工作区和暂存区到指定 commit。该参数等同于重置，可能会引起数据损失。git reset --hard等同于git reset --hard HEAD。
- `-p`表示键入交互模式，指定暂存区的哪些部分需要撤销。