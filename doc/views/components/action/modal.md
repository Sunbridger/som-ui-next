## SomModal 对话框

### 代码演示

::: demo action modal
基础用法
:::

### Tips

同时提供组件和插件


### Plugin Examples
```javascript
this.$som.modal.close();

this.$som.modal.text('内容或者options');

this.$som.modal.confirm({
    title: '标题',
    content: '内容',
    hideOnBlur: true,
    confirmText: '确定',
    cancelText: '取消',
    confirmLoading: true,
    transition: 'som-dialog',
    maskTransition: 'som-fade',
    maskZIindex: 1001,
    onCancel: done =>
    // 返回promise的时候配合confirmLoading,会在执行完成前显示loading；
    // promise reject时会阻止弹窗默认关闭( done()可执行关闭弹窗操作 )
    // then时自动关闭
    // 不为promise时直接关闭
        new Promise(() => {
        }),
    onConfirm: done => new Promise(() => {
    })
});
```


### API

#### SomModal
### 

| 参数            | 说明                           | 类型          | 可选值 | 默认值     |
| --------------- | ------------------------------ | ------------- | ------ | ---------- |
| show            | 是否显示，使用 `v-model:show` 绑定  | boolean       | —      | false      |
| custom-style    | 自定义style                    |               |        |            |
| title           | 弹窗标题                       | string        | —      | —          |
| content         | 弹窗内容, 支持 html            | string        | —      | —          |
| transition      | 弹窗动画                       | string        | —      | som-dialog |
|                 |                                |               |        |            |
| showMask        | 显示蒙层                       | boolean       |        | true       |
| hide-on-blur    | 是否在点击遮罩时自动关闭弹窗   | boolean       | —      | false      |
| mask-z-index    | 遮罩层 z-index 值              | number/string | —      | 1000       |
| mask-class      | 遮罩层class                    | string        |        | som-mask   |
| lock-scroll     | 锁定背景                       | boolean       |        | true       |
| is-transparent  | 蒙层透明                       | boolean       |        | false      |
| mask-transition | 遮罩动画                       | string        | —      | som-fade   |
|                 |                                |               |        |            |
| is-confirm      | 是否对话模式                   | boolean       | —      | false      |
| confirm-text    | 确认按钮的显示文字             | string        | —      | 确认       |
| confirm-loading | 是否需要在promise时显示loading | boolean       |        | true       |
| cancel-text     | 取消按钮的显示文字             | string        | —      | 取消       |
| confirml-style  | 样式                           |               |        |            |
| cancel-style    |                                |               |        |            |
| on-confirm         |   确认按钮事件     |      function         |        |            |
| on-cancel          |    确认按钮事件    |      function         |        |            |

#### SomModal Events

| 事件名     | 说明               | 返回值  |
| ---------- | ------------------ | ------- |
| cancel  | 点击取消按钮时触发 | promise |
| confirm | 点击确定按钮时触发 | promise |
| show    | 弹窗出现时触发     | —       |
| hide    | 弹窗隐藏时触发     | —       |



### Slot

| name    | description      |
| ------- | ---------------- |
| title   | 对话框标题       |
| default | 对话框内容       |
| footer  | 对话框底部按钮栏 |

### Modal Plugin Method

| 参数    | 类型     | 参数    | 返回值  | 说明     |
| ------- | -------- | ------- | ------- | -------- |
| confirm | function | options | promise | 确认弹窗 |
| text    | function | options | promise | 信息弹窗 |
| close   | function | options | —       | 关闭弹窗 |



### Modal Plugin Otptions

| 参数  | 说明 | 类型 | 可选值 | 默认值 |
| ----- | ---- | ---- | ------ | ------ |
| title |  同prop    |  string｜VNode    |        |        |
| content |  | string｜VNode |  |  |
| hideOnBlur |  |  |  |  |
| isConfirm |  |  |  |  |
| confirmLoading |  |  |  |  |
| confirmText |  |  |  |  |
| cancelText |  |  |  |  |
| loading |  |  |  |  |
| isTransparent |  |  |  |  |
| maskZIIndex |  |  |  |  |
| onConfirm | 确认按钮和取消按钮事件； |  |  |  |
| onCancel |  |  |  |  |
| isMultiple | 是否多例 |  |  |  |


### Modal 样式变量

| 名称                      | 默认值                 | 说明       |
| ------------------------- | ---------------------- | ---------- |
| --modal-title-fs          | --font-size-regular    | 字体       |
| --modal-title-fw          | --font-weight-semibold |            |
| --modal-title-color       | --text-title           |            |
| --modal-content-fs        | --font-size-content    | 字体       |
| --modal-content-fw        | --font-weight-regular  |            |
| --modal-content-color     | --text-content         |            |
| --modal-content-lh        | 1.2                    |            |
| --modal-pd-top            | 32px                   | 边距       |
| --modal-pd-title-content  | 16px                   |            |
| --modal-pd-content-action | 28px                   |            |
| --modal-pd-x              | 20px                   |            |
| --modal-pd-bottom         | 28px                   |            |
| --modal-action-height     | 48px                   | 按钮区高度 |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
