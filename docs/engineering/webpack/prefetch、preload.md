webpack 中提供了在使用`import()`时便捷使用`prefetch`、`preload`的魔法注释。
> 参考：[https://www.webpackjs.com/guides/code-splitting/#prefetchingpreloading-modules](https://www.webpackjs.com/guides/code-splitting/#prefetchingpreloading-modules)

```javascript
// prefetch
import(/* webpackPrefetch: true */ 'xxx')

// preload
import(/* webpackPreload: true */ 'xxx')
```
### 认识prefetch，preload
webpack 中 prefetch、preload 的底层都是借助`<link>`对应的选项来完成的。
```javascript
<link rel='prefetch' href='xxx.js'>

<link rel='preload' href='xxx.css' as='style'>
```
#### prefetch
> 参考：[https://developer.mozilla.org/zh-CN/docs/Glossary/Prefetch](https://developer.mozilla.org/zh-CN/docs/Glossary/Prefetch)

prefetch 是 利用**浏览器空闲时间**来下载用户在不久的将来可能访问的文档。网页向浏览器**提供一组预期提示**，并在浏览器_**完成当前页面的加载后（渲染完成之后）**_开始静默的下载并缓存指定的文档。当用户访问这些预期文档时，可以快速的从浏览器缓存中得到。
**浏览器会在空闲时间进行资源预加载时，如果空闲时间不足或预加载操作完成后，就应该立即停止加载操作，以避免影响用户的操作和网络请求。**
prefetch 的目标资源加载优先级为`lowest`最低，这表示它会在其他网络/资源请求加载之后才会开始。
资源正在预载时，用户点击了某个链接的话，预取将会被推迟到下载结束。
需要注意的是，prefetch 仅仅只会下载并缓存目标资源，**并不会执行**。
#### preload
> 参考：[https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)

preload 用户告诉浏览器在 页面生命周期的早期、浏览器的主要渲染机制启动之前开始加载。（立即加载资源）。
简单来说，通过 preload 显示声明一个高优先级资源，强制浏览器提前请求资源，同时不阻塞文档正常 onload 。
通常用于字体样式闪烁问题。具体参见参考第二条。
> **需要注意：**`**font**`**资源 和 **`**fetch**`**预加载需要设置**`**crossorigin**`**属性，否则资源会加载两次。**


### 总结

- `prefetch`、`preload`都只是下载资源，并适当的缓存。并不会执行资源中的代码。
- `prefetch`、`preload`不会阻塞页面的 onload
- `preload` 仅适用于当前页面渲染必不可少的依赖的资源，且其请求时机存在问题。`prefetch`则是声明将来需要用到的资源。
- `prefetch`、`preload`的缓存机制：

![image.png](/webpack/1688538422871-0d54f95a-da92-45b8-a740-3f5e6562bd2b.png)
### 参考

- [https://juejin.cn/post/6844903562070196237](https://juejin.cn/post/6844903562070196237)
- [https://juejin.cn/post/6893681741240909832](https://juejin.cn/post/6893681741240909832)

