/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-13
 * @author Liang <liang@maichong.it>
 */

module.exports = function (options) {
  let queryKey = options.queryKey || 'p';
  let cookieOptions = options.cookieOptions;
  return function promoterMiddleware(ctx, next) {
    let promoter = ctx.query[queryKey];
    if (promoter) {
      ctx.cookies.set('promoter', promoter, cookieOptions);
    }
    return next();
  };
};
