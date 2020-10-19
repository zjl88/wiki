### git reset
`git reset --<参数> <版本号>`命令用于将当前分支回退到指定版本
- soft: 不改变工作区和缓存区，只移动 HEAD 到指定 commit。
- mixed: 只改变缓存区，不改变工作区。这是默认参数，通常用于撤销git add。
- hard：改变工作区和暂存区到指定 commit。该参数等同于重置，可能会引起数据损失。git reset --hard等同于git reset --hard HEAD。
- -p表示键入交互模式，指定暂存区的哪些部分需要撤销。
```
#撤销上一次向暂存区提交的所有文件，不会影响工作区。相当于git reset --mixed head
git reset 

#没有任何效果，
git reset --soft

#回退到上一个版本，暂存区和工作区不变
git reset --soft head^ 

#撤销上一次向暂存区的提交的文件，同时撤销工作区的修改。相当于git rest --hard head
git reset --hard

#撤销上一次向暂存区提交的指定文件，不会影响工作区。相当于git reset -- <filename> head
git reset -- <filename>

指定文件回退时，后面跟--<参数>不可用，即：
git reset -- test.html --mixed head 不报错，结果相当于git reset -- <filename>
git reset -- test.html --hard head 不报错，结果相当于git reset -- <filename>

所以指定文件回退就使用git reset -- <filename>

git set --soft 
```
### git checkout
`git checkout`有多种用途
#### 切换分支
#### 切换到指定的分支
git checkout <分支名>

#### 切换到指定的快照（commit）
git checkout <commitID>

#### 恢复指定的文件
#将指定文件恢复到和暂存区一致，会丢弃工作区的修改
git checkout -- <filename>

#从commitid恢复指定文件，会同时改变暂存区和工作区
git checkout <commitId> -- <filename>

#-p参数表示进入交互模式，只恢复部分变化。（暂时不理解）
git checkout -p


#### 切换到某个tag
#切换到1.1.4标签，前提是本地不能有1.1.4的分支
git checkout tags/1.1.4 或 git checkout 1.1.4

#### 用于生成一个新分支,并切换到该分支
git checkout -b <newname>

### git rm
`git rm <filename>`命令用于删除文件，会同暂存区和工作区一同删掉
`git rm --cached <fileName>`删除文件，会同暂存区删除，工作区保留


