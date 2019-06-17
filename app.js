const Koa = require('koa');
const Router = require('koa-router');
const {
  exec
} = require('child_process');
const app = new Koa();
const router = new Router();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const path = require('path');
const ejs = require('ejs');
const routes = require('./routes');
const static = require('koa-static');
const HASH = require('./utils/getHash');
const getIp = require('./utils/getIp');
const port = process.env.PORT;

// error handler
onerror(app);
// middlewares
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(static(__dirname + '/public'));
app.use(views(__dirname + '/views', {
  map: {
    html: 'ejs'
  }
}));
app.use(async (ctx, next) => {
  if (HASH) {
    Object.assign(ctx.state, {
      HASH
    });
  }
  await next();
});
if (process.env.NODE_ENV === 'dev') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('koa-webpack-dev-middleware');
  const webpackHotMiddleware = require('koa-webpack-hot-middleware');
  const webpackDevConfig = require('./webpack/webpack.dev.config');

  const compiler = webpack(webpackDevConfig);
  // 定义热更新静态文件
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    quiet: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 2000,
  }));
}

if (process.env.NODE_ENV === 'prd') {
  const webpack = require('webpack');
//   const webpackPrdConfig = require('./webpack/webpack.prd.config');
  const command = 'webpack --config webpack/webpack.prd.config.js';
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行出错: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

app.use(router.routes());
app.use(router.allowedMethods());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - $ms`);
});

routes(router);
app.on('error', function (err, ctx) {
  console.log(err);
  logger.error('server error', err, ctx);
});

module.exports = app.listen(port, () => {
  const ip = getIp();
  console.log(`Listening on http://${ip}:${port}`);
});
