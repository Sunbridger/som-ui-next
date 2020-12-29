## SomSteps 步骤条

### 代码演示

::: demo dataDisplay steps
基础用法
:::

### 改动点：

Steps：

1. 添加active属性，控制当前步骤，优先级低于item的status
2. active-color属性，组件内部全局激活状态的颜色
3. 事件click-step，点击事件

Step：

1. 添加description、icon属性，描述、图标
2. status属性，取代之前的is-done、is-active
### API
### Common Props，step节点的配置优先

| 参数           | 说明                 | 类型        | 可选值 | 默认值 |
| -------------- | -------------------- | ----------- | ------ | ------ |
| title-length   | 节点标题一行最大字数 | number      | —      | 4      |
| item-width     | 设置每项节点宽度     | string      | —      | 60px   |
| active-color   | 节点的激活的颜色     | string      | —      | —      |
| inactive-color | 节点的未激活的颜色   | string      | —      | —      |

### Steps

| 参数      | 说明                       | 类型    | 可选值              | 默认值     |
| --------- | -------------------------- | ------- | ------------------- | ---------- |
| active    | 当前步骤，step的status优先 | number  |                     | 0          |
| direction | step 方向                  | string  | horizontal/vertical | horizontal |
| flexable  | 节点是否平均分配宽度       | boolean | —                   | false      |

### Step

| 参数   | 说明             | 类型        | 可选值                         | 默认值 |
| ------ | ---------------- | ----------- | ------------------------------ | ------ |
| title  | 节点标题         | string/slot | —                              | —      |
| status | 节点状态是否完成 | string      | 'wait'/'active'/'done'/'error' | active |

### Step Slot

| 名称          | 说明             |
| ------------- | ---------------- |
| default       | 节点标题         |
| active-icon   | 节点icon,同steps |
| inactive-icon |                  |
| done-icon     |                  |

### Steps Events

| 参数       | 说明         | 参数       | 返回值 |
| ---------- | ------------ | ---------- | ------ |
| click-step | 节点点击事件 | active key | —      |

### Steps 样式变量

| 名称                          | 默认值                | 说明     |
| ----------------------------- | --------------------- | -------- |
| --step-icon-size     | 23px                  |    |
| --step-content-size  | 12px                  |          |
| --step-inactive-content-color | #666                  |          |
| --step-inactive-content-fw    | --font-weight-regular |          |
| --step-active-content-color   | #000                  |          |
| --step-active-content-fw      | --font-weight-medium  |          |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
