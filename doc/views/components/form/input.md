## SomInput 输入框

### 代码演示

::: demo form input
基础用法
:::

### API

#### Input Props
| 参数          | 说明                           | 类型              | 可选值                      | 默认值 |
| ------------- | ------------------------------ | ----------------- | --------------------------- | ------ |
| modelValue    |                                |                   |                             |        |
| type          | input类型                      |                   |                             |        |
| showWordLimit | type=textarea 是否展示字数数量 | boolean           |                             | false  |
| placeholder   | 占位符                         | string            |                             |        |
| clearable     | 是否展示清空的icon             | boolean           |                             |        |
| showPassword  | 是否展示显示密码的icon         | boolean           |                             |        |
| disabled      | 禁止                           | boolean           |                             |        |
| autosize      | type=textarea 响应式高度       | boolean \| Object |                             |        |
| validateEvent | 表单输入是否触发校验           | boolean           |                             | false  |
| theme         | 主题                           | InputTheme        | 'light' \| 'dark' \| 'none' | none   |
| prefixIcon    |                                |                   |                             |        |
| suffixIcon    |                                |                   |                             |        |
| debounce      | 输入延迟触发input              | number            |                             |        |
| [attrs]       | 表单原生属性 如maxlength       |                   |                             |        |


#### Input Methods
| 方法名 | 说明      | 参数 |
| ------ | --------- | ---- |
| focus  | input聚焦 |      |
| blur   | input失焦 |      |
| select | input选择 |      |


#### Input Events
| 事件名称 | 说明 | 回调参数     |
| -------- | ---- | ------------ |
| input    |      | value, Event |
| change   |      | value, Event |
| blur     |      | Event        |
| focus    |      | Event        |
| enter    |      | value, Event |


#### Input Slots
| name   | 说明 |
| ------ | ---- |
| prefix |      |
| suffix |      |


#### Input 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |