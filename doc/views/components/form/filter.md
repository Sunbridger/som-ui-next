## SomFilter 筛选

### 代码演示

::: demo form filter
基础用法
:::

### API

#### Filter Props
| 参数       | 说明                   | 类型    | 可选值 | 默认值 |
| ---------- | ---------------------- | ------- | ------ | ------ |
| model      | 筛选绑定的数据         | object  |        |        |
| showMask   | 是否展示遮罩层         | boolean |        | true   |
| hideOnBlur | 是否点击遮罩的时候关闭 | boolean |        | true   |


#### Filter Methods
| 方法名     | 说明     | 参数 |
| ---------- | -------- | ---- |
| cloaseMask | 关闭蒙层 |      |


#### Filter Slots
| name    | 说明 | 参数 |
| ------- | ---- | ---- |
| default |      |      |


#### Filter 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |

### API

#### FilterItem Props
| 参数     | 说明               | 类型                                 | 可选值 | 默认值 |
| -------- | ------------------ | ------------------------------------ | ------ | ------ |
| label    | 筛选项文字         | string                               |        |        |
| prop     | 筛选项值对应的字段 | string                               |        |        |
| options  | 选项               | FilterItemGroupInfo : FilterItemInfo |        |        |
| multiple | 是否多选           |                                      |        |        |
| group    | 是否有多个分组     | boolean                              |        | false  |
| full     | 是否撑开全屏       | boolean                              |        | false  |
```ts
type FilterItemOption = { key: string, value: any };
interface FilterItemInfo {
    label: string;
    prop: string;
    multiple: boolean;
    options: FilterItemOption[];
}
interface FilterItemGroupInfo {
    label: string;
    group: true;
    options: FilterItemInfo[]
}
```


#### FilterItem Slots
| name    | 说明 | 参数 |
| ------- | ---- | ---- |
| default |      |      |


#### FilterItem 样式变量
| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
|        |      |        |