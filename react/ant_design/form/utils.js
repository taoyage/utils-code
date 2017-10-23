/*
* @Author: accord
* @Date:   2017-10-22 19:26:24
* @Last Modified by:   accord
* @Last Modified time: 2017-10-22 20:31:48
*/

import React from 'react';
import moment from 'moment';
import { DatePicker, Select, Input, InputNumber } from 'antd';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * 表单字段类型
 * @type date: (function({initialValue?: *, inputProps: *}))
 * @type datetime: (function({initialValue?: *, inputProps: *}))
 * @type datetimeRange: (function({inputProps: *}))
 * @type enum: (function({field: *, placeholder?: *, inputProps: *}))
 * @type number: (function({meta?: *, inputProps: *}))
 * @type textarea: (function({meta?: *, field: *, placeholder?: *, inputProps: *}))
 * @type text: (function({meta?: *, field: *, placeholder?: *, inputProps: *}))}}
 */
const fieldTypes = {
  /**
   * DatePicker 默认格式
   * @param initialValue   初始值
   * @param inputProps     额外属性
   * @returns {{input: XML, initialValue: (*|moment.Moment)}}
   */
  date: ({ initialValue, inputProps }) => {
    return {
      input: <DatePicker {...inputProps} />,
      initialValue: initialValue && moment(initialValue, dateFormat)
    };
  },
  /**
   * DatePicker YYYY-MM-DD HH:mm:ss格式
   * @param initialValue  初始值
   * @param inputProps    额外属性
   * @returns {{input: XML, initialValue: (*|moment.Moment)}}
   */
  datetime: ({ initialValue, inputProps }) => {
    return {
      input: <DatePicker showTime format={dateTimeFormat} {...inputProps} />,
      initialValue: initialValue && moment(initialValue, dateTimeFormat)
    };
  },
  /**
   * RangePicker
   * @param inputProps  额外属性
   * @returns {XML}
   */
  datetimeRange: ({ inputProps }) => {
    return <RangePicker showTime format={dateFormat} {...inputProps} />;
  },
  /**
   * select
   * @param field         字段
   * @param placeholder
   * @param inputProps    额外值
   * @returns {XML}
   */
  enum: ({ field, placeholder, inputProps }) => {
    const enumsArray = Object.keys(field.enums).reduce((arr, key) => {
      arr.push({
        key,
        value: field.enums[key]
      });
      return arr;
    }, []);
    placeholder = placeholder === false ? '' : (placeholder || `请选择${field.name}`);
    return (
      <Select placeholder={placeholder} {...inputProps} >
        {enumsArray.map(item => <Option key={item.key}>{item.value}</Option>)}
      </Select>
    );
  },
  /**
   * number
   * @param   meta  {min,max,step}   最小值,最大值,每次改变步数
   * @param inputProps
   * @returns {XML}
   */
  number: ({ meta = {}, inputProps }) => {
    return <InputNumber min={meta.min} max={meta.max} step={meta.step || 1} {...inputProps} />;
  },
  /**
   * input type="textarea"
   * @param meta    {placeholder,autosize}   xxx , 自适应内容高度(不懂请看蚂蚁框架介绍)
   * @param field
   * @param placeholder
   * @param inputProps
   * @returns {XML}
   */
  textarea: ({ meta = {}, field, placeholder, inputProps }) => {
    placeholder = placeholder === false ? '' : (placeholder || meta.placeholder || `请输入${field.name}`);
    return <Input type="textarea" placeholder={placeholder} autosize={meta.autosize} {...inputProps} />;
  },
  /**
   * input type="text"
   * @param meta
   * @param field
   * @param placeholder
   * @param inputProps
   * @returns {XML}
   */
  text: ({ meta = {}, field, placeholder, inputProps }) => {
    placeholder = placeholder === false ? '' : (placeholder || meta.placeholder || `请输入${field.name}`);
    return <Input type="text" placeholder={placeholder} {...inputProps} />;
  }
};

/**
 *
 * @param field    表单控件字段数组,详细可配置属性如下:
 * key: 唯一键值,
 * name: input名称,
 * type:输入框类型(text=>input, textarea=>textarea, number=>inputNumber, )
 * enums(select输入框,),
 * meta,required,
 * rules}
 * 
 * @param init     初始化
 * @param getFieldDecorator 详细看antd
 * @param placeholder
 * @param inputProps  事件
 * @param decoratorOpts
 */
export const createFieldDecorator = (field, init = {}, getFieldDecorator, placeholder, inputProps = {}, decoratorOpts = {}) => {
  let { type, rules } = field;
  const { key, enums, meta, required } = field;
  type = (fieldTypes[type] && type) || (enums && 'enum') || 'text';

  const itemTyped = fieldTypes[type]({ initialValue: init[key], meta, field, placeholder, inputProps });

  let { input, initialValue } = itemTyped;

  if (React.isValidElement(itemTyped)) {
    input = itemTyped;
    initialValue = init[key];
  }

  if (required && !rules) {
    rules = [{
      required: true,
      message: `请输入${field.name}`
    }];
  }

  return getFieldDecorator(key, { initialValue, rules, inputProps, ...decoratorOpts })(input);
};

/**
 * 扩展fieldTypes
 * @param extras
 */
export const extendFieldsType = (extras) => {
  Object.assign(fieldTypes, extras);
};

/**
 * 转换field数据结构为map,使用formItem时使用
 * @param originFields
 * @returns {*}
 */
export const getFields = (originFields) => {
  const chain = {};
  const fields = [...originFields];

  const toMapValues = () => {
    return fields.reduce((map, field) => {
      map[field.key] = field;
      return map;
    }, {});
  };

  return Object.assign(chain, {
    toMapValues
  });
};