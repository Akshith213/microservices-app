const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api/users', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
}));

// Setup proxy for other services in a similar manner
// app.use('/api/products', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
// app.use('/api/cart', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});
