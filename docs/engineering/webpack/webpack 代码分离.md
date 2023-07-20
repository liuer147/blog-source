所有的代码都打包到一个`.js`文件中，则会导致文件体积过大，从而导致首屏渲染速度会大大降低。这就是首屏空白页面。

解决方法：1. 分包。2. SSR
> webpack 提供了三种代码分离的方式：
> 1. 多入口分包
> 2. 动态导入`import()`分包
> 3. `splitChunks`

### 多入口分包
将`entry`配置为一个包含多个属性值的对象。每一个属性值表示一个入口配置。
```javascript
const path = require('node:path')

module.export = {
  entry: {
    index: './src/index.js',
    title: './src/title.js'
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[contenthash:6]_bundle'
  }
}
```
![image.png](/webpack/1688452127465-a6ef13dc-c846-497e-96b8-6f06e920b729.png)

webpack 根据两个入口文件，构建了不同的依赖图并打包成了不同的结果文件。此时，也带来了新的问题！当存在多个文件引入（依赖）了相同其他代码时，就会出现每个`bundle`文件中都会存在相同的重复的其他代码（这部分代码打包了多次）。

所以，我们 **_还需要解决依赖的相同代码打包多次的问题_**。

我们可以将被依赖的相同的代码模块也作为一个入口配置，且在其他入口配置中添加`dependOn`选项来表明该 chunk 依赖于某个 chunk。
```javascript
const path = require('node:path')

module.export = {
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'lodash',
    },
    title: {
      import: './src/title.js',
      dependOn: 'lodash'
    },
    lodash: 'lodash', // 第三方包 lodash
    utils: './src/utils', // 工具函数
    // 如果属性名改成包含 / 等符号的话，则会放进对应目录下 dist/utils/index_xxxxxx_bundle.js
    // 'utils/index': './src/utils' 
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[contenthash:6]_bundle'
  }
}
```
![image.png](/webpack/1688453309336-2219f16e-b764-44b4-9d61-9119ce927d94.png)

如此，就可以将重复的代码打包到一个新的 bundle 文件中。
### 动态导入`import()`
当我们在代码中使用`import('xxx')`时，webpack 会自动将`'xxx'`模块打包到一个新的文件中。并且，我们可以配置`output.chunkFilename`来设置打包后的文件名
```javascript
const path = require('node:path')

module.export = {
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'lodash',
    },
    title: {
      import: './src/title.js',
      dependOn: 'lodash'
    },
    lodash: 'lodash', // 第三方包 lodash
    utils: './src/utils', // 工具函数
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[contenthash:6]_bundle',
    chunkFilename: 'chunks/[name]_chunk.js' // 这条配置
  }
}
```
![image.png](/webpack/1688453557438-122d7fdb-2064-414d-a6d9-eb2d2314f296.png)

我们可以发现，默认情况下，动态导入的模块的 placeholder `[name]`的值是对应模块相对于项目根目录的路径。我们可以通过魔法注释来设置这个`[name]`。
```javascript
import(/* webpackChunkName: 'newName' */ 'xxx')
```
![image.png](/webpack/1688454069519-8e74c3d2-a893-4725-ab9f-9fbc6f2c2ff2.png)
### splitChunks
> 参考：[https://www.webpackjs.com/plugins/split-chunks-plugin/](https://www.webpackjs.com/plugins/split-chunks-plugin/)

`splitChunk`分包模式底层使用的是`SplitChunksPlugin`插件来完成的，只不过 webpack 已经集成该插件了，所以我们只需要提供`SplitChunksPlugin`相关配置信息即可。
`SplitChunksPlugin`相关配置 对应着`optimization.splitChunks`配置。webpack 提供了默认的`SplitChunksPlugin`配置。
![image.png](/webpack/1688455906918-42939cd5-83fe-4c93-831f-2ad7904b65ce.png)

默认情况下只针对异步情况，大于 20KB的文件。
```javascript
const path = require('node:path')

module.export = {
  entry: {
    index: './src/index.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[contenthash:6]_bundle',
  },
  optimization: {
    splitChunks: {
      // 值从 async 改成 all 之后，则会将代码中使用到的第三方库都打包到一个新的bundle文件
      chunks: 'all',
    	// 当一个包大于 maxSize 时，则继续进行拆包（能拆分的情况下，如果存在一个特别大的函数，则不能继续拆分了）
      maxSize: 20000, // 20KB
    	// 将包拆分成 不小于 minSize 的包
      minSize: 10000, // 10KB

// ！！！ 像 vue-cli create-react-app 都不会设置上述几个属性，但它们都设置了 cacheGroup
      // 自己对需要进行拆包的内容进行分包
      cacheGroups: {
        vender: {
          test: /node_modules/,
          filename: 'vender/[name]_[contenthash:6]_chunk.js',
          // 当某个包满足多个分支时，priority 值越大则优先匹配。
          // 比如 xx包既满足 vender, 又满足 default 时
          priority: -10
        },
        default: {
          // 存在 minChunks 个 chunk 引入的包，则进行拆包。（很少见，因为基本上都是单入口，单入口只会生成单个主 chunk）
          minChunks: 2,
          filename: 'default/[name]_[contenthash:6]_chunk.js',
          priority: -20
        }
      }
    }
  }
}
```
![image.png](/webpack/1688456699841-4b2fb327-4935-4588-acab-dc61aa7b15d9.png)
![image.png](/webpack/1688456762775-d9d4cbe1-f0ea-46b8-83c8-4dff5bc9200b.png)
#### 将 webpack 的模块加载实现代码打包到一个单独的文件
配置`optmization.runtimeChunk`即可设置。
可设置的值：

1. `true`/`multiple`：针对每个入口打包一个 只含有 runtime 的额外 chunk。
2. `singer`：会创建一个在所有生成 chunk 之间共享的运行时文件。此设置是如下设置的别名：
```javascript
module.exports = {
  //...
  optimization: {
    // runtimeChunk: true,
    runtimeChunk: {
      name: 'runtime',
    },
  },
};
```
#### 设置生成 chunkId 的算法 
由上面图可知，默认情况下`splitChunks`中分包的`[name]`是模块相对于项目根目录的路径。这是比较长的，如果是多个模块分包到一个文件的话，`[name]`还会是多个路径拼接在一起。
我们可以通过`optimization.chunkIds`来设置 chunk 的`[name]`/`[id]`生成的算法。``
`optimization.chunkIds`在`mode:development`下的默认值为`named`；在`mode: 'production'`下的默认值为`deterministic`；其他情况则是`natural`
![image.png](/webpack/1688462135052-2613bc06-3ed8-4d30-8639-5dae0a615452.png)
![image.png](/webpack/1688461974614-deb212a6-d09a-4064-b30f-80807b7c653c.png)
`natural` => 一旦修改任何代码，新增引入、取消引入包时，即使其他的包未出现任何变化，也是会重新计算chunkId，重新打包。而`deterministic`则针对相同内容只会生成一个确定的id
