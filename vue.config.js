module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: true,
    },
  },
  
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  transpileDependencies: ["quasar"],
  devServer: {
    port: 8081, 
    host: "localhost", 
    https: false, 
    open: true, 
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        ws: true, 
        changeOrigin: true, 
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
  lintOnSave: false, 
  productionSourceMap: false, 
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '檔案交換系統'
      return args
    })
  },
};
