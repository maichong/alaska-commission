/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-20
 * @author Liang <liang@maichong.it>
 */

export default function (Income) {
  for (let option in Income.fields.type.options) {
    if (option.value === 'commission') return;
  }
  Income.fields.type.options.push({
    label: 'Commission',
    value: 'commission'
  });
}
