# command-next-cli-service

前端一键自动化执行脚本任务群组。

### github

[https://github.com/Yukixieyuya821/command-next-cli-service](https://github.com/Yukixieyuya821/command-next-cli-service)

### npm

[https://www.npmjs.com/package/command-next-cli-service](https://www.npmjs.com/package/command-next-cli-service)


## 1 安装

全局安装 command-next-cli-service

```shell
npm install command-next-cli-service -g
```

本地安装 command-next-cli-service

```shell
npm install command-next-cli-service --save-dev
```

查看版本，表示安装成功

```javascript
command-next-cli-service -v
```

注：本地安装的需要在调用前加 `npx`

```shell
npx command-next-cli-service -v
```

### 2 使用（以下代码都以全局安装为例）

#### 2.1 查看帮助

```shell
command-next-cli-service -h
```


#### 2.2 初始化配置文件（在项目目录下）

```shell
command-next-cli-service init # 或者使用简写 command-next-cli-service i
```

根据提示填写内容，会在项目根目录下生成 `command.config.js` 文件，初始化配置只会生成 `dev` (开发环境)、`test` (测试环境)、`prod` (生产环境) 三个配置，再有其他配置可参考模板自行配置。


#### 2.3 手动创建或修改配置文件

在项目根目录下手动创建 `command.config.js` 文件，复制以下代码按情况修改即可。

```javascript
module.exports = {
  projectName: 'demo', // 项目名称
  cluster: [], // 集群执行配置，要同时在多台配置执行脚本 此属性如: ['dev', 'test', 'prod']
  dev: {
    // 环境对象
    name: '开发环境', // 环境名称
    mainTask: {  // 主任务脚本列表
        name: 'demo-name',
        script: [
            {
                command: 'git clone -b master git@github.com:*****',
                description: '克隆项目',
                type: 'clone', // 该字段会判断是否存在该项目，仅做文件夹判断， 若存在，则执行拉取pull命令，反之，执行该克隆命令
                cwd: process.cwd(), // 指定脚本执行目录， 不写或为null， 则在当前脚本执行的目录执行
                beforeCallback: (resolve, reject) => {
                  // 在执行该脚本之前的回调函数， 该函数为一个promise
                  resolve()
                },
                afterCallback: (resolve, reject) => {
                  // 在执行该脚本之后的回调函数， 该函数为一个promise
                  resolve()
                }
            },
            {
                command: 'yarn',
                description: '执行安装依赖脚本',
                cwd: path.resolve(process.cwd(), 'demo-name') 
            },
            {
                command: 'yarn build',
                description: '执行打包脚本',
                cwd: path.resolve(process.cwd(), 'demo-name')
            }
        ]
    },
    childTasklist: [ // 子任务脚本列表 可执行多个子任务
        {
            name: 'child-demo-name',
            script: [
                {
                command: 'git clone -b master git@github.com:*****',
                description: '克隆项目',
                type: 'clone', // 该字段会判断是否存在该项目，仅做文件夹判断， 若存在，则执行拉取pull命令，反之，执行该克隆命令
                cwd: process.cwd(), // 指定脚本执行目录， 不写或为null， 则在当前脚本执行的目录执行
                beforeCallback: (resolve, reject) => {
                  // 在执行该脚本之前的回调函数， 该函数为一个promise
                  resolve()
                },
                afterCallback: (resolve, reject) => {
                  // 在执行该脚本之后的回调函数， 该函数为一个promise
                  resolve()
                }
            },
            {
                command: 'yarn',
                description: '执行安装依赖脚本',
                cwd: path.resolve(process.cwd(), 'child-demo-name') 
            },
            {
                command: 'yarn build',
                description: '执行打包脚本',
                cwd: path.resolve(process.cwd(), 'child-demo-name')
            }
            ],
        },
    ]
  },
  test: {
    // 环境对象
    name: '测试环境', // 环境名称
    mainTask: {  // 主任务脚本列表
        name: 'demo-name',
        script: [
            {
                command: 'git clone -b master git@github.com:*****',
                description: '克隆项目',
                type: 'clone', // 该字段会判断是否存在该项目，仅做文件夹判断， 若存在，则执行拉取pull命令，反之，执行该克隆命令
                cwd: process.cwd(), // 指定脚本执行目录， 不写或为null， 则在当前脚本执行的目录执行
                beforeCallback: (resolve, reject) => {
                  // 在执行该脚本之前的回调函数， 该函数为一个promise
                  resolve()
                },
                afterCallback: (resolve, reject) => {
                  // 在执行该脚本之后的回调函数， 该函数为一个promise
                  resolve()
                }
            },
            {
                command: 'yarn',
                description: '执行安装依赖脚本',
                cwd: path.resolve(process.cwd(), 'demo-name') 
            },
            {
                command: 'yarn build',
                description: '执行打包脚本',
                cwd: path.resolve(process.cwd(), 'demo-name')
            }
        ]
    },
    childTasklist: [  // 子任务脚本列表 可执行多个子任务
        {
            name: 'child-demo-name',
            script: [
                {
                command: 'git clone -b master git@github.com:*****',
                description: '克隆项目',
                type: 'clone', // 该字段会判断是否存在该项目，仅做文件夹判断， 若存在，则执行拉取pull命令，反之，执行该克隆命令
                cwd: process.cwd(), // 指定脚本执行目录， 不写或为null， 则在当前脚本执行的目录执行
                beforeCallback: (resolve, reject) => {
                  // 在执行该脚本之前的回调函数， 该函数为一个promise
                  resolve()
                },
                afterCallback: (resolve, reject) => {
                  // 在执行该脚本之后的回调函数， 该函数为一个promise
                  resolve()
                }
            },
            {
                command: 'yarn',
                description: '执行安装依赖脚本',
                cwd: path.resolve(process.cwd(), 'child-demo-name') 
            },
            {
                command: 'yarn build',
                description: '执行打包脚本',
                cwd: path.resolve(process.cwd(), 'child-demo-name')
            }
            ],
        },
    ]
  },
  prod: {
    // 环境对象
    name: '生产环境', // 环境名称
    mainTask: {  // 主任务脚本列表
        name: 'demo-name',
        script: [
            {
                command: 'git clone -b master git@github.com:*****',
                description: '克隆项目',
                type: 'clone', // 该字段会判断是否存在该项目，仅做文件夹判断， 若存在，则执行拉取pull命令，反之，执行该克隆命令
                cwd: process.cwd(), // 指定脚本执行目录， 不写或为null， 则在当前脚本执行的目录执行
                beforeCallback: (resolve, reject) => {
                  // 在执行该脚本之前的回调函数， 该函数为一个promise
                  resolve()
                },
                afterCallback: (resolve, reject) => {
                  // 在执行该脚本之后的回调函数， 该函数为一个promise
                  resolve()
                }
            },
            {
                command: 'yarn',
                description: '执行安装依赖脚本',
                cwd: path.resolve(process.cwd(), 'demo-name') 
            },
            {
                command: 'yarn build',
                description: '执行打包脚本',
                cwd: path.resolve(process.cwd(), 'demo-name')
            }
        ]
    },
    childTasklist: [  // 子任务脚本列表 可执行多个子任务
        {
            name: 'child-demo-name',
            script: [
                {
                command: 'git clone -b master git@github.com:*****',
                description: '克隆项目',
                type: 'clone', // 该字段会判断是否存在该项目，仅做文件夹判断， 若存在，则执行拉取pull命令，反之，执行该克隆命令
                cwd: process.cwd(), // 指定脚本执行目录， 不写或为null， 则在当前脚本执行的目录执行
                beforeCallback: (resolve, reject) => {
                  // 在执行该脚本之前的回调函数， 该函数为一个promise
                  resolve()
                },
                afterCallback: (resolve, reject) => {
                  // 在执行该脚本之后的回调函数， 该函数为一个promise
                  resolve()
                }
            },
            {
                command: 'yarn',
                description: '执行安装依赖脚本',
                cwd: path.resolve(process.cwd(), 'child-demo-name') 
            },
            {
                command: 'yarn build',
                description: '执行打包脚本',
                cwd: path.resolve(process.cwd(), 'child-demo-name')
            }
            ],
        },
    ]
  } 
}
```

#### 2.4 执行脚本 （在项目目录下）

注意：命令后面需要加 `--mode` 环境对象 （如：`--mode dev`）

```shell
command-next-cli-service start --mode dev # 或者使用 command-next-cli-service s --mode dev
```

输入 `Y` 确认后即可开始自动执行脚本任务


#### 2.5 集群执行脚本 （在项目目录下）

注意：集群配置需要在 `command-next-cli-service` 中 配置 `cluster` 字段 （如：`cluster: ['dev', 'test', 'prod']`）

```shell
command-next-cli-service start # 或者使用 command-next-cli-service s
```

输入 `Y` 确认后即可开始自动执行脚本任务


#### 2.7 本地安装扩展

如果使用本地安装命令的话，可以在项目根目录下的 `package.json` 文件中 `scripts` 脚本中添加如下代码

```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint",
  "execu": "command-next-cli-service start",
  "execu:dev": "command-next-cli-service start --mode dev",
  "execu:test": "command-next-cli-service start --mode test",
  "execu:prod": "command-next-cli-service start --mode prod"
}
```

然后使用下面代码也可以完成执行脚本操作

```shell
npm run execu:dev
```

最后如果大家觉得还不错挺好用的话，麻烦给个 Star 😜😜😜。
