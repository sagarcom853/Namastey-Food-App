// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the API routes you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000', // Specify the URL of your backend server
      changeOrigin: true,
    })
  );
};
