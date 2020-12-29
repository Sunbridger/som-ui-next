// rollup.config.js
import path from 'path';
// import vuePlugin from 'rollup-plugin-vue';
// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import postcss from 'rollup-plugin-postcss';
import minimist from 'minimist';

const vuePlugin = require('./build/rollup-plugin-vue/index');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rollupPostcssLessLoader = require('rollup-plugin-postcss-webpack-alias-less-loader');

const projectRoot = path.resolve(__dirname, '.');
const argv = minimist(process.argv.slice(2));
const lemon = path.resolve(projectRoot, 'node_modules/@souche-ui/lemon');

const globals = {
    vue: 'Vue',
};

const ourPutDir = 'es';
// default
let output = {
    dir: ourPutDir,
    format: 'es',
    globals,
};
let input = 'src/index.ts';

export const getComponentPath = (component, entry) => ({
    i: entry,
    o: {
        file: `es/${component}.js`,
        format: 'es',
        globals,
    },
});

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.vue'];

const plugins = [
    {
        // LOGGING PLUGIN
        transform(code, id) {
            if (id.indexOf('.less') > -1) {
                return {
                    code: '',
                    map: undefined
                };
            }
        }
    },
    alias({
        resolve: extensions,
        entries: {
            '@': path.resolve(projectRoot, 'src'),
            'types': path.resolve(projectRoot, 'types'),
            'lemon': lemon
        }
    }),
    resolve({
        extensions
    }),
    typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    vuePlugin({
        preprocessStyles: false
    }),
    commonjs(),
    // issue https://github.com/vuejs/rollup-plugin-vue/pull/407
    // 不能编译模板中的高版本js，如箭头函数和可选链
    babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions,
        configFile: false,
        presets: [
            [
                '@babel/env',
                {
                    loose: true,
                    modules: false,
                },
            ],
            '@babel/typescript',
        ],
        plugins: [
            '@vue/babel-plugin-jsx',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/proposal-class-properties',
            '@babel/transform-runtime',
        ],
        overrides: [
            {
                test: /\.vue$/,
                plugins: [
                    '@babel/transform-typescript',
                ],
            },
        ],
    }),
    postcss({
        loaders: [rollupPostcssLessLoader({
            aliases: {
                '@': path.resolve(projectRoot, 'src'),
                'lemon': lemon
            }
        })],
        extract: true,
        extensions: ['.less', '.css'],
        config: {
            path: path.resolve(projectRoot, 'postcss.confg.js')
        }
    })
];

// console.log(" argv.format = ",argv.format)
if (argv.format && argv.format === 'es') {
    console.log(' es argv.format = ', argv.format);
    input = 'src/index.ts';
    output = {
        dir: ourPutDir,
        format: 'esm',
        globals,
        exports: 'named',
    };
}

if (argv.name && argv.input) {
    const { i, o } = getComponentPath(argv.name, argv.input);
    input = i;
    output = o;
} else {
    plugins.unshift(clear({
        targets: ['es']
    }));
}

const baseConfig = {
    input,
    output,
    // todo @souche-vue3/souche-util-vue
    external: ['vue', '@souche-vue3/souche-util-vue'],
    plugins
};

export default baseConfig;
