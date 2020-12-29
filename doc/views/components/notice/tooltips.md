## SomTooltips 提示气泡

### 代码演示

::: demo notice tooltips
基础用法
:::

### Tips

提供Tooltips组件和TooltipsItem组件，TooltipsItem只包裹了一层样式

### API

### Tooltips Prop

| 参数         | 说明                                            | 类型    | 可选值                                                       | 默认值 |
| ------------ | ----------------------------------------------- | ------- | ------------------------------------------------------------ | ------ |
| show         | 是否显示，用 v-model 绑定                       | boolean | —                                                            | false  |
| effect       | 主题颜色                                        | string  | light/dark/active                                            | dark   |
| placement    | tips 的出现位置                                 | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/right | bottom |
| gutter       | 箭头和触发元素之间的距离                        | string  | —                                                            | 6px    |
| hide-on-blur | 点击外部是否关闭                                | boolean | —                                                            | false  |
| is-trigger   | 触发元素是否设置开关                            | boolean | —                                                            | true   |
| title        | 标题                                            | string  | —                                                            | —      |
| content      | 内容                                            | string  | —                                                            | —      |
| closable     | 是否显示关闭按钮                                | boolean |                                                              | false  |
| tips-class   | 气泡的样式类， 通过添加类名，可以自定义气泡样式 | —       | —                                                            |        |

### Tooltips Slot

| 事件名     | 说明             |
| ---------- | ---------------- |
| default    | 触发元素         |
| title      | 弹窗标题插槽     |
| content    | 内容插槽         |

### Tooltips-item Slot

| 事件名  | 说明 |
| ------- | ---- |
| default | 内容 |

### Tooltips Events

| 事件名           | 说明           | 返回值 |
| ---------------- | -------------- | ------ |
| show          | 提示弹出时触发 | —      |
| hide          | 提示隐藏时触发 | —      |
| click-content | 点击事件       | ~~—~~  |

### Tooltips-item Events

| 事件名           | 说明           | 返回值 |
| ---------------- | -------------- | ------ |
| click-item | 点击事件       |  |


### Tooltips 样式变量

| 名称                             | 默认值                 | 说明                         |
| -------------------------------- | ---------------------- | ---------------------------- |
| --tooltips-title-fs              | --font-size-title      | 标题字号                     |
| --tooltips-title-fw              | --font-weight-semibold | 标题字重                     |
| --tooltips-content-fs            | --font-size-content    | 内容字号                     |
| --tooltips-content-fw            | --font-weight-regular  | 内容字重                     |
| --tooltips-max-width             | 228px                  | 最大宽度，不算关闭按钮的情况 |
| --tooltips-border-radius         | --border-radius-mini   | 圆角                         |
| --tooltips-close-size            | 13px                   | 关闭按钮大小                 |
| --tooltips-dark-color             | #fff                  | 暗色系列字色 					|
| --tooltips-dark-bg         		| #000   				| 暗色系列背景色     			|	
| --tooltips-dark-border-color      ｜  #000                | 暗色系列边框色     			|
| --tooltips-light-color             | var(--text-title)    | 亮色系列字色 					|
| --tooltips-light-bg         		| #fff 			    	| 亮色系列背景色     			|	
| --tooltips-light-border-color      ｜  var(--stroke)       | 亮色系列边框色     			|
| --tooltips-light-color             | var(--text-title)    | 激活色系列字色 			|
| --tooltips-light-bg         		| var(--background-notice)| 激活色系列背景色     			|	
| --tooltips-light-border-color      ｜   #ffc61a    			| 激活色系列边框色     			|

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
