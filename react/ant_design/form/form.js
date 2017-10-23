/*
 * @Author: accord
 * @Date:   2017-10-22 19:19:53
 * @Last Modified by:   accord
 * @Last Modified time: 2017-10-22 21:38:17
 */

import React from 'react';
import { Form } from 'antd';
import { createFieldDecorator } from './utils';

const FormItem = Form.Item;

/**
 *
 * @param fields  输入框基本配置
 * @param init    input初始值
 * @param form    form属性
 * @param layout  formItem布局
 * @param event   input事件
 * @param others  others
 * @returns {XML}
 * @constructor
 */
const Bform = ({ fields, init, form, layout = {}, event = {}, ...others }) => {
  return (
    <Form layout="horizontal" {...others}>
      {fields.map(field =>
        (<FormItem
          key={field.key}
          label={field.name}
          hasFeedback={field.hasFeedback === false ? field.hasFeedback : true}
          {...layout}
        >
          {createFieldDecorator(field, init, form.getFieldDecorator, field.placeholder, event[field.key])}
        </FormItem>)
      )}
    </Form>
  );
};

export default Bform;