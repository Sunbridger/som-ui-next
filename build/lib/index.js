const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { log, error } = require('@vue/cli-shared-utils');
const exec = require('child_process').execSync;

const abort = (msg) => {
    log();
    error(msg);
    process.exit(1);
};

function libConfig (api, {
    entry,
    name,
    formats,
    dest,
    sourceMap,
    stylePath,
    clean
}) {
    const fullEntryPath = api.resolve(entry);
    const destDir = api.resolve(dest);

    if (!fs.existsSync(fullEntryPath)) {
        abort('请确保指定的路口文件存在');
    }

    // 删除之前的构建目录
    if (clean) {
        exec(`rm -rf ${destDir}`);
    }

    const isVueEntry = /\.vue$/.test(entry);

    const libName = (
        name ||
        api.service.pkg.name ||
        path.basename(entry).replace(/\.(jsx?|vue)$/, '')
    );

    function genConfig (format, postfix) {
        const config = api.resolveChainableWebpackConfig();
        config.plugins.delete('html');
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        config.plugins.delete('html-index');
        config.plugins.delete('preload-index');
        config.plugins.delete('prefetch-index');
        config.plugins.delete('copy');

        config.devtool(sourceMap ? 'source-map' : 'none');

        // 设置样式的输出路径
        if (config.plugins.has('extract-css')) {
            config
                .plugin('extract-css')
                .tap((args) => {
                    args[0].filename = `${stylePath}/${libName}.css`;
                    return args;
                });
        }

        // 压缩文件
        if (!/\.min/.test(postfix)) {
            config.optimization.minimize(false);
        }

        config.externals([
            nodeExternals(),
            ...(config.get('externals') || [])
        ]);

        const entryName = postfix ? `${libName}.${postfix}` : libName;
        config.resolve.alias.set('~entry', fullEntryPath);

        let realEntry = fullEntryPath;

        if (isVueEntry) {
            realEntry = require.resolve('./entry-vue.js');
        }

        const rawConfig = api.resolveWebpackConfig(config);
        rawConfig.entry = {
            [entryName]: realEntry
        };

        rawConfig.output = Object.assign({
            library: libName,
            libraryExport: isVueEntry ? 'default' : undefined,
            libraryTarget: format,
            globalObject: '(typeof self !== \'undefined\' ? self : this)'
        }, rawConfig.output, {
            path: destDir,
            filename: `${entryName}.js`,
            chunkFilename: `${entryName}.[name].js`,
            publicPath: ''
        });

        return rawConfig;
    }

    const configMap = {
        commonjs2: genConfig('commonjs2'),
        commonjs: genConfig('commonjs2', 'common'),
        umd: genConfig('umd', 'umd'),
        'umd-min': genConfig('umd', 'umd.min')
    };

    const formatArray = (`${formats}`).split(',');
    const configs = formatArray.map(format => configMap[format]);
    if (configs.indexOf(undefined) !== -1) {
        const unknownFormats = formatArray.filter(f => configMap[f] === undefined).join(', ');
        abort(`不符合标准: ${unknownFormats}`);
    }
    return configs;
}

module.exports = (api, options) => {
    api.registerCommand('lib', {
        description: '打lib包',
        usage: 'vue-cli-service lib [options]',
        options: {
            '--name': '库名',
            '--formats': '在(commonjs2,commonjs,umd,umd-min)选择',
            '--dest': '目标存放目录（default: lib）',
            '--stylePath': '样式存在地址，相对于dest（default: styles）',
            '--mode': '构建模式（default: production）',
            '--sourceMap': '支持sourceMap',
            '--clean': '删除之前的构建目录',
            '--entry': '入口文件'
        }
    }, async(args) => {
        args = Object.assign({
            formats: 'commonjs2',
            dest: 'lib',
            stylePath: 'styles'
        }, args);

        if (!args.entry) {
            abort('请指定入口文件');
        }

        webpack(libConfig(api, args, options), (err) => {
            if (err) {
                abort('失败');
            }
        });
    });
};

module.exports.defaultModes = {
    lib: 'production'
};
