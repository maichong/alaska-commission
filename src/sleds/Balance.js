/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-19
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
import alaska from 'alaska';
import User from 'alaska-user/models/User';
import BALANCE from 'alaska-balance';

export default class Balance extends alaska.Sled {

  /**
   * @param data
   *        data.commission
   *        [data.user]
   */
  async exec(data) {
    let user = data.user;
    let commission = data.commission;

    if (commission.state) {
      return commission.toObject();
    }

    try {
      if (!user) {
        user = await User.findCache(commission.user);
      }

      if (!user) {
        throw new Error('can not find user');
      }

      let currency = BALANCE.currenciesMap[commission.currency];
      if (!currency) {
        throw new Error('can not find currency');
      }

      if (!User.fields[commission.currency]) {
        throw new Error(`can not find User.${commission.currency} field`);
      }

      await user._[commission.currency].income(commission.amount, commission.title, 'commission');

      commission.state = 1;
      commission.balancedAt = new Date;
    } catch (error) {
      commission.state = -1;
      commission.error = error.message;
    }
    await commission.save();
    return commission.toObject();
  }
}
