import testUtils from '@souche-vue/test-utils';
import { mergeDeepRight } from 'ramda';

/**
 * 创建localVue
 * @param {Component} Component
 * @param {Object} opts
 */
global.createLocalVue = function (Component, opts = {}) {
    const DEFAULT_OPTS = {
        use: {
            Platform: 'h5'
        }
    };
    const mergeOpts = mergeDeepRight(DEFAULT_OPTS, opts);

    // 得到一个供你添加组件、混入和安装插件而不会污染全局的 Vue 类
    const factory = testUtils.create(Component, mergeOpts);

    return factory();
};
