## 基于antd design中form组件以及formItem的封装

### form组件

由于antd中的form书写方式过于繁琐,使大量使用到表单的项目,大大降低了代码的可维护性,为了简化form相关代码,从而进行了进一步的封装
使其支持配置的形式进行表单的自动生成。另外该配置写法将可以与antd中的table共用

### 代码演示

```javascript
import React from 'react';
import { Form, Button } from 'antd';
import { Bform } from 'form';

const fields = [{
  key: 'name',
  name: '名称',
  required: true,
  placeholder: false,
  hasFeedback: false
}, {
  key: 'gender',
  name: '性别',
  enums: {
    MALE: '男',
    FEMALE: '女'
  }
}, {
  key: 'birthday',
  name: '生日',
  type: 'date'
}, {
  key: 'desc',
  name: '自我介绍',
  type: 'textarea'
}, {
  key: 'number',
  name: 'number',
  type: 'number',
  meta: {
    min: 0
  }
}];

const formBuilder = ({
                    form: {
                      getFieldDecorator,
                      validateFields,
                      getFieldsValue
                    }
                  }) => {

  const handelChange = () => {
    console.log('handelChange');
  };

  const formProps = {
    fields,
    init: {
      gender: 'FEMALE',
      birthday: '20010103',
      desc: 'desc'
    },
    event: {
      gender: {
        onChange: handelChange
      }
    },
    form: { getFieldDecorator },
    layout: {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }
  };

  const handeleSubmit = () => {
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue()
      };
    });
  };
  return (
    <div>
      <Button onClick={handeleSubmit} type="primary">提交</Button>
      <Bform {...formProps} />
    </div>
  );
};

export default Form.create()(formBuilder);
```

## Form API

fields

| 属性      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| key  | 字段key(唯一) | string | - |
| name | 字段名称 |	label标签的文本 | string | - |
| type | 输入框类型,支持:(date,datetime,datetimeRange,enum,number,textarea,text) | string | text |
| meta | 输入框额外配置属性,暂只支持min,max,step,row | object | - |
| enums| select输入框可选的值 | object | - | 
| required | 是否必填 | 
|hasFeedback|

