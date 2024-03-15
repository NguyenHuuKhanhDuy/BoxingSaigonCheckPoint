const { createProxyMiddleware } = require('http-proxy-middleware');
const tokenProxy = {
    target: 'https://id.kiotviet.vn',
    changeOrigin: true
}

const apiProxy = {
    target: 'https://id.kiotviet.vn',
    changeOrigin: true
}

module.exports = function(app) {
  app.use(
    '/connect/token',
    createProxyMiddleware(tokenProxy)
  );
  app.use(
    "/customer",
    createProxyMiddleware(apiProxy)
  );
};