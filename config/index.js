"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {},
    // proxyTable: {
    //   "/api": {
    //     target: "http://47.102.142.203:8089/", // 跨域地址
    //     changeOrigin: true, //允许跨域
    //     secure: false, // 是否使用 https
    //     pathRewrite: {
    //       "^/api": "http://47.102.142.203:8089/",
    //     },
    //   },
    // },
    // proxyTable: {
    //   // 这里配置 '/api' 就等价于 target , 你在链接里访问 /api === http://localhost:54321
    //   "/api": {
    //     target: "http://localhost:8089/", // 真是服务器的接口地址 // http://localhost:54321/json.data.json,
    //     secure: false, // 如果是 https ,需要开启这个选项
    //     changeOrigin: true, // 是否是跨域请求?肯定是啊,不跨域就没有必要配置这个proxyTable了.
    //     pathRewirte: {
    //       //   // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.
    //
    //       "/^api": "",
    //       // 等价于
    //       // step 1  /api = http://localhost:54321/
    //       // step 2 /^api = /api + api == http://localhost:54321/api
    //     },
    //   },
    // },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by
    port: 8989, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
