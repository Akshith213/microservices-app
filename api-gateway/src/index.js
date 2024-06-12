const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// User Service Proxy
app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

// Product Service Proxy
app.use('/api/products', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

const PORT = 3000;

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
