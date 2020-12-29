/* eslint-disable no-shadow, class-methods-use-this */
const path = require('path');
const exec = require('child_process').execSync;
const render = require('./packages-template');
const {
    title,
    checkStat,
    mkDir,
    setJsonFile
} = require('./utils');
const componentsInfo = require('../../components.json');

const namespace = componentsInfo.namespace;
const componentNav = require('../../doc/map/component-nav.json');

const resolve = (...dirs) => path.resolve(__dirname, '../..', ...dirs);

const componentNavPath = resolve('doc/map/component-nav.json');
const componentsInfoPath = resolve('components.json');

// 设置导航和组件列表的数据
function setNavAndInfo() {
    setJsonFile(componentNavPath, componentNav);
    setJsonFile(componentsInfoPath, componentsInfo);
}

class Module {
    constructor(componentName, componentChineseName) {
        this.componentName = componentName;
        this.componentChineseName = componentChineseName;
        // 目录
        // 源码目录
        this.packagesDir = resolve('packages');
        this.componentDir = resolve(`packages/${componentName}`);
        this.componentSrcIndex = resolve(`packages/${componentName}/index.ts`);
        this.componentSrcDir = resolve(`packages/${componentName}/src`);
        this.componentStyle = resolve(`packages/${componentName}/src/var.less`);
        this.componentSrcDeclareIndex = resolve(`packages/${componentName}/index.d.ts`);
        this.componentTestDir = resolve('tests/unit/spec/packages');

        this.componentDocDir = resolve('doc/views/packages');
        this.componentExampleDir = resolve('examples/views/packages');

        this.componentNav = null;
        this.componentsInfo = null;

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 创建文件夹
        mkDir(this.packagesDir);

        // 设置模块导航数据
        const nav = componentNav.find(item => item.name === 'packages');
        this.componentNav = nav.modules;
        if (!this.componentNav) {
            this.componentNav = [];
            nav.modules = [];
        }

        // 设置模块组件列表
        this.componentsInfo = componentsInfo.packages;
        if (!this.componentsInfo) {
            this.componentsInfo = [];
            componentsInfo.packages = [];
        }

        setNavAndInfo();
    }

    /**
     * 获取组件相关的路径
     * @param {String} componentName 组件名
     */
    getComponentSources(componentName) {
        const componentSrcIndex = this.componentSrcIndex;
        const componentStyles = this.componentStyle;
        const componentDoc = resolve(this.componentDocDir, `${componentName}.md`);
        const componentTest = resolve(this.componentTestDir, `${componentName}.spec.js`);
        const componentExample = resolve(this.componentExampleDir, `${componentName}.vue`);
        const componentTypes = this.componentSrcDeclareIndex;

        return {
            componentSrcIndex,
            componentStyles,
            componentDoc,
            componentTest,
            componentExample,
            componentTypes
        };
    }

    /**
     * 判断组件是否是否存在
     * @param {String} componentName 组件名
     */
    isExistComponent(componentName) {
        const {
            componentSrcIndex,
            componentDoc,
            componentTest,
            componentExample
        } = this.getComponentSources(componentName);

        const sourceList = [
            {
                path: componentSrcIndex,
                type: 'file'
            },
            {
                path: componentDoc,
                type: 'file'
            },
            {
                path: componentTest,
                type: 'file'
            },
            {
                path: componentExample,
                type: 'file'
            }
        ];

        // 判断组件是否存在
        for (const { path, type } of sourceList) {
            if (checkStat(path, type)) {
                return true;
            }
        }
        // 判斷導航和組件列表中是否存在
        const ifComponentInNav = this.componentNav.find(item => item.name === componentName);
        if (ifComponentInNav) return true;
        const ifComponentInInfo = this.componentsInfo.find(item => item === componentName);
        if (ifComponentInInfo) return true;

        return false;
    }


