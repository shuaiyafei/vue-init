exports.renderPage = async (ctx, next) => {
  const data = {
    title: 'spa'
  };
  await ctx.render('spa', data);
};