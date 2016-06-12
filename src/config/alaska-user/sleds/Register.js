/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-19
 * @author Liang <liang@maichong.it>
 */

const User = service.model('User');

export async function pre() {
  let ctx = this.data.ctx;
  let user = this.data.user;
  if (this.data.promoter || !ctx || (user && user.promoter)) return;
  let promoter = ctx.cookies.get('promoter');
  if (!promoter && !service.util.isObjectId(promoter)) return;
  promoter = await User.findCache(promoter);
  if (promoter) {
    this.data.promoter = promoter._id;
    if (user) {
      user.promoter = promoter._id;
    }
  }
}
