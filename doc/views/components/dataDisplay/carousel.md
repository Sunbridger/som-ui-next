## SomCarousel 走马灯

### 代码演示

::: demo dataDisplay carousel
基础用法
:::

### API

#### SomCarousel
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| list | 图片列表 | array | — | — |
| show-dots | 是否显示指示点 | boolean | -- | true |
| dots-position | 指示点位置 | string | left/rightn/center | center |
| dots-class | 指示点calss name | string | -- | -- |
| auto | 是否自动轮播 | boolean | -- | false |
| loop | 是否循环播放 | boolean | -- | false |
| interval | 轮播停留时长 | number | -- | 3000 |
| duration | 切换动画时间 | number | — | 300 |
| height | 高度 | string | — | 180px |
| value | index绑定，可以初始化显示的index | number | — | 0 |

#### SomCarousel Slot
| 参数      | 说明          |
|---------- |-------------- |
| default | carouse-item 内容插槽 |

#### SomCarousel Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-index-change | 轮播index变化时触发 | currentIndex |
| on-click-item | 点击时触发 | index |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
