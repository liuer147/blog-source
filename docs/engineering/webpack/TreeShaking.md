### 认识 Tree Shaking
`Tree Shaking` 是一种用于优化 JavaScript 应用程序的技术，可以帮主我们删除未使用的代码，以减少输出文件的体积，提高应用程序的性能。
它基于 ES6 的静态结构特性，可以在编译时对模块进行静态分析，识别和删除未使用的代码。
需要注意，如果说我们在代码中使用了副作用，以及使用动态引入的话，则`Tree Shaking`无法生效。
> Tree Shaking 的名称 来自于在编译过程中，代码被组织成一个树状结构，其中未使用的代码被认为是"死代码"，可以被删除，就像树上的枯枝一样。

### webpack 中使用 Tree Shaking
> 参考：[https://juejin.cn/book/7115598540721618944/section/7119035803765833762?enter_from=course_center&utm_source=course_center](https://juejin.cn/book/7115598540721618944/section/7119035803765833762?enter_from=course_center&utm_source=course_center)

	Webpack 中，Tree-shaking 的实现，一是需要先 「标记」 出模块导出值中哪些没有被用过；二是使用代码压缩插件 —— 如 [Terser](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fterser-webpack-plugin) 删掉这些没被用到的导出变量。
标记功能需要配置 `optimization.usedExports = true`开启，标记的效果就是删除那些没有被其他模块使用的"导出语句"。
![](/webpack/1688631429456-422b6bfe-7f94-4977-8c40-1e2f594f231d.webp)
> **所以，在 webpack 中，启动 TreeShaking 功能必须同时满足三个条件：**
> 1. **使用 ESM 规范编写模块代码。**
> 2. **配置**`**optimization.usedExports**`**为**`**true**`**，启动标记功能。**
> 3. **启动代码优化功能，使用类似 terser 压缩工具包，来删除标记的死代码。**

#### css 的 TreeShaking
在 webpack 中实现 css 的 treeShaking 需要借助插件`purgecss-webpack-plugin`来实现。它底层是使用的`PurgeCSS`库来实现的。
> 执行 `npm i purgecss-webpack-plugin -D`下载

> 参考：[https://www.npmjs.com/package/purgecss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin)

```javascript
const path = require('path')
// const PurgeCssPlugin = require('purgecss-webpack-plugin')

// 5.0.0 版本之后需要使用下面方式引入
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
// webpack 自动下载的，无需再次手动下载
const glob = require('glob');

module.exports = {
  plugins: [
    new PurgeCSSPlugin({
      // 分析 src 目录下所有文件中的 css 样式，并删除未使用的 css 样式
      paths: glob.sync(`${path.resolve(__dirname, "./src")}/**/*`, { nodir: true }),
      safelist: function() { // 白名单
        return {
          standard: ["body", "html"]
        }
      }
    })
  ]
}
```
