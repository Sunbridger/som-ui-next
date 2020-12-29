## SomSearchbar 搜索框

### 代码演示

<!-- ::: demo form searchbar
基础用法
::: -->

### API

#### Searchbar Props
| 参数        | 说明                   | 类型         | 可选值        | 默认值              |
| ----------- | ---------------------- | ------------ | ------------- | ------------------- |
| modelValue  |                        |              |               |                     |
| isCancel    | 是否可以取消           | boolean      |               | false               |
| cancelText  | 取消文案               | string       |               | 取消                |
| theme       | 主题                   | string       | [dark, light] | dark                |
| autoFixed   | 搜索置顶               | boolean      |               | false               |
| top         | 距离顶部位置           | string       |               | 0                   |
| result      | 结果列表               | ReulstItem[] |               |                     |
| preset      | 默认搜索页面的数据     | PresetItem[] |               |                     |
| noResultMsg | 无结果的提示信息       | string       |               | 抱歉， 暂无相关信息 |
| inputStyle  | input 框样式自定义     | object       |               |                     |
| formStyle   | 搜索框 form 样式自定义 |              |               |                     |
| clearable   | 是否可清空输入框       | boolean      |               | true                |
| prefixIcon  |                        |              |               |                     |
| suffixIcon  |                        |              |               |                     |
| debounce    | 输入事件触发延迟时间   | number       |               | 100                 |
| loading     | 是否在loading中        | boolean      |               | false               |
```ts
export interface PresetItem {
    title: string;
    list: {
        key: string;
        [key: string]: any;
    }
}

export interface ReulstItem {
    key: string;
    [key: string]: any;
}
```

#### Form Methods
| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| focus  |      |      |
| blur   |      |      |


#### Searchbar Events
| 事件名称          | 说明                     | 回调参数 |
| ----------------- | ------------------------ | -------- |
|                   |                          |          |
| update:modelValue |                          |          |
| submit            | 点击搜索                 |          |
| cancel            | 点击 取消 按钮时触发 —   |          |
| input             | 输入文字变化时触发 value |          |
| result-click      | 点击结果条目时触发 item  |          |
| focus             | 输入框获取到焦点时触发 — |          |
| blur              |                          |          |
| preset-click      |                          |          |

#### Searchbar Slots
| name     | 说明 | 参数 |
| -------- | ---- | ---- |
| left     |      |      |
| right    |      |      |
| prefix   |      |      |
| suffix   |      |      |
| result   |      |      |
| noResult |      |      |
| preset   |      |      |


#### Searchbar 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |
