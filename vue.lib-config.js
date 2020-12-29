
const path = require('path');

const resolve = dir => path.join(__dirname, dir);


function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                resolve('node_modules/@souche-ui/lemon/less/global.less')
            ]
        });
}

module.exports = {
    chainWebpack(config) {
        config.externals(['vue', '@souche-vue3/souche-util-vue']);
        config.resolve.alias
            .set('@', resolve('src'))
            .set('types', resolve('types'))
            .set('lemon', '@souche-ui/lemon');

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    }
};

if (process.env.LIB === 'components') {
    module.exports.css = {
        extract: true
    };
}
