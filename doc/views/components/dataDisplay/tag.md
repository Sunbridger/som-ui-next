## SomTag 标签

### 代码演示

::: demo dataDisplay tag
基础用法
:::

### API

#### SomTag
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 备注 |
| --- | --- | --- | --- | --- | --- |
| type | 类型 | primary/selected/disable | -- | primary |  |
| ~~border~~ | ~~是否有border~~ | ~~boolean~~ | ~~--~~ | ~~false~~ |  |
| size | 尺寸 | string | nomal/medium/small/mini/smini | -- |  |
| filled | 背景是否填充 | boolean | true/false | true |  |
| bg-color | 背景色 | string | -- | -- |  |
| color | 字体颜色 | boolean | true/false | false |  |
| border-color | 边框背景色 | string | -- | -- |  |
| half-radius | 是否半圆角 | boolean | true/false | false |  |
| closable | 是否可关闭 | boolean | true/false | false |  |
| closeIconSize| 关闭icon的尺寸 |  string/number| -- | 12 |  |

#### SomTag Events
| 参数 | 说明 | 备注 |
| --- | --- | --- |
| on-close | 点击关闭事件 |  |

#### SomTag slot
| 参数 | 说明 | 备注 |
| --- | --- | --- |
| icon| tag左侧icon插槽 |  |
| close| tag右侧关闭icon的插槽 |  |


#### SomTagGroup
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| rank | 标签之间的间距 | string | -- | -- |
| cloumn | 组合模式下对应的列数 | string | three/four/nomal | nomal |
|  |  |  |  |  |

#### 样式变量(som-tag)
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| --tag-nomal-height | 标准标签的高度 | 36px |
| --tag-nomal-fs | 标准标签的字体大小 | 12px |
| --tag-nomal-padding | 标准标签的左右两边间距 | 16px |
|  |  |  |
| --tag-middle-height | 中等标签的尺寸 | 28px |
| --tag-middle-fs | 中等标签的字体大小 | 12px |
| --tag-middle-padding | 中等标签的左右两边间距 | 12px |
|  |  |  |
| --tag-small-height | 小标签的尺寸 | 24px |
| --tag-small-fs |  | 12px |
| --tag-small-padding |  | 8px |
|  |  |  |
| --tag-mini-height | 迷你标签的尺寸 | 16px |
| --tag-mini-fs |  | 10px |
| --tag-mini-padding |  | 8px |
|  |  |  |
| --tag-smini-height | 超迷你尺寸 | 15px |
| --tag-smini-fs |  | 10px |
| --tag-smini-padding |  | 4px |
|  |  |  |
| --tag-selected-color | 选中类型的字体颜色 | #FF571A |
| --tag-selected-bg | 选中类型的背景色 | #FFEEE8 |
| --tag-selected-border-color | 选中类型的边框色 | #FF571A |
|  |  |  |
| --tag-disable-color | disable类型的字体颜色 | #AFB2BA |
| --tag-disable-bg | disable类型的背景色 | #F7F8FA |
|  |  |  |
| --tag-primary-color | primary类型的字体颜色 | #1A1D33 |
| --tag-primary-bg | primary类型的背景色 | #F7F8FA |
|  |  |  |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 鲁雅莉 |
| 设计师 | 池琪琪 |