    /**
     * 渲染组件模板
     * @param {String} path 路径 `${this.moduleSrcDir}/${componentName}`
     * @param {Object} data { componentName, componentTitleName, componentChineseName }
     */
    renderComponentSrcDir(path, data) {
        mkDir(this.componentDir);
        mkDir(this.componentSrcDir);
        const nameSpace = title(namespace);
        const componentSrcVue = resolve(`${this.componentSrcDir}/${data.componentName}.vue`);
        const componentSrcImport = resolve(`${this.componentDir}/index.ts`);
        Object.assign(data, {
            componentTitleName: `${nameSpace}${data.componentTitleName}`
        });
        render.renderComponentSrcIndex(
            componentSrcVue,
            data
        );
        render.renderComponentSrcImportIndex(
            componentSrcImport,
            data
        );
    }

    /**
     * 渲染组件模板
     * @param {String} path 路径 `${this.moduleSrcDir}/${componentName}`
     * @param {Object} data { componentName, componentTitleName, componentChineseName }
     */
    renderComponentStyleDir(data) {
        const componentStylesImport = this.componentStyle;
        render.renderComponentStyle(
            componentStylesImport,
            data
        );
    }

    /**
     * 创建组件
     * @param {String} componentName 组件名
     * @param {String} componentChineseName 组件中文名
     */
    createComponent(componentName, componentChineseName) {
        const isExistComponent = this.isExistComponent(componentName);
        if (isExistComponent) return false;
        const {
            componentSrcIndex,
            componentDoc,
            componentTest,
            componentExample
        } = this.getComponentSources(componentName);

        try {
            const componentTitleName = title(componentName);
            const nameSpace = title(namespace);

            // 模板渲染
            this.componentNav.push({
                name: componentName,
                alias: componentChineseName,
                path: `/packages/${componentName}`
            });
            this.componentsInfo.push(componentName);
            setNavAndInfo();
            // 使用文件夹代替文件
            this.renderComponentSrcDir(componentSrcIndex, {
                componentName,
                componentTitleName,
                componentChineseName
            });

            const componentSrcVueDeclareIndex = resolve(`packages/${componentName}/shims-vue.d.ts`);
            render.renderComponentType([this.componentSrcDeclareIndex, componentSrcVueDeclareIndex], {
                componentTitleName
            });

            render.renderComponentTest(componentTest, {
                componentName,
                componentTitleName,
                componentChineseName
            });
            render.renderComponentDoc(componentDoc, {
                componentName,
                componentTitleName: `${nameSpace}${componentTitleName}`,
                componentChineseName
            });
            render.renderComponentExample(componentExample, {
                componentName
            });

            render.renderComponentStyle(
                this.componentStyle,
                {componentName}
            );
            render.renderComponentPackage(
                resolve(`${this.componentDir}/package.json`),
                {
                    componentName: this.componentName,
                    nComponentName: `${namespace}-${this.componentName}`
                }
            );
            render.renderComponentReadme(
                resolve(`${this.componentDir}/README.md`),
                {
                    componentName: this.componentName,
                    nComponentName: `${namespace}-${this.componentName}`
                }
            );
        } catch (e) {
            console.log(e);
            this.removeComponent(componentName);
        }

        return true;
    }

    /**
     * 删除组件
     * @param {String} componentName 组件名
     */
    removeComponent() {
        const isExistComponent = this.isExistComponent(this.componentName);
        if (!isExistComponent) return false;
        exec(`rm -rf ${this.componentDir} ${resolve(this.componentTestDir, `${this.componentName}.spec.js`)} \
        ${resolve(this.componentDocDir, `${this.componentName}.md`)} ${resolve(this.componentExampleDir, `${this.componentName}.vue`)}`);

        const componentInNavIndex = this.componentNav.findIndex(item => item.name === this.componentName);
        if (componentInNavIndex > -1) {
            this.componentNav.splice(componentInNavIndex, 1);
        }
        const componentInInfoIndex = this.componentsInfo.findIndex(item => item === this.componentName);
        if (componentInInfoIndex > -1) {
            this.componentsInfo.splice(componentInInfoIndex, 1);
        }
        setNavAndInfo();
    }
}

module.exports = Module;
