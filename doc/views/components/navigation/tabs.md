## SomTabs tabs选项卡

### 代码演示

::: demo navigation tabs
基础用法
:::

### API

#### SomTabs
| 参数             | 说明                      | 类型     | 可选值 | 默认值 |
| ---------------- | ------------------------- | -------- | ------ | ------ |
| vertical         | 是否垂直模式              | boolean  | --     | false  |
| active-color     | 选中时文字颜色            | string   | --     | --     |
| default-color    | 默认文字颜色              | string   | --     | --     |
| disabled-color   | 不可点击时文字颜色        | string   | --     | --     |
| line-color       | 设置底部line颜色          | string   |        |        |
| has-line         | 有线条                    | boolean  | --     | true   |
| scrollspy        | 支持滚动                  | boolean  |        | false  |
| is-same-away     | tab 之间是否相同间距      | boolean  | --     | false  |
| animate          | 切换时是否需要动画        | boolean  | --     | true   |
| prevent-default  | 是否禁止自动切换 tab-item | boolean  | --     | false  |
| custom-bar-width | 自定义bar宽度，参数index  | Function | --     |        |
#### som-tab-item props 属性
| 参数         | 说明               | 类型    | 可选值 | 默认值 |
| :----------- | :----------------- | :------ | :----- | :----- |
| disabled     | 是否不可选         | boolean | —      | false  |
| active-class | 当前项选中时的样式 | string  | —      | —      |

#### SomTabs Events
| 事件名                 | 说明                               | 返回值          |
| :--------------------- | :--------------------------------- | :-------------- |
| on-before-index-change | 下标切换之前, 配合禁止自动切换使用 | ( index )       |
| on-index-change        | 当前标签卡改变时触发               | ( val, oldVal ) |
#### SomTab Events

| 事件名        | 说明                      | 返回值    |
| :------------ | :------------------------ | :-------- |
| on-item-click | 当前 tabItem 被点击时触发 | ( index ) |

#### SomTab 插槽

| 事件名  | 说明     | props              |
| :------ | :------- | :----------------- |
| extend  | 拓展插槽 | ( index，isActive) |
| default | 默认插槽 | ( index，isActive) |

#### 样式变量

| 变量名                    | 说明                | 默认值    |
| ------------------------- | ------------------- | --------- |
| --tab-fs                  | tab字体大小         | 14px      |
| --tab-color               | tab字体颜色         | #8D8E99   |
| --tab-selected-color      | tab选中字体颜色     | #000      |
| --tab-selected-line-color | tab选中底部line颜色 | --primary |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
