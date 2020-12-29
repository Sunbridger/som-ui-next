## SomList 列表

### 代码演示

::: demo dataDisplay list
基础用法
:::

### API

#### List Props
| 参数               | 说明                                     | 类型                   | 可选值                        | 默认值 |
| ------------------ | ---------------------------------------- | ---------------------- | ----------------------------- | ------ |
| labelWidth         | 表单域标签的的宽度，例如 '50px'          | string                 |                               |        |
| labelAlign         | 标签左右对齐方式                         | ListAlign              | 'left' \| 'center' \| 'right' | left   |
| labelAlignVertical | 标签上下对齐方式                         | ListLabelAlignVertical |                               |        |
| labelLeftIconAlign | leftIcon垂直定位                         | ListLabelLeftIconAlign |                               |        |
| labelMarginRight   | 标签与右侧内容的间距（默认值跟着主题走） |                        |                               |        |
| align              | 内容左右对齐方式                         | ListAlign              |                               |        |
| isEllipsis         | 内容超出省略                             | boolean                |                               |        |
| borderIndent       | 分割线样式                               | ListBorderIndent       |                               |        |
| itemClass          | item元素添加class类名                    | string                 |                               |        |


#### List Slots
| name    | 说明     |
| ------- | -------- |
| default | 默认插槽 |


#### List 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |


### API

#### ListItem Props
| 参数               | 说明                                     | 类型                   | 可选值                              | 默认值 |
| ------------------ | ---------------------------------------- | ---------------------- | ----------------------------------- | ------ |
| labelWidth         | 表单域标签的的宽度，例如 '50px'          | string                 |                                     |        |
| labelAlign         | 标签左右对齐方式                         | ListAlign              | 'left' \| 'center' \| 'right'       | left   |
| labelAlignVertical | 标签上下对齐方式                         | ListLabelAlignVertical |                                     |        |
| labelLeftIconAlign | leftIcon垂直定位                         | ListLabelLeftIconAlign |                                     |        |
| labelMarginRight   | 标签与右侧内容的间距（默认值跟着主题走） |                        |                                     |        |
| align              | 内容左右对齐方式                         | ListAlign              |                                     |        |
| isEllipsis         | 内容超出省略                             | boolean                |                                     |        |
| itemClass          | item元素添加class类名                    | string                 |                                     |        |
| label              | 标签文本                                 | string                 |                                     |        |
| labelLeftIcon      | 标签左侧icon                             | string                 |                                     |        |
| labelRightIcon     | 标签右侧icon                             | string                 |                                     |        |
| rightIcon          | item右侧icon                             | string                 |                                     |        |
| inlineDesc         | 副标题描述                               | string                 |                                     |        |
| isLink             | 是否展示右侧箭头                         | boolean                |                                     |        |
| arrowDirection     | 箭头方向                                 | ListItemArrowDirection | 'right' \| 'down' \| 'left' \| 'up' |        |
| content            | 元素内容                                 | string                 |                                     |        |




#### ListItem Slots
| name           | 说明           |
| -------------- | -------------- |
| inlineDesc     | 副标题描述     |
| label          | 标签           |
| labelLeftIcon  | 标签左侧icon   |
| labelRightIcon | 标签右侧icon   |
| rightIcon      | item右侧icon   |
| default        | item内容       |
| desc           | item内容的描述 |
| bottom         | item底部内容   |


#### ListItem 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |