## SomScrollRefresh 滚动刷新

### 代码演示

::: demo dataDisplay scroll-refresh
基础用法
:::

### 概述


下拉刷新一般隐藏于导航栏下，下拉整个页面时出现, 刷新作用于整个页面，当前页面所有数据重新加载
底部加载，底部上滑时出现加载动画，用于加载更多数据


### 差异
插槽扩展增加loosing、loading、success、pulling状态插槽




### ScrollRefresh
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| offset-h | 下拉触发 pullDown 方法的阈值，即距离顶部的滚动距离，超过该距离时，手指离开触摸屏则下拉刷新，单位为 px | number | -- | 72 |
| bottom-distance | 上拉触发 pullUp 方法的阈值，即剩余滚动内容的长度，单位为px | number | — | 50 |
| max-pull-down | 下拉的最大距离， 达到之后不能继续往下拉 | number | — | 120 |
| pull-down | 下拉刷新pullDown方法默认参数为一个对象e，对象中含有一个方法refreshed(),当刷新完成时需调用e.refreshed()通知组件回到初始状态 | function | — | — |
| pull-up | 上拉加载方法，默认参数对对象e,含有两个方法：loaded() 与 completed(), 当页数据加载完成时，调用 e.loaded(),spinner 不再显示；所有数据加载完成时，调用 e.completed(), pullUp 方法不会再触发 | function | — | — |
| show-back-top | 是否允许显示返回顶部按钮（超出两屏时显示出来） | boolean | — | false |
| prevent-default | 是否`阻止`初始化自动调用下拉刷新方法 | boolean | — | false |
| disabled | 是否阻止下拉加载方法 | boolean | — | false |
| successPullDownText | 成功时的文案 | string |  | 下拉刷新成功 |
| pullingPullDownText | 下拉刷新下拉 | string |  | 下拉刷新 |
| loosingPullDownText | 下拉刷新释放 | string |  | 松开刷新 |
| loadingPullDownText | 下拉刷新 | string |  | 正在刷新 |
| loadingPullUpText | 上拉加载 | string |  | 正在加载 |
| noMoreText | 没有更多 | string |  | 没有更多了～ |



### ScrollRefresh Slot
| name | 说明 |
| --- | --- |
| pulling-pull-down | 下拉过程中顶部内容 |
| pull-down-loosing | 释放过程中顶部内容 |
| pull-down-loading | 加载过程中顶部内容 |
| pull-down-success | 刷新成功提示内容 |
| pull-up-loading | 加载过程中底部内容 |
| pull-up-no-more | 上拉加载完成，无更多数据时的提示区域 |
| spinner | loading区域icon |
| no-more | 上拉加载完成，无更多数据时的提示区域，默认为空 |



### ScrollRefresh Methods
| event | 说明 |
| --- | --- |
| pullDown(e) | 下拉刷新pullDown方法默认参数为一个对象e，对象中含有一个方法refreshed(),当刷新完成时需调用e.refreshed()通知组件回到初始状态 |
| pullUp(e) | 上拉加载方法，默认参数对对象e,含有两个方法：loaded() 与 completed(), 当页数据加载完成时，调用 e.loaded(),spinner 不再显示；所有数据加载完成时，调用 e.completed(), pullUp 方法不会再触发 |



### ScrollRefresh Event
| 事件名 | 说明 | 使用方法 |
| --- | --- | --- |
| resetLoadMore | 当上拉条件改变时，父组件通知子组件更新 | ref.resetLoadMore() |



### ScrollRefresh样式变量



| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --scroll-refresh-icon-size | 16px | icon大小 |
| --scroll-refresh-font-size | 12px | 字体大小 |
| --scroll-refresh-down-icon-size | 18px | 上拉加载时icon大小 |
| --scroll-refresh-down-font-size | 14px | 上拉加载时字体大小 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
