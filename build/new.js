const inquirer = require('inquirer');
const chalk = require('chalk');
const { modules } = require('../components.json');
const Module = require('./share/module');
const Packages = require('./share/packages');
const {
    success
} = require('./share/utils');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

function notNull(msg) {
    return val => (val ? true : msg);
}

async function create() {
    const { createType } = await inquirer.prompt([
        {
            message: '请选择创建的类型',
            type: 'list',
            choices: [
                {
                    name: '组件',
                    value: 'component'
                },
                {
                    name: '模块',
                    value: 'module'
                },
                {
                    name: '扩展组件',
                    value: 'packages'
                }
            ],
            name: 'createType'
        }
    ]);
    // 如果时插件或者指令
    if (createType === 'packages') {
        const { componentName } = await inquirer.prompt([
            {
                message: '请输入组件名（英文）',
                type: 'input',
                name: 'componentName',
                validate: notNull('组件名不能为空')
            }
        ]);
        const targetModule = new Packages(componentName);
        const isExistComponent = targetModule.isExistComponent(componentName);
        if (isExistComponent) {
            const { rmComponent } = await inquirer.prompt([
                {
                    message: '组件已经存在，是否删除',
                    type: 'confirm',
                    name: 'rmComponent',
                    default: false
                }
            ]);
            if (rmComponent) {
                targetModule.removeComponent(componentName);
                success('删除组件成功');
            }
            return false;
        }
        const { componentChineseName } = await inquirer.prompt([
            {
                message: '请输入组件名（中文）',
                type: 'input',
                name: 'componentChineseName',
                validate: notNull('组件名不能为空')
            }
        ]);
        targetModule.createComponent(componentName, componentChineseName);
        success('创建组件成功');
        return false;
    } else if (createType === 'component') {
        const moduleList = modules.map(item => item.name);
        const { moduleName, componentName } = await inquirer.prompt([
            {
                message: '请选择模块',
                type: 'autocomplete',
                name: 'moduleName',
                source(answersSoFar, input) {
                    input = input || '';
                    return new Promise((resolve) => {
                        resolve(moduleList.filter(item => item.indexOf(input) > -1));
                    });
                }
            },
            {
                message: '请输入组件名（英文）',
                type: 'input',
                name: 'componentName',
                validate: notNull('组件名不能为空')
            }
        ]);
        const targetModule = new Module(moduleName);
        const isExistComponent = targetModule.isExistComponent(componentName);
        if (isExistComponent) {
            const { rmComponent } = await inquirer.prompt([
                {
                    message: '组件已经存在，是否删除',
                    type: 'confirm',
                    name: 'rmComponent',
                    default: false
                }
            ]);
            if (rmComponent) {
                targetModule.removeComponent(componentName);
                success('删除组件成功');
            }
            return false;
        }
        const { componentChineseName } = await inquirer.prompt([
            {
                message: '请输入组件名（中文）',
                type: 'input',
                name: 'componentChineseName',
                validate: notNull('组件名不能为空')
            }
        ]);
        targetModule.createComponent(componentName, componentChineseName);
        success('创建组件成功');
        return false;
    }
    const { moduleName } = await inquirer.prompt([
        {
            message: '请输入模块名（英文）',
            type: 'input',
            name: 'moduleName',
            validate: notNull('模块名不能为空')
        }
    ]);
    const moduleIndex = modules.findIndex(item => item.name === moduleName);
    if (moduleIndex > -1) {
        const rmModule = await inquirer.prompt([
            {
                message: '模块已经存在，是否删除',
                type: 'confirm',
                name: 'rmModule',
                default: false
            }
        ]);
        if (rmModule) {
            const targetModule = new Module(moduleName);
            targetModule.destroy();
            success('删除模块成功');
        }
        return false;
    }
    const { moduleChineseName } = await inquirer.prompt([
        {
            message: '请输入模块名（中文）',
            type: 'input',
            name: 'moduleChineseName',
            validate: notNull('模块名不能为空')
        }
    ]);
    // eslint-disable-next-line
    new Module(moduleName, moduleChineseName);
    success('创建模块成功');
}

create();
