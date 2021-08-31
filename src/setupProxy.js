const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app){
  app.use(
    createProxyMiddleware("/dev",{
      target: 'http://112.124.56.117:3300',
      changeOrigin:true,
      pathRewrite:{
        '^/dev': '/'
      }
    })
  )
}
