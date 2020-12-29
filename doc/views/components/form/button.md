## SomButton 按钮

### 代码演示

::: demo form button
基础用法
:::

### API

#### SomButton
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 按钮主题类型 | string | primary/success/warning/link/assist | primary |
| size | 按钮尺寸 | string | normal(44)/medium(32)/small(24) | normal |
| mode | 按钮类型 | string | normal/plain/border/link | normal |
| border | 按钮圆角类型 | string | half/large/medium/small/mini/string？ | half |
| inline | 按钮宽度是否自动 | boolean | true/false | false |
| disabled | 是否不可编辑 | boolean | true/false | false |
| icon | 按钮图标 | string | — | — |
| action-type | button的type属性 | string | submit/button/reset | - |
| delay-time | 点击之后延迟禁点 | number | — | — |
| loading | 设置按钮为加载中状态 | boolean | — | false |


#### SomButton Events
| 方法名 | 说明 |
| --- | --- |
| click | 按钮点击事件 |


#### SomButton slot
| 参数 | 说明 |
| --- | --- |
| default | 按钮文字 |

#### SomButtonGroup
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| flex-rank | 两个按钮时的 flex 比例 | string | two/three | — |


### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
