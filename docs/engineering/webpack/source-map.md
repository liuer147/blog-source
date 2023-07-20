### 认识 source-map
- 什么是 source-map ?

source-map 是指从 **已转换的代码**，映射到 **原始的源文件**。

- 为什么需要 source-map ?

目前，前端运行在浏览器中的代码实际上和我们编写的代码是由差异的。如代码丑化，es6 -> es5，代码行号、列号等。当我们编写的代码出现问题时，调试编译后的代码找出问题所在就显得很困难了。所以我们需要使用 source-map，来将源文件代码 与 编译后的代码关联起来。
通过 source-map，可以使浏览器 重建原始源 并在调试器中 显示重建的原始源。
### 使用 source-map

1. 浏览器启用 JavaScript / CSS 源代码映射。

在浏览器控制台的设置中即可选择。![image.png](/webpack/1688369980605-6f3a6273-4fa1-4718-8328-d47508384d5a.png)

1. 在转换后的代码，最后添加一个注释，它指向 source-map 文件。
```javascript
//# sourceMappingURL=xxx.map
```
### source-map 文件分析
source-map 文件格式如下。
```javascript
{
  "version": 3,
  "file": "397_ff21a8.js",
  "mappings": "wIAEAA,QAAQC,IAAI,2BAEZ,QAJc,Y",
  "sources": ["webpack://webpack-test/./src/title.js"],
  "sourcesContent": ["const title = '我是title.js'\n\nconsole.log('title.js => console.log')\n\nexport default title"],
  "names": ["console", "log"], // 压缩后的名字 a.xx 对应的 压缩前的名字 
  "sourceRoot": "",
}
```
![image.png](/webpack/1688370604177-8ddc59c2-714b-46be-bf02-0686d3a52e09.png)
### webpack 配置生成 source-map
通过 webpack 配置中的 devtool 字段可以配置不同形式的 source-map。
![image.png](/typescript/1689839296678-6900a5af-7ca0-4b42-96c8-9074b8d3680f.png)
**此外，需要知道的是有三个值不会生成 source-map：**

1. `false`：不使用 source-map。
2. `none`：不写`devtool`值，`production`模式下的默认值。不生产 source-map。
3. `evel`：`development`模式下的默认值。它不生产 source-map，但是它会在 eval 执行的代码中，添加`//# sourceURL=xxx`指向源文件。

![image.png](/webpack/1688371902679-f9fa40f0-c7cc-4ca0-903e-804639eed9bc.png)
#### 常见值介绍

1. `**devtool: 'source-map'**`

生成一个独立的 source-map 文件，并且在打包后的文件中有一个注释指向 source-map 文件。
![image.png](/webpack/1688372187805-c3624e80-e830-4ae4-82cf-285ceb4ce04f.png)

2. **`devtool: 'eval-source-map'`**

会生成 source-map，但是 source-map 是以 DataUrl 添加到** eval 函数里面最后**。`sourceMappingURL=xxx`
![image.png](/webpack/1688372380417-d16f2cc7-9154-485a-8249-839d989f9141.png)

3. **`devtool: 'inline-source-map'`**

会生成 source-map，但是 source-map 是以 DataUrl 添加到 **打包后的文件的后面**。
![image.png](/webpack/1688372534880-5ded78b6-5f65-4a5e-a7e7-d1ebefadd9ba.png)

4. **`devtool: 'cheap-source-map'`**

会生成 source-map，但**它没有生成列映射**。它会比 `devtool: 'source-map'`更加高效。
![image.png](/webpack/1688372663800-2ac67b8e-f701-4727-b915-a24bfd72531a.png)

5. **`devtool: 'cheap-module-source-map'`**

如果说打包后的代码会经过类似`babel-loader`之类的loader 处理过的话，则使用`cheap-module-source-map`更好映射出原始代码，不然会有一些细微差别（相比于`cheap-source-map`）。下面就是行数不一样。
![image.png](/webpack/1688373509110-6898447f-e831-43f7-b555-8aaa52789743.png)

1. **`devtool: 'hidden-source-map'`**

![image.png](/webpack/1688373612559-f274b3c9-060d-429c-9ccd-bf092ed0a0f6.png)

7. **`devtool: 'nosources-source-map'`**

控制台中能生成正确的错误信息，包括错误对应源文件的行数。但是点进去就不行了。
![image.png](/webpack/1688373680612-e8c3f77c-d511-496f-a777-7004795c41ff.png)
#### 推荐实践
开发阶段、测试阶段：`source-map` 或者 `cheap-module-source-map`

发布阶段：`false`、缺省值
