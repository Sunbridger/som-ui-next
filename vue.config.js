const path = require('path');
const fs = require('fs');
const { getMarkdownOptions } = require('./build/vue-markdown-loader');
const { version } = require('./package.json');

const resolve = dir => path.join(__dirname, dir);

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                resolve('doc/styles/global.less'),
                resolve('node_modules/@souche-ui/lemon/less/global.less')
            ]
        });
}

const isProduction = process.env.NODE_ENV === 'production';
const assetsPath = `https://fedoc.souche-inc.com/som-ui-next/${version}/`;

module.exports = {
    publicPath: isProduction ? assetsPath : '/',

    pages: {
        index: {
            entry: 'doc/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        examples: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'examples.html'
        }
    },

    chainWebpack (config) {
        // todo loader
        config.module
            .rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader-v16')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options(getMarkdownOptions());

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));


        config.resolve.alias
            .set('root', resolve(''))
            .set('types', resolve('types'))
            .set('main', resolve('src'))
            .set('@', resolve('src'))
            .set('doc', resolve('doc'))
            .set('examples', resolve('examples'))
            .set('views', resolve('doc/views'))
            .set('components', resolve('doc/components'))
            .set('styles', resolve('doc/styles'))
            .set('images', resolve('doc/assets/images'))
            .set('lemon', '@souche-ui/lemon');

        config.devServer
            .proxy({
                '/robben': {
                    target: 'https://robben.souche-inc.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/robben': ''
                    }
                }
            });
        const moduleRealPath = fs.realpathSync('./node_modules/@souche-vue3/souche-svg-inject');
        // link组件指向源码
        config.resolve.alias
            .set('@souche-vue3/souche-svg-inject/lib/umd/index', path.resolve(moduleRealPath, 'src/index'));

        // dist忽略babel
        config.module.rule('js')
            .exclude
            .add(`${moduleRealPath}/lib`);

        // 忽略eslint
        config.module.rule('eslint')
            .exclude
            .add(moduleRealPath);

    }
};
