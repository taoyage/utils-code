/*
* @Author: accord
* @Date:   2017-10-22 19:43:41
* @Last Modified by:   accord
* @Last Modified time: 2017-10-22 21:02:36
*/

import React from 'react';
import { Form } from 'antd';
import { createFieldDecorator } from './utils';

const FormItem = Form.Item;
const FORM_ITEM_KEYS = ['label', 'labelCol', 'wrapperCol', 'help', 'extra', 'required', 'validateStatus', 'hasFeedback', 'colon'];
const DECORATOR_KEYS = ['trigger', 'valuePropName', 'getValueFromEvent', 'validateTrigger', 'exclusive'];

/**
 * 通过定义好的keys去查询obj中是否有匹配key的值,将匹配到的值复制到新的对象中并返回
 * @param obj
 * @param keys
 */
const pick = (obj, keys) => {
  return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    .reduce((res, o) => Object.assign(res, o), {});
};

/**
 * 拷贝
 * @param dest
 * @param source
 * @returns {*}
 */
const extend = (dest = {}, source = {}) => {
  const result = Object.assign({}, dest);
  for (const key in source) {
    if (source.hasOwnProperty(key) && source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  return result;
};

const BformItem = (props) => {
  /**
   * 获取props中属于formItem的属性
   */
  let formItemProps = pick(props, FORM_ITEM_KEYS);
  /**
   * 获取props中属于decoratorOpts的属性
   */
  const decoratorOpts = pick(props, DECORATOR_KEYS);

  /**
   * 获取input中的属性
   */
  let { inputProps } = props;

  let { label, help, hasFeedback } = formItemProps;
  const { form, field, init, rules, initialValue, placeholder, onChange } = props;
  const { key, name } = field;

  label = label === undefined ? name : label;
  help = help === undefined ? field.help : help;

  if (field.hasFeedback === false || hasFeedback === false) {
    hasFeedback = false;
  } else {
    hasFeedback = true;
  }

  const dataItem = init || { [key]: initialValue };

  const fieldItem = extend(field, { rules });
  formItemProps = extend(formItemProps, { label, help, hasFeedback, key });
  inputProps = extend(inputProps, { onChange });

  return (
    <FormItem {...formItemProps}>
      {createFieldDecorator(fieldItem, dataItem, form.getFieldDecorator, placeholder, inputProps, decoratorOpts)}
    </FormItem>
  );

};

export default BformItem;