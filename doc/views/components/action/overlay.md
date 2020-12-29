## SomOverlay 遮罩层

### 代码演示

::: demo action overlay
基础用法
:::

### API

#### SomOverlay
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| show | 是否显示，用 v-model:show 绑定 | boolean | — | false |
| zIndex | 层级 | string，Number | — | 500 |
| maskStyle | 蒙层style | Object | — | — |
| lockScroll | 背景滚动关闭 | Boolean | — | true |
| isTransparent | 背景是否透明 | boolean | — | false |
| maskTransition | 蒙层动画 | string | — | som-mask |

#### SomOverlay Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| --- | --- | --- |
| --mask-opacity | .5 | 透明度 |
| --mask-time | 400ms | 动画时间 |


### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
