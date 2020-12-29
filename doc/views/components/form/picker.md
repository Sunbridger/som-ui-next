<!--
 * @Author: your name
 * @Date: 2020-11-25 13:35:54
 * @LastEditTime: 2020-11-25 15:19:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /som-ui-next/doc/views/components/form/picker.md
-->

## SomPicker 选择器

### 代码演示

::: demo form picker
基础用法
:::

### API

#### SomPicker

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| columns | 对象数组，选择项数据  | Array | — | [] |
| title | 顶部栏标题  | string | — | '' |
| value-key | 选项展示文字对应的key  | string | — | text |
| confirm-text | 确定按钮文字  | string | — | 确定 |
| cancel-text | 取消  | string | — | 取消 |
| show-toolbar | 是否显示顶部栏  | boolean | — | true |
| item-height | 选项的高度  | string | — | 44 |
| visible-item-count | 可见的选项个数	  | number | — | 5 |
| swipe-duration | 快速滑动时惯性滚动的时长，单位 ms  | nnumber | — | 1000 |

#### SomPicker Events

| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-confirm | 点击完成按钮时触发 | value, index (选中列对应的 index, 下同) |
| on-cancel | 点击取消按钮时触发 | value, index  |
| on-change | 选项改变时触发 | value, index  |

#### SomPicker Method

| 事件名      | 说明          |    参数  | 返回值                      |
|---------- |-------------- |--------- |  -----------------------  |
| getValues | 获取所有列选中的值，返回一个数组 | - | values|
| setValues | 设置所有列选中的值 | values | - |
| getIndexes | 获取所有列选中值对应的索引 | indexes | - |
| setIndexes | 设置所有列选中值对应的索引 | - | indexes|
| getColumnValue | 获取对应列选中的值 | columnIndex | value|
| setColumnValue | 设置对应列选中的值 | columnIndex, value | - |
| getColumnIndex | 获取对应列选中项的索引 | columnIndex | optionIndex|
| setColumnIndex | 设置对应列选中项的索引 | columnIndex, optionIndex | - |
| getColumnValues | 获取对应列中所有选项 | columnIndex | values|
| setColumnValues | 设置对应列中所有选项 | columnIndex, values | - |

#### SomPicker Slot

| name | 说明 | 参数 |
| default | 顶部栏 | - |

#### SomPicker 样式变量

| 名称                                | 默认值                | 说明                      |
| ----------------------------------- | --------------------- | ------------------------- |
| --picker-text-fs                   | 24px     | 选项字号                 |
| --picker-text-fw                  | 600   | 选项字重 |
| --picker-text-color                 | #00000 | 选项颜色                 |
| --picker-height                  | 303px           | 弹框高度                 |

### 贡献者

| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
