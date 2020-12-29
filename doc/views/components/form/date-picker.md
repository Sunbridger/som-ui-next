<!--
 * @Author: your name
 * @Date: 2020-11-25 13:35:54
 * @LastEditTime: 2020-11-25 18:06:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /som-ui-next/doc/views/components/form/date-picker.md
-->
## SomDatePicker 日期选择器

### 代码演示

::: demo form date-picker
基础用法
:::

### API

#### SomDatePicker
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 顶部栏标题  | string | — | '' |
| confirm-text | 确定按钮文字  | string | — | 确定 |
| cancel-text | 取消  | string | — | 取消 |
| show-toolbar | 是否显示顶部栏  | boolean | — | true |
| item-height | 选项的高度  | string | — | 44 |
| visible-item-count | 可见的选项个数	  | number | — | 5 |
| swipe-duration | 快速滑动时惯性滚动的时长，单位 ms  | nnumber | — | 1000 |
| min-date | 最小时间  | date | — | 十年前的1月1日 |
| max-date | 最大时间  | date | — | 十年后的12月31日 |
| type | 时间类型，可选值为 year,year-month,date,month-date-time  | string | — | date |

#### SomPicker Events

| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-confirm | 点击完成按钮时触发 | value (选中列对应的时间) |
| on-cancel | 点击取消按钮时触发 | value  |
| on-change | 选项改变时触发 | value  |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
