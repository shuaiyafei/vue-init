exports.renderPage = async (ctx, next) => {
  console.log(ctx);
  const data = {
    title: 'spa'
  };
  await ctx.render('spa', data);
};