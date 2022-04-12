// svgo.config.js
/**
 * SVG文件，通常包含大量的无用信息，例如编辑器源信息，注释，因此元素，
 * 默认或者非最优值，以及其他一些不会影响渲染结果的可以移除或转换的内容
 * 此配置文件中删除了(fill|fill-rule) 属性
 * 详情见 https://github.com/svg/svgo
 *
 * 新加入svg文件后，只需要在项目终端中执行npm run svgo
 *
 */
module.exports = {
  plugins: [
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|fill-rule)",
      },
    },
  ],
};
