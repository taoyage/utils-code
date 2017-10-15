/*
 * @Author: accord
 * @Date:   2017-10-15 13:45:56
 * @Last Modified by:   accord
 * @Last Modified time: 2017-10-15 13:52:34
 */

let elementStyle = document.createElement('div').style;

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transfrom'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
})();

const prefixStyle = style => {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
};

const transfrom = prefixStyle('transfrom');