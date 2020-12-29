## SomPopup 弹出框

### 代码演示

::: demo action popup
基础用法
:::

### API

### Popup  Prop

| 参数           | 说明                                                         | 类型    | 可选值                | 默认值  |
| -------------- | ------------------------------------------------------------ | ------- | --------------------- | ------- |
| show           | 是否关闭，使用 `v-model:show` 绑定                           | boolean | —                     | —       |
| mode           | 弹出层模式                                                   | string  | defalut/content       | defalut |
| hide-on-blur   | 点击遮罩时是否自动关闭                                       | boolean | —                     | true    |
| is-transparent | 是否为透明背景                                               | boolean | —                     | false   |
| width          | 设置 100% 宽度必须使用该属性。在 position 为 left 或者 right 时有效。 | string  | —                     | auto    |
| height         | 高度，设置 `100%` 为整屏高度。当 position 为 top 或者 bottom 时有效。 | string  | —                     | auto    |
| max-height     | 最大高度           | string  | -                     | -       |
| position       | 位置               | string  | left/right/top/bottom | bottom  |
| show-mask      | 是否显示遮罩        | boolean | —                     | true    |
| mask-class     | 遮罩的类名  	       | string  | —                     | —       |
| mask-z-index   | 指定 z-index	      | number  | —                     | —       |
| custom-style    | 弹窗样式            | object  | —                     | —       |
| lock-scroll    | 是否锁定背景滚动     | boolean | —                     | true    |
| closeable      | 是否显示关闭按钮     | boolean | —                     | false   |
| title          | 标题               | string  | —                     | —       |
| mask-transition   | 蒙层动画         | string  | —                     | som-mask |
| transition   | 弹窗动画       | string  | —                     | som-popup-animate  |
| border-radius   | 圆角	          | string  | —                     |  |


<a name="YFP3H"></a>

### Popup Slot

| name    | description          |
| ------- | -------------------- |
| default | 底部弹出框的主体内容 |



<a name="WLXey"></a>

### Popup Events

| 事件名        | 说明                                                   | 返回值 |
| ------------- | ------------------------------------------------------ | ------ |
| hide       | 关闭时触发                                             | —      |
| show       | 显示时触发                                             | —      |
| close      | 关闭按钮                                               |        |
| click-mask    | 点击蒙层                                               |        |
| first-show | 第一次显示时触发，可以在该事件回调里初始化数据或者界面 | —      |

<a name="8a6485ec"></a>
### 
<a name="PYaJA"></a>

### Popup 样式变量

| 名称                         | 默认值                 | 说明               |
| ---------------------------- | ---------------------- | ------------------ |
| --popup-border-radius        | --border-radius-large  | 弹出层圆角         |
| --popup-bg                   | #FFF                   | 背景色             |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
