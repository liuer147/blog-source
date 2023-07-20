### 步骤
1. 执行`npm init -y`使用默认配置创建 node 项目。
2. 安装 Webpack 相关依赖。
```bash
// 全局安装
npm i webpack webpack-cli -g

// 局部安装
npm i webpack webpack-cli -D
```

3. 在项目`package.json`文件中的`scripts`对象中添加`"build": "webpack"`属性值。
```javascript
{
  ...
  "scripts": {
  	"build": "webpack"
	},
  ...
}

```

4. 现在，我们可以执行`npm run build`来将项目打包了。
### 注意事项

- 为什么安装 webpack 的同时需要安装 webpack-cli ?

因为`webpack-cli`里面封装了对命令行参数的解析，配置文件的读取和处理。如果我们不安装`webpack-cli`，那么`webpack`无法获得正确的配置信息来进行打包。

