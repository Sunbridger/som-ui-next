## SomNoticeBar 通告栏

### 代码演示

::: demo action notice-bar
基础用法
:::

### API

#### SomNoticeBar
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 提示类型 | string | info/warn/success | info |
| mode | 组件模式 | string | ~~default~~/~~marquee~~/link/~~button~~ | -- |
| closable | 是否显示可关闭 | boolean | false/true | false |
| marquee | marquee 参数 | object | — | `{loop: false, leading: 500, trailing: 800, fps: 40}` |
| half-radius | 是否半圆角 | boolean | false/true | true |
| — | — | — | — | — |

#### NoticeBar Slot
| 插槽名 | 说明 |
| --- | --- |
| icon | 左侧图标区，比prop中的icon属性优先级更高 |
| action | 右侧操作区插槽 |

#### NoticeBar event
| 事件名 | 说明 |
| --- | --- |
| click | 整个noticeBar的点击事件 |
| close | 点击关闭按钮时的事件 |
| doAction | 操作区域的点击事件 |

#### NoticeBar 样式变量
| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --notice-bar-fs | --font-size-desc-b | 字号 |
| --notice-bar-fw | --font-weight-regular | 字重 |
| --notice-bar-mrl | 16px | 与页面间的左右间距 |
| --notice-bar-line-height | 1.5 | 行间距 |
| --notice-bar-border-radius | --border-radius-large | 圆角值 |
| ~~--notice-bar-mq-border-radius~~ | ~~--border-radius-half~~ | ~~跑马灯模式圆角值~~ |
| --notice-bar-padding-x | .padding-x-12 | 左右边距 |
| --notice-bar-padding-y | .padding-x-12 | 上下边距 |
| --notice-bar-info-color | --primary | info风格下的字体颜色 |
| --notice-bar-warn-color | --text-title | warn风格下的字体颜色**设计稿暂时未给出，暂时使用老的** |
| --notice-bar-success-color | --success | success风格下的字体颜色**设计稿暂时未给出，暂时使用老的** |
| --notice-bar-info-bg | #FEF2F2 | info风格下的背景颜色 |
| --notice-bar-warn-bg | --warning | warn风格下的背景颜色**设计稿暂时未给出，暂时使用老的** |
| --notice-bar-success-bg | --success-light-bg | success风格下的背景颜色**设计稿暂时未给出，暂时使用老的** |
| --notice-bar-text-atction-pd | 16px | 右侧action插槽和文本的间距 |
| --notice-bar-text-icon-pd | 4px | 左侧icon插槽和文本的间距 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 鲁雅莉 |
| 设计师 | 池琪琪 |
