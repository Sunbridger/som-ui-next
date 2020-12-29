const exec = require('child_process').exec;
const componentsJSON = require('../components.json');

const modules = componentsJSON.modules;
// const plugins = componentsJSON.plugins;
// const directives = componentsJSON.directives;
const { success, error } = require('./share/utils');
const {
    logWithSpinner,
    stopSpinner
} = require('@vue/cli-shared-utils');

const entries = {};
// 组件
modules.forEach((moduleInfo) => {
    const { components } = moduleInfo;
    // entries[moduleName] = `src/components/${moduleName}/index.js`;

    components.forEach((component) => {
        entries[component] = `src/components/${component}/index.ts`;
    });
});

// // 插件
// plugins.forEach((plugin) => {
//     entries[`${plugin}Plugin`] = `src/plugins/${plugin}/index.ts`;
// });

// // 指令
// directives.forEach((directive) => {
//     entries[`${directive}Directive`] = `src/directives/${directive}/index.ts`;
// });

// const taskList = Object.keys(entries).map(entryName => new Promise((resolve, reject) => {
//     exec(`LIB=components npm run lib -- --name ${entryName} --entry ${entries[entryName]} --entryObj ${JSON.stringify(entries)}`, (err) => {
//         if (err) {
//             reject(err);
//         }
//         resolve();
//     });
// }));

// logWithSpinner('打包各个模块和组件...');
// Promise.all(taskList).then(() => {
//     stopSpinner(true);
//     success('全部打包完成');
// }).catch((err) => {
//     stopSpinner(false);
//     error(err);
// });

async function start() {
    try {
        logWithSpinner('打包各个模块和组件...');
        const temp = [];
        for (const [i, entryName] of Object.entries(Object.keys(entries))) {
            if (temp.length === 6 || i === Object.keys(entries).length - 1) {
                await Promise.all(temp);
                temp.length = 0;
            }
            const p = new Promise((resolve, reject) => {
                exec(`LIB=components npm run lib -- --name ${entryName} --entry ${entries[entryName]} --entryObj ${JSON.stringify(entries)}`, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            temp.push(p);
        }
        stopSpinner(true);
        success('全部打包完成');
    } catch (err) {
        stopSpinner(false);
        error(err);
    }
}

start();
