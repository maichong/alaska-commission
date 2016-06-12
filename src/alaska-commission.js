/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-19
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class CommissionService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-commission';
    super(options, alaska);
  }

  postLoadConfig() {
    const MAIN = this.alaska.main;
    MAIN.applyConfig({
      '+appMiddlewares': [{
        id: __dirname + '/middlewares/promoter.js',
        sort: 0,
        options: {
          queryKey: this.config('queryKey'),
          cookieOptions: this.config('cookieOptions')
        }
      }]
    });
  }
}
