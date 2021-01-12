const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app){
  app.use(
    createProxyMiddleware("/dev",{
      target: 'http://62.234.90.11:3300',
      changeOrigin:true,
      pathRewrite:{
        '^/dev': '/'
      }
    })
  )
}
