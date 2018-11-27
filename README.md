# x-seed
react组件开发规范
***
创建组件的方式

```bash
git clone --depth=1 https://github.com/React-xui/x-seed.git x-组件名
```
安装npm依赖
```bash
npm install 
```
*需要注意的是，这里的webpack版本都不是最新的版本.*
### 启动本地调试服务
```bash
npm start
```
执行该命令后，你可以通过`http://localhost:8090/`查看`dev`下的页面效果.

组件的源代码存在于`src`目录下，`css`文件统一使用`sass`编写，如果需要使用`less`的需要配置`webpack`的配置文件,这里针对每一个文件目录作一下说明。
## 目录及文件结构
*  `src`组件的源代码目录，里面的`index.jsx`是引用的`components`里的`Seed.jsx`（对应你的组件文件）,同理`_index.scss`引用`components`下的`_Seed.scss`（对应你的组件的样式）.
* `dev`是在开发过程中调试组件的运行目录。在这里固定`app.js`文件名，这里直接引用`src`目录下`import Seed from '../src/index'` ;在`index.html`中引用`shared.js`和`app.js`即可，如果有样式，就引用`app.css`。
* `examples`例子的目录，这是一个最终组件生成后的调用目录，与`dev`目录不同的是，这里的`js`调用的是最终生成的`js`代码，他来源于`lib`目录，在`examples`中，`html`要引用的`js`文件除了`shared.js`外，还需要引用调用组件的`js`文件夹目录名称的`js`,如例子中的`app.js`是放置在`basic`目录下的，所以引用的`js`名称也叫`basic.js`.
* `lib`生成组件的目录，这里的组件是基于`es6`语法的，最终将生成为`es5`的语法给用户直接调用，`lib`下的`index.js`就是最终生成的可以直接引用的组件名，同时对应有`index.css`的样式文件。
* `scripts`服务器脚本，这里放的是生成本地`http`服务的`webpack`热启动脚本。分别对应`npm`中的命令，下面会着重介绍。
* `.babelrc`组件编译文件，`react`从`es6`编译成`es5`的`bable`配置文件。
* `package.json`项目`npm`声明文件，这里面需要修改为自己对应的相关信息，这里对应几个`bash`的脚本命令
### 启动示例代码服务
```bash
npm run-script example
```
执行该命令后，你可以通过`http://localhost:8080/`查看`example`下的页面效果.

*上面的两种服务都对应的`webpack.config.js`文件*
### 生成最终的组件代码
```bash
npm run-script prepublish
```
此代码会在发布`npm`时自动执行。

# 发布gitbook静态站点
```bash
npm run-script docs
```
发布这个会在git上创建gh-pages分支，然后把_book下的文件提交至对应的github仓库。

# 发布至`npmjs`社区
```bash
$ npm adduser	
Username: your name
Password: your password
Email: yourmail[@gmail](/user/gmail).com

$ npm publish
```

### 关于作者
[https://github.com/tianxiangbing](https://github.com/tianxiangbing)
