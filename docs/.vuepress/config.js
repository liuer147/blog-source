module.exports = {
  title: '五元八角的博客',
  description: '五元八角的博客',
  base: '/blog/',
  theme: 'reco',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    subSidebar: 'auto',
    // sidebar: 'auto',
    nav: [
      // { text: '首页', link: '/' },
      { text: 'TypeScript', link: '/typescript/基础类型.md' },
      { text: '前端工程化', link: '/engineering/webpack/Webpack安装.md' },
    ],
    sidebar: {
      '/typescript/': [
        { title: '基础类型', path: '基础类型.md' },
        { title: '复合类型 和 类型断言', path: '复合类型 和 类型断言.md' },
        { title: '类型缩小', path: '类型缩小.md' },
        { title: '函数类型', path: '函数类型.md' },
        { title: '一个特殊现象', path: '一个特殊现象.md' },
        { title: '类', path: '类.md' },
        { title: '泛型', path: '泛型.md' },
        { title: '接口类型interface 与 索引签名', path: '接口类型interface 与 索引签名.md' },
        { title: '条件类型 与 类型分发', path: '条件类型 与 类型分发.md' },
        { title: '条件类型推断 infer', path: '条件类型推断 infer.md' },
        { title: '类型兼容：逆变与协变', path: '类型兼容：逆变与协变.md' },
        { title: '映射类型', path: '映射类型.md' },
        { title: '数组方面的类型体操', path: '数组方面的类型体操.md' }
      ],
      '/engineering/': [
        {
          title: 'Webpack',
          children: [
            { title: 'Webpack安装', path: 'webpack/Webpack安装.md' },
            { title: 'webpack的几个概念', path: 'webpack/webpack的几个概念.md' },
            { title: '资源模块', path: 'webpack/资源模块.md' },
            { title: '监听打包 与 静态服务', path: 'webpack/监听打包 与 静态服务.md' },
            { title: '打包后的模块分析', path: 'webpack/打包后的模块分析.md' },
            { title: 'source-map', path: 'webpack/source-map.md' },
            { title: 'webpack 代码分离', path: 'webpack/webpack 代码分离.md' }, 
            { title: 'prefetch、preload', path: 'webpack/prefetch、preload.md' },
            { title: 'CDN', path: 'webpack/CDN.md' },
            { title: '代码压缩', path: 'webpack/代码压缩.md' },
            { title: '性能分析工具', path: 'webpack/性能分析工具.md' },
            { title: '常见解决方案', path: 'webpack/常见解决方案.md' }, 
            { title: 'hash、contenthash、chunkhash', path: 'webpack/hash、contenthash、chunkhash.md' },
          ]
        }
      ]
    }
  }
}