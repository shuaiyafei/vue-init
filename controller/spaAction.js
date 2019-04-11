exports.renderPage = async (ctx, next) => {
  ctx.state = {
    title: 'spa'
  };
  await ctx.render('spa', ctx.state);
};