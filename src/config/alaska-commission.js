/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-19
 * @author Liang <liang@maichong.it>
 */

export default {
  prefix: '/commission',
  middlewares: false,
  controllers: false,
  services: [{
    id: 'alaska-user',
    alias: 'user'
  }, {
    id: 'alaska-balance',
    alias: 'balance'
  }],
  //佣金比例设置,例如 [ 0.2, 0.05 ] 则给一级提佣20%,给二级提佣5%
  commissionRates: [],
  //promoter参数Key
  queryKey: 'p',
  //promoter Cookie选项
  cookieOptions: {
    maxAge: 7 * 86400 * 1000
  }
};
