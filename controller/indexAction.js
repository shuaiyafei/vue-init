exports.renderPage = async (ctx, next) => {
  ctx.state.title = 'index';
  const data = {
    title: 'index'
  };
  await ctx.render('index', data);
};