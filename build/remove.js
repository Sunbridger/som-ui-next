/* eslint-disable no-shadow */
const inquirer = require('inquirer');
const chalk = require('chalk');
const componentsJson = require('../components.json');
const Module = require('./share/module');
const Package = require('./share/packages');

const {
    success
} = require('./share/utils');

const { modules, packages } = componentsJson;

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

async function remove() {
    const { removeType } = await inquirer.prompt([
        {
            message: '请选择删除的类型',
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
            name: 'removeType'
        }
    ]);
    const moduleList = modules.map(item => item.name);
    if (removeType === 'packages') {
        const { componentName } = await inquirer.prompt([
            {
                message: '请选择要删除的组件',
                type: 'autocomplete',
                name: 'componentName',
                source(answersSoFar, input) {
                    const componentList = packages;
                    input = input || '';
                    return new Promise((resolve) => {
                        resolve(componentList.filter(item => item.indexOf(input) > -1));
                    });
                }
            }
        ]);
        const targetModule = new Package(componentName);
        targetModule.removeComponent();
        success('删除组件成功');
        return false;
    } else if (removeType === 'component') {
        const { moduleName, componentName } = await inquirer.prompt([
            {
                message: '请选择组件所属模块',
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
                message: '请选择要删除的组件',
                type: 'autocomplete',
                name: 'componentName',
                source(answersSoFar, input) {
                    const moduleName = answersSoFar.moduleName;
                    const componentList = modules.find(item => item.name === moduleName).components;

                    input = input || '';
                    return new Promise((resolve) => {
                        resolve(componentList.filter(item => item.indexOf(input) > -1));
                    });
                }
            }
        ]);
        const targetModule = new Module(moduleName);
        targetModule.removeComponent(componentName);
        success('删除组件成功');
        return false;
    }
    const { moduleName } = await inquirer.prompt([
        {
            message: '请选择要删除的模块',
            type: 'autocomplete',
            name: 'moduleName',
            source(answersSoFar, input) {
                input = input || '';
                return new Promise((resolve) => {
                    resolve(moduleList.filter(item => item.indexOf(input) > -1));
                });
            }
        }
    ]);
    const targetModule = new Module(moduleName);
    targetModule.destroy();
    success('删除模块成功');
    return false;
}

remove();
