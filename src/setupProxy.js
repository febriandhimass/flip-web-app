const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    proxy('/frontend-test', {
      target: `${process.env.REACT_APP_FLIP_API}`,
      changeOrigin: true,
    }),
  );
};
