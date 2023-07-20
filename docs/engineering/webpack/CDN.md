通过 webpack 实现资源 CDN 引入主要有两种情况。
### 将项目打包后的资源放到 CDN 服务器上。
此时，需要设置`output.publicPath`值为 CDN 服务器中存放资源的路径。这样打包之后 html 文件引入的资源就会携带这个路径，我们在把资源上传到 CDN 服务器即可。
```javascript
module.exports = {
  ...
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:6]_bundle.js',
    publicPath: 'https://www.baidu.com', // 设置资源公共路径
    chunkFilename: 'chunks/[name]_chunk.js'
  },
  ...
}
```
![image.png](/webpack/1688540143784-951b3524-0883-43eb-9d17-3bc709c25381.png)
### 直接使用在 CDN 服务器上的第三方库。
此方式需要注意的有两点，一个是排除相对应的第三方库打包。另一个就是引入第三方库的 CDN 资源了。
#### 1. 排除某些库的打包
> 参考：[https://www.webpackjs.com/configuration/externals/](https://www.webpackjs.com/configuration/externals/)

webpack 中提供了 外部扩展`externals`配置，可以配置某些库不参与打包。
```javascript
module.exports = {
  externals: {
  	// key 'jquery' 表示排除打包的库的名称。
    // value 'jQuery' 表示这个库在全局作用域中的变量名
    jquery: 'jQuery',
    lodash: '_'
	}
}
```
#### 2. 引入第三方库的 CDN 资源
通常我们都会使用`HhmlWebpackPlugin`来指定模板，我们只需要在这个 模板 中手动添加引入 CDN 资源的语句即可。
```javascript
module.exports = {
  externals: {
    lodash: '_'
  },
}
```
![image.png](/webpack/1688541469841-25fbe96a-bfab-42d6-b42b-e5dfe07f3289.png)
