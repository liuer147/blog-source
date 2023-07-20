### 入口 entry
入口指示 webpack 应该使用哪（几）个模块，来作为构建其内部 依赖图 的开始。从入口开始，webpack 会找出有哪些模块和库是入口（直接或间接）依赖的。
入口对应 webpack 配置文件中的 `entry` 属性，默认值是`./src/index.js`，我们可以手动修改。
```javascript
module.exports = {
  entry: 'src/index.js',
  // entry: { // 与字符串写法等价，所以打包后的文件名叫 main，
  // 需要修改的话则将 main 改成其他即可
  //   main: 'src/index.js',
  // }
}
```
### 输出 output
输出指示 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。它对应配置文件中的`output`属性，默认值是`./dist/main.js`，其他生成文件默认放置在`./dist`文件夹中。
```javascript
const path = require('path')
  
module.exports = {
  entry: 'src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true, // 每次在打包前都会清空对应目录文件(/dist)
  }
}
```
### loader
默认情况下，webpack 只能理解 JavaScript 和 JSON 文件。而 loader 可以让 webpack 能够处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。
具体的 loader，需要具体额外的安装，然后编写在配置文件中的`module.rules`中，`module.rules`是一个数组，数组的每一项是一个`Rule`对象。
`Rule`对象包含且不限于以下 3 个属性：
> 属性参考：[Module | webpack 中文文档](https://www.webpackjs.com/configuration/module/#nested-rules)

1. `test`： 值为正则，表示与之匹配的文件。
2. `use`：值为数组，数组每一项可以是字符串（`{ loader: 'xxx' }`的简写），也可以是对象`{ loader: 'xxx', options: 'xx' }`。表示使用什么 loader 来处理与 test 相匹配的文件。
3. `loader`：值为字符串，是`use: [{ loader: 'xxx' }]` 的简写。
```javascript
const path = require('path')
  
module.exports = {
  entry: 'src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true, // 每次在打包前都会清空对应目录文件(/dist)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: 'css-loader', // 写法一
        // use: ['css-loader'], // 写法二
        use: [
          { loader: 'css-loader', options: {}}
        ]
      }
    ]
  }
}
```
> **注意**：loader 的执行顺序是从右向左，从下到上的。

### 插件 plugin
插件目的在于解决 loader 无法实现的其他事。包括：打包优化，资源管理，注入环境变量等。
插件对应配置文件中的`plugins`属性。
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: 'src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true, // 每次在打包前都会清空对应目录文件(/dist)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: 'css-loader', // 写法一
        // use: ['css-loader'], // 写法二
        use: [
          { loader: 'css-loader', options: {}}
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出'
    })
  ]
}
```
### 模式`mode`
> 参考：[https://www.webpackjs.com/configuration/mode#root](https://www.webpackjs.com/configuration/mode#root)

	提供 `mode` 配置选项，用于告知 webpack 使用相应模式的内置的一系列配置。此外`mode`设置的值还会修改`DefinePlugin`中`process.env.NODE_ENV`的值。
如果没有配置的话，则`mode`默认值为`production`
![image.png](/webpack/1688462444107-349c4aed-dbe6-4d3e-8b71-f81a2dd49cd4.png)
