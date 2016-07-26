/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-19
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
import alaska from 'alaska';
import service from '../';
import BALANCE from 'alaska-balance';
import User from 'alaska-user/models/User';
import Commission from '../models/Commission';

export default class Create extends alaska.Sled {
  /**
   * amount 或 price/rate 必选,如果未指定rate,则必须指定level并设置全局commissionRates
   * @param {Object} data
   *                 data.title     标题
   *                 data.user      用户
   *                 [data.contributor] 贡献者
   *                 [data.order]   关联订单
   *                 [data.main]    主佣金
   *                 [data.currency]佣金货币
   *                 [data.amount]  佣金数量
   *                 [data.price]   价格
   *                 [data.rate]    比例
   *                 [data.level]   等级
   *                 ...
   * @returns {Commission}
   */
  async exec(data) {
    if (!data.user) throw new Error('user required when create commission');

    const commissionRates = service.config('commissionRates');
    const currencies = BALANCE.currenciesMap;
    const defaultCurrency = BALANCE.defaultCurrency;

    data.level = data.level || 1;
    if (!data.currency && data.order && data.order.currency) {
      data.currency = data.order.currency;
    }
    if (!data.title && data.order && data.order.title) {
      data.title = data.order.title;
    }
    if (!data.contributor && data.order && data.order.user) {
      data.contributor = data.order.user;
    }
    if (!data.amount && data.amount !== 0) {
      if (!data.price) throw new Error('amount or price is required when create commission');
      let rate = data.rate;
      if (!rate) {
        rate = commissionRates[data.level - 1];
      }
      if (!rate) throw new Error('can not determine commission rate');
      let currency = defaultCurrency;
      if (data.currency && currencies[data.currency]) {
        currency = currencies[data.currency];
      }
      data.amount = _.round(rate * data.price, currency.precision);
    }
    let commission = new Commission(data);

    await commission.save();

    if (commissionRates.length > data.level && data.price) {
      //创建多级佣金
      let user = data.user;
      if (!user.save) {
        //如果不是模型记录
        user = await User.findCache(user);
      }
      if (user && user.promoter) {
        //用户有上级
        Create.run(Object.assign({}, data, {
          user: user.promoter,
          level: data.level + 1,
          amount: null,
          rate: null,
          main: data.main || commission._id
        }));
      }
    }
    return commission;
  }
}
