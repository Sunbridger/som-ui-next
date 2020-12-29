## SomProgress 进度条

### 代码演示

::: demo dataDisplay progress
基础用法
:::

### API

#### SomProgress
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| percent | 进度值 | number | 0-100 | 0 |
| bar-color | 进度条的色彩 | string | -- | -- |
| unfilled | 是否不填充背景色 | boolean | -- | false |
| filled-color | 进度条背景颜色 | string | -- |  |
| width | 进度条宽度 | number |  |  |
| ticks | 刻度数据, 形如{percent, text}, percent: 刻度所在的进度, text: 刻度对应文案 | array | -- | -- |
| show-tip | 是否显示进度数据 | boolean | -- | true |
| tip-content | 自定义进度数据 | string | -- | 当前进度值 |
| tip-position | 进度文案的位置 | string | top/right | top |

#### 样式变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| --progress-bar-color | 进度条颜色 | #FF1C24 |
| --progress-bar-height | 进度条高度 | 3px |
| --progress-bar-bg | 进度条背景色 | #E3E4E6 |
|  |  |  |
| --progress-bar-tick-height | 带刻度的进度条高度 | 6px |
|  |  |  |
| --progress-fs | 字体大小 | 13px |
| --progress-font-color | 字体颜色 | #5E5E66 |
|  |  |  |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | 鲁雅莉 |
| 设计师 | 池琪琪 |
