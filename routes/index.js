module.exports = (router) => {
  router.get('/', async (ctx, next) => {
    // ctx.body = 'Hello World'
    ctx.state = {
      title: 'Koa2'
    }
    await ctx.render('login', ctx.state)
  })
}
