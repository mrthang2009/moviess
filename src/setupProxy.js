import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/player',
    createProxyMiddleware({
      target: 'https://player.phimapi.com',
      changeOrigin: true,
    })
  );
}
