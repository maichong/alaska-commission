/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-19
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import BALANCE from 'alaska-balance';

export default class Commission extends alaska.Model {

  static label = 'Commission';
  static icon = 'money';
  static title = 'title';
  static defaultColumns = 'title user contributor order amount level state createdAt balancedAt';
  static defaultSort = '-createdAt';

  static api = {
    list: 3
  };

  static populations = {
    contributor: {
      select: '@tiny'
    }
  };

  static actions = {
    balance: {
      title: 'Balance now',
      style: 'success',
      sled: 'Balance',
      depends: {
        state: 0
      }
    }
  };

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    user: {
      label: 'User',
      ref: 'alaska-user.User',
      index: true
    },
    contributor: {
      label: 'Contributor',
      ref: 'alaska-user.User'
    },
    order: {
      label: 'Order',
      ref: 'alaska-order.Order',
      optional: true
    },
    main: {
      label: 'Main Commission',
      ref: 'Commission',
      private: true
    },
    level: {
      label: 'Level',
      type: Number
    },
    currency: {
      label: 'Currency',
      type: 'select',
      options: BALANCE.currencies,
      default: BALANCE.defaultCurrency.value
    },
    amount: {
      label: 'Amount',
      type: Number,
      default: 0
    },
    state: {
      label: 'State',
      type: 'select',
      number: true,
      default: 0,
      options: [{
        label: 'Unbalanced',
        value: 0
      }, {
        label: 'Balanced',
        value: 1
      }, {
        label: 'Invalid',
        value: -1
      }]
    },
    error: {
      label: 'Error',
      type: String
    },
    createdAt: {
      label: 'Created At',
      type: Date
    },
    balancedAt: {
      label: 'Balanced At',
      type: Date
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
