## SomConfig 全局参数配置

### 代码演示

::: demo config config
基础用法
:::

### API
# config

#### 说明

提供修改全局配置的方法（插件）
#### 

#### 调用示例

```typescript
this.$som.config.updateDefaultConfig({

})
this.$som.config.changeTheme('tgc')

```

#### Config Api

| 方法                | 参数    | 返回类型 | 说明         |
| ------------------- | ------- | -------- | ------------ |
| changeTheme         | theme   | void     | 修改主题     |
| updateDefaultConfig | options | void     | 修改默认配置 |

#### Config Options

| 参数                      | 说明              | 类型 | 可选值 | 默认值 |
| ------------------------- | ----------------- | ---- | ------ | ------ |
| needChangeToVw            | 是否需要转为vw,注意只转js逻辑中的vw，不转css中的，css中的请使用postcss-px-to-viewport插件实现  |      |        |        |
| theme                     | 主题              |      |        |        |
| toastPluginDefalutOptions | toast插件默认参数 |      |        |        |
| modalPluginDefalutOptions | modal插件默认参数 |      |        |        |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
