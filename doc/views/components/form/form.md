## SomForm 表单

### 代码演示

::: demo form form
基础用法
:::

### API

#### Form Props
| 参数                 | 说明                                                                            | 类型                   | 可选值                               | 默认值 |
| -------------------- | ------------------------------------------------------------------------------- | ---------------------- | ------------------------------------ | ------ |
| model                | 表单数据                                                                        | Object                 |                                      |        |
| rules                | 表单校验规则 [参考async-validator](https://github.com/yiminghe/async-validator) | string                 |                                      |        |
| validateFirst        | 是否第一个错误后停止校验                                                        | boolean                |                                      | true   |
| scrollToError        | 定位到首个报错的位置                                                            | boolean                |                                      | false  |
| hideRequiredAsterisk | 是否隐藏必填的星号提示                                                          | boolean                |                                      | false  |
| validateOnRuleChange | 校验规则改变的时候触发校验                                                      | boolean                |                                      | true   |
| validateTrigger      | 触发校验的时机                                                                  | FormValidateTrigger    | 'submit' \| 'blur' \| 'change' \| '' | submit |
| disabled             | 是否禁止                                                                        | boolean                |                                      | false  |
| ifError              | 是否在底部提示报错信息                                                          | boolean                |                                      | false  |
| errorClass           | 给错误的FormItem添加类名                                                        | string                 |                                      |        |
| labelWidth           | 表单域标签的的宽度，例如 '50px'                                                 | string                 |                                      |        |
| labelAlign           | 标签左右对齐方式                                                                | ListAlign              | 'left' \| 'center' \| 'right'        | left   |
| labelMarginRight     | 标签与右侧内容的间距（默认值跟着主题走）                                        |                        |                                      |        |
| labelAlignVertical   | 标签上下对齐方式                                                                | ListLabelAlignVertical |                                      |        |
| align                | 内容左右对齐方式                                                                | ListAlign              |                                      |        |
| borderIndent         | 分割线样式                                                                      | ListBorderIndent       |                                      |        |
| itemClass            | item元素添加class类名                                                           | string                 |                                      |        |


#### Form Methods
| 方法名        | 说明                                                                    | 参数                                                                            |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| submit        | 触发校验(只对submit触发器的规则校验(rule规则中的trigger为空或者submit)) | () => void                                                                      |
| validate      | 触发校验                                                                | `(cb, trigger: ItemOrArray<FormValidateTrigger>) => Promise<any[]>`              |
| validateField | 触发指定字段进行校验                                                    | `(ps: string[], cb, trigger: ItemOrArray<FormValidateTrigger>) => Promise<any[]>` |
| resetFields   | 校验结果重置                                                            | `() => void`                                                                      |


#### Form Events
| 事件名称 | 说明                                                               | 回调参数                         |
| -------- | ------------------------------------------------------------------ | -------------------------------- |
| submit   | 通过调用submit方法触发的回调（button `action-type=submit` 可触发） | 校验失败返回错误原因，成功则为空 |


#### Form Slots
| name    | 说明 |
| ------- | ---- |
| default |      |
| bottom  | 底部 |


#### Form 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |



### API

#### FormItem Props
| 参数                 | 说明                                                                         | 类型                   | 可选值                               | 默认值 |
| -------------------- | ---------------------------------------------------------------------------- | ---------------------- | ------------------------------------ | ------ |
| labelWidth           | 表单域标签的的宽度，例如 '50px'                                              | string                 |                                      |        |
| labelAlign           | 标签左右对齐方式                                                             | ListAlign              | 'left' \| 'center' \| 'right'        | left   |
| labelAlignVertical   | 标签上下对齐方式                                                             | ListLabelAlignVertical |                                      |        |
| labelMarginRight     | 标签与右侧内容的间距（默认值跟着主题走）                                     |                        |                                      |        |
| align                | 内容左右对齐方式                                                             | ListAlign              |                                      |        |
| itemClass            | item元素添加class类名                                                        | string                 |                                      |        |
| label                | 标签文本                                                                     | string                 |                                      |        |
| labelLeftIcon        | 标签左侧icon                                                                 | string                 |                                      |        |
| labelRightIcon       | 标签右侧icon                                                                 | string                 |                                      |        |
| rightIcon            | item右侧icon                                                                 | string                 |                                      |        |
| inlineDesc           | 副标题描述                                                                   | string                 |                                      |        |
| isLink               | 是否展示右侧箭头                                                             | boolean                |                                      |        |
| content              | 元素内容                                                                     | string                 |                                      |        |
| ifError              | 是否在底部提示报错信息                                                       | boolean                |                                      | false  |
| errorClass           | 给错误的FormItem添加类名                                                     | string                 |                                      |        |
| validateTrigger      | 触发校验的时机                                                               | FormValidateTrigger    | 'submit' \| 'blur' \| 'change' \| '' | submit |
| prop                 | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string                 |                                      |        |
| hideRequiredAsterisk | 是否隐藏必填的星号提示                                                       | boolean                |                                      | false  |
| required             | 是否必填                                                                     | boolean                |                                      | false  |
| rules                | 校验规则                                                                     |                        |                                      |        |
| error                | 是否处于错误状态                                                             | boolean                |                                      | false  |
| errorMessage         | 错误提示信息                                                                 | string                 |                                      |        |






#### FormItem Methods
| 方法名        | 说明                                   | 参数                                                                      |
| ------------- | -------------------------------------- | ------------------------------------------------------------------------- |
| validate      | 表单元素校验                           | `(cb: Function, trigger: ItemOrArray<FormValidateTrigger>) => Promise<any>` |
| resetFiled    | 校验重置                               | `() => void`                                                               |
| onFieldChange | 触发change校验（一般表单元素内部调用） | `() => void`                                                                |
| onFieldBlur   | 触发blur校验（一般表单元素内部调用）   | `() => void`                                                                |




#### FormItem Slots
| name           | 说明 |
| -------------- | ---- |
| default        |      |
| label          |      |
| error          |      |
| labelLeftIcon  |      |
| labelRightIcon |      |
| rightIcon      |      |


#### FormItem 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |
