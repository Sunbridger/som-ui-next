## SomCheckbox 复选框

### 代码演示

<!-- ::: demo form checkbox
基础用法
::: -->

### API

#### Checkbox Props
| 参数        | 说明                     | 类型                      | 可选值                   | 默认值     |
| ----------- | ------------------------ | ------------------------- | ------------------------ | ---------- |
| modelValue  |                          |                           |                          |            |
| disabled    | 禁用                     | boolean                   |                          | false      |
| mode        | 样式的模式               | string                    | [button, icon]           | button     |
| direction   | type=button 的布局方式   | string                    | [vertical, horizontal]   | horizontal |
| inlineStyle | type=icon 的内置样式     | string                    | [style1, style2, style3] | style1     |
| inlineDesc  | 副标题描述               | string                    |                          |            |
| value       | 绑定的值                 | [Number, String, Boolean] |                          |            |
| trueValue   | 单个checkbox选定的值     | [Number, String, Boolean] |                          | true       |
| falseValue  | 单个checkbox没有选定的值 | [Number, String, Boolean] |                          | false      |



#### Checkbox Slots
| name        | 说明                | 参数                                                           |
| ----------- | ------------------- | -------------------------------------------------------------- |
| icon        |                     | Info: { checked, key, value, disabled } key当options传参时存在 |
| checkedIcon | 选中的标签          | Info                                                           |
| default     | 标签的key           | Info                                                           |
| inlineDesc  | mode=icon副标题描述 | Info                                                           |
| fullItem    | 整个Checkbox的插槽  | Info                                                           |


#### Checkbox 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |

### API

#### CheckboxGroup Props
| 参数         | 说明                   | 类型                      | 可选值                             | 默认值     |
| ------------ | ---------------------- | ------------------------- | ---------------------------------- | ---------- |
| modelValue   |                        | [Number, String, Boolean] |                                    |            |
| disabled     | 禁用                   | boolean                   |                                    | false      |
| mode         | 样式的模式             | string                    | [button, icon]                     | button     |
| direction    | type=button 的布局方式 | string                    | [vertical, horizontal]             | horizontal |
| inlineStyle  | type=icon 的内置样式   | string                    | [style1, style2, style3]           | style1     |
| options      | 对象传参生成复选框     | string[]                  | { icon, key, value, inlineDesc }[] |            |  |
| borderIndent | 分割线对齐方式         | string                    | [left, both, none]                 | left       |




#### CheckboxGroup Slots
| name        | 说明               | 参数                                                           |
| ----------- | ------------------ | -------------------------------------------------------------- |
| icon        |                    | Info: { checked, key, value, disabled } key当options传参时存在 |
| checkedIcon | 选中的标签         | Info                                                           |
| default     |                    |                                                                |
| fullItem    | 整个Checkbox的插槽 | Info                                                           |
| itemKey     | Checkbox标签的插槽 | Info                                                           |


#### CheckboxGroup 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |
