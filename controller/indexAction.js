exports.renderPage = async (ctx, next) => {
  ctx.state = {
    title: 'index'
  };
  await ctx.render('index', ctx.state);
};