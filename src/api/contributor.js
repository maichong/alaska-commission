/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-13
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
const User = service.model('user.User');

export default async function (ctx) {
  let user = ctx.user || service.error(403);

  ctx.body = await User.paginate({
    page: parseInt(ctx.state.page || ctx.query.page) || 1,
    perPage: parseInt(ctx.query.perPage || ctx.query.perPage) || 10,
    filters: _.assign({}, {
      promoter: user._id
    }, ctx.state.filters)
  });

  ctx.body.results = _.map(ctx.body.results, user => user.data(ctx.state.scope || 'tiny'));
}
