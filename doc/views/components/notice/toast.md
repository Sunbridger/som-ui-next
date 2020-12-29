## SomToast 轻提示

### 代码演示

::: demo notice toast
基础用法
:::

### API

#### 调用示例

```typescript
this.$som.toast.text({
  className: 'custom-toast',
	text: '我是一个toast'
})

```

#### SomToast
| 方法          | 参数    | 返回类型 | 说明           |
| ------------- | ------- | -------- | -------------- |
| toast         | options | string   | toast instance |
| toast.text    | options | string   | toast instance |
| toast.loading | options | string   | toast instance |
| toast.success | options | string   | toast instance |
| toast.error   | options | string   | toast instance |
| toast.warn    | options | string   | toast instance |
| toast.hide    | -       | void     | 关闭toast      |



#### Toast Instance

| 方法    | 参数    | 返回类型 | 说明 |
| ------- | ------- | -------- | ---- |
| changeProps  | options | string   | void |
| hide |         | void     |   关闭   |
| unmount |         | void     |   销毁   |
| instance |         | ComponentPublicInstance |  实例   |      |
| open |         | void |  打开   |      |


#### Toast Options

| 参数     | 说明                                      | 类型   | 可选值                                | 默认值          |
| -------- | ----------------------------------------- | ------ | ------------------------------------- | --------------- |
| type     | 类型                                      | string | success/loading/warn/text/error       | 不同api各不相同 |
| text     | 提示内容，支持 html，和默认 slot 同样功能 | string | —                                     | —               |
| icon     | 图标                                      | string | -                                     | -               |
| position | 显示位置                                  | string | default/top/middle/bottom/具体的top值 | default         |
| time     | 显示时间                                  | number | —                                     | 2000            |
| className | 自定义类名 | string |  |  |
| maskClass | mask自定义类名 | string |  |  |
| transition | 显示动画名字 | string | — | som-fade |
| maskTransition | 显示动画名字 | string | — | som-mask |
| showMask | 是否显示遮罩 | boolean | — | true |
| isTransparent | 是否为透明背景 | boolean | — | true |
| mask-z-index | 蒙层层级 | number | - | 1001 |
| isMultiple   | 多例	  | boolean| - | false |
| onShow | 提示弹出时触发 | function | - | - |
| onHide | 提示隐藏时触发 | function | - | - |



#### Toast 样式变量

| 名称                                | 默认值                | 说明                      |
| ----------------------------------- | --------------------- | ------------------------- |
| --toast-font-size                   | --font-size-title     | toast字号                 |
| --toast-icon-font-size              | --font-size-content   | toast有icon的情况下的字号 |
| --toast-font-weight                 | --font-weight-regular | toast字重                 |
| --toast-font-color                  | --text-anti           | toast字色                 |
| --toast-line-height                 | 1.5                   | 行间距                    |
| --toast-max-width                   | 192px                 | 最长宽度                  |
| --toast-border-radius               | --border-radius-mini  | 圆角值文案                |
| --toast-icon-border-radius          | --border-radius-large | 圆角值icon                |
| --toast-bg-color                    | #000                  | 背景颜色                  |
| --toast-bg-opacity                  | 90%                   | 背景透明度                |
| --toast-content-padding-bt          | 16px                  | toast上下内边距           |
| --toast-content-padding-lr          | 16px                  | toast左右内边距           |
| --toast-icon-content-padding-center | 12px                  | icon和文案之间的间距      |
| --toast-icon-content-padding-top    | 30px                  | icon模式下顶部边距        |
| --toast-icon-content-padding-bottom | 24px                  | icon模式下底部边距        |
| --toast-icon-size                   | 36px                  | icon size                 |
| --toast-icon-type-min-size          | 120px                 | 有icon时的toast width     |


### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
