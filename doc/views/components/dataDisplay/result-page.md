<!--
 * @Author: your name
 * @Date: 2020-11-25 13:35:54
 * @LastEditTime: 2020-11-27 13:33:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /som-ui-next/doc/views/components/dataDisplay/result-page.md
-->
## SomResultPage 结果页

### 代码演示

::: demo dataDisplay result-page
基础用法
:::

### API

#### SomResultPage
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| top | 距离顶部距离(单位px) | string | — | '' |
| isMiddle | 是否绝对居中(优先级小于top值) | boolean | — | true |
| img | 图片地址 | string | — | '' |
| title | 标题 | string | — | '' |
| desc | 文字描述 | string | — | '' |
| confirmText | 确定按钮文案 | string | — | '确定' |
| cancelText | 取消按钮文案 | string | — | '取消' |
| withFooter | 是否显示底部按钮 | boolean | — | false |
| withCancel | 是否显示取消按钮 | boolean | — | false |


#### SomResultPage Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| on-comfirm | 确认按钮点击事件 | — |
| on-cancel | 取消按钮点击事件 | — |

#### SomResultPage slot
| 参数      | 说明          | 备注                           |
|---------- |-------------- |--------------------------------  |
| default | 图片文案显示区域 | — |
| footer | 底部按钮区域 | — |

#### SomResultPage style

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| --result-img-width | 图片大小 | 128px |
| --result-img-bottom-space | 图片底部间距 | 20px |
|  |  |  |
| --result-title-color | 标题颜色 | #000 |
| --result-title-fs | 标题字体大小 | 20px |
| --result-title-fw | 标题字重 | --font-weight-semibold |
|  |  |  |
| --result-desc-color | 描述颜色 | #8D8E99 |
| --result-desc-fs | 描述字体大小 | 16px |
| --result-desc-fw | 描述字重 | --font-weight-regular |
|  |  |  |
| --result-btn-top-space | 标题，描述，按钮之间的间距 | 16px |
| --result-btn-padding | 按钮左右的内边距 | 28px |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
