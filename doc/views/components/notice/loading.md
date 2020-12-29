<!--
 * @Author: your name
 * @Date: 2020-11-17 22:31:32
 * @LastEditTime: 2020-11-25 14:03:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /som-ui-next/doc/views/components/notice/loading.md
-->
## SomLoading 加载

### 代码演示

::: demo notice loading
基础用法
:::

### API
| 方法    | 参数    | 返回类型 | 说明 |
| ------- | ------- | -------- | ---- |
| show  | options | void   | 显示 |
| hide |         | void     |   关闭   |
#### Toast Options

| 参数     | 说明         | 类型   | 可选值         | 默认值          |
| -------- | -------- | ------ | ------------- | ------------- |
| type     | 类型              | string | white  | -            |
| text     | 提示内容，支持 html | string |    —   | '加载中...'     |
| svg      | 图标              | string |    -   | -               |

#### Toast 样式变量

| 名称                                | 默认值          ****      | 说明                      |
| ----------------------------------- | --------------------- | ------------------------- |
| --loading-border-radius             | --border-radius-mini  | loading区域圆角          |
| --loading-bg-color                  | #000                  | 背景色                   |
| --loading-bg-opacity                | 90%                   | 背景透明度                 |
| --loading-content-padding-bt        | 12px                  | loading上下内边距           |
| --loading-content-padding-lr        | 16px                  | loading左右内边距           |
| --loading-icon-content-padding-center | 5px                   | icon和文案之间的间距      |
| --loading-icon-content-padding-top    | 32px                  | icon模式下顶部边距        |
| --loading-icon-content-padding-bottom | 18px                  | icon模式下底部边距        |
| --loading-icon-size                   | 36px                  | icon size                 |
| --loading-icon-type-min-size          | 120px                 | loading区域 width     |
| --loading-icon-white-color            | #8D8E99               | 白色模式文字颜色     |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
