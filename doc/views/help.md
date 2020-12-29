## 文档帮助

### scripts使用
```json
{
  "scripts": {
    "serve": "vue-cli-service serve --open",
    "build:components": "node build/build-components",
    "build:deploy": "npm run build:doc && npm run build:lib",
    "build:doc": "vue-cli-service build",
    "build:lib": "npm run lib -- src/index.js --name index --clean && npm run build:components",
    "lib": "VUE_CLI_SERVICE_CONFIG_PATH=$PWD/vue.lib-config.js vue-cli-service lib",
    "new": "node build/new",
    "remove": "node build/remove",
    "test:unit": "vue-cli-service test:unit"
  }
}
```


### Mardown 扩展

#### 容器
:::tip 提示
我们建议使用 CDN 引入的用户在链接地址上锁定版本，以免将来升级时受到非兼容性更新的影响。
:::

:::warning 提示
我们建议使用 CDN 引入的用户在链接地址上锁定版本，以免将来升级时受到非兼容性更新的影响。
:::

:::danger 提示
我们建议使用 CDN 引入的用户在链接地址上锁定版本，以免将来升级时受到非兼容性更新的影响。
:::
