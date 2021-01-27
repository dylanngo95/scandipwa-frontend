const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(['/graphql', '/media'], createProxyMiddleware({
    target: require('package.json').proxy,
    changeOrigin: true
}));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);