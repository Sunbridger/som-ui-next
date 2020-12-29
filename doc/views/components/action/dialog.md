## SomDialog 弹窗

### 代码演示

::: demo action dialog
基础用法
:::

### API
### SomDialog Prop

| 参数               | 说明                                   | 类型          | 可选值         | 默认值          |
| ------------------ | -------------------------------------- | ------------- | -------------- | --------------- |
| show               | 弹窗是否可见，使用 `v-model:show` 绑定 | boolean       | —              | false           |
| mask-transition    | 遮罩层动画                             | string        | —              | som-mask        |
| transition  | 弹窗动画                               | string        | —              | som-dialog-fade |
| hide-on-blur       | 是否在点击遮罩时自动关闭弹窗           | boolean       | —              | false           |
| mask-z-index       | 遮罩层 z-index 值                      | number/string | —              | 1000            |
| width              | 宽度                                   | string        |                | 80%             |
| height             | 高度                                   | string        |                | 96vw           |
| lock-scroll        | 阻止背景滚动                           | boolean       |                | true            |
| is-cancle          | 是否显示关闭按钮                       | boolean       | —              | true            |
| close-btn-position | 关闭按钮位置                           | boolean       | inside/outside | outside         |
| close-icon         | 关闭按钮图标                           | string        |                | close           |
| custom-style    | 弹窗样式            | object  | —                     | —       |


<br />

### SomDialog Slot

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 弹窗的主体内容 |


<br />

### SomDialog event

| 事件名   | 说明           |
| -------- | -------------- |
| show  | 弹窗可见时触发 |
| hide  | 弹窗关闭时触发 |
| close | 关闭按钮事件   |
| click-mask   | 点击蒙层    |        |


<br />

### SomDialog 样式变量

| 名称                                  | 默认值                | 说明               |
| ------------------------------------- | --------------------- | ------------------ |
| --dialog-bg                           | #FFF                  | 弹窗背景色         |
| --dialog-border-radius                | --border-radius-large | 弹窗圆角值         |
| --dialog-close-button-width           | 32px                  | 关闭按钮尺寸       |
| --dialog-close-button-outside-padding | 12px                  | 外部关闭按钮的边距 |
| --dialog-close-button-inside-padding  | 8px                   | 内部关闭按钮的边距 |




### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
