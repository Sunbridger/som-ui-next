/* eslint-disable no-shadow, class-methods-use-this */
const path = require('path');
const exec = require('child_process').execSync;
const render = require('./templates');
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
const rootIndexPath = resolve('src/index.ts');
const rootTypeIndexPath = resolve('types/som-ui-next.d.ts');
// const rootTypeIndexPath = resolve('types/index.d.ts');

// 设置导航和组件列表的数据
function setNavAndInfo() {
    setJsonFile(componentNavPath, componentNav);
    setJsonFile(componentsInfoPath, componentsInfo);
}

class Module {
    constructor(moduleName, moduleChineseName) {
        this.moduleName = moduleName;
        this.moduleChineseName = moduleChineseName;
        this.moduleSrcDir = resolve('src/components');
        this.moduleStyleSrcDir = resolve('src/styles/components');
        this.moduleTestDir = resolve('tests/unit/spec/components');
        this.moduleTypesDir = resolve('types/components');
        // 在每个文件里面
        // this.moduleSrcIndexEntry = resolve(this.moduleSrcDir, 'index.js');
        this.moduleDocDir = resolve(`doc/views/components/${moduleName}`);
        this.moduleExampleDir = resolve(`examples/views/components/${moduleName}`);

        this.componentNavModule = null;
        this.componentsInfoModule = null;

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 创建文件夹
        mkDir(this.moduleSrcDir);
        mkDir(this.moduleStyleSrcDir);
        mkDir(this.moduleDocDir);
        mkDir(this.moduleTestDir);
        mkDir(this.moduleExampleDir);
        mkDir(this.moduleTypesDir);

        // 设置模块导航数据
        const nav = componentNav.find(item => item.name === 'components');
        this.componentNavModule = nav.modules.find(item => item.name === this.moduleName);
        if (!this.componentNavModule) {
            this.componentNavModule = {
                name: this.moduleName,
                alias: this.moduleChineseName,
                children: []
            };
            nav.modules.push(this.componentNavModule);
        }

        // 设置模块组件列表
        const modules = componentsInfo.modules;
        this.componentsInfoModule = modules.find(item => item.name === this.moduleName);
        if (!this.componentsInfoModule) {
            this.componentsInfoModule = {
                name: this.moduleName,
                components: []
            };
            modules.push(this.componentsInfoModule);
        }

        setNavAndInfo();
    }

    /**
     * 获取组件相关的路径
     * @param {String} componentName 组件名
     */
    getComponentSources(componentName) {
        const componentSrcIndex = resolve(`${this.moduleSrcDir}/${componentName}`);
        const componentStyles = resolve(`${this.moduleStyleSrcDir}/${componentName}`);
        const componentDoc = resolve(this.moduleDocDir, `${componentName}.md`);
        const componentTest = resolve(this.moduleTestDir, `${componentName}.spec.js`);
        const componentExample = resolve(this.moduleExampleDir, `${componentName}.vue`);
        const componentTypes = resolve(`${this.moduleTypesDir}/${componentName}`);

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
                type: 'dir'
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
        const ifComponentInNav = this.componentNavModule.children.find(item => item.name === componentName);
        if (ifComponentInNav) return true;
        const ifComponentInInfo = this.componentsInfoModule.components.find(item => item === componentName);
        if (ifComponentInInfo) return true;

        return false;
    }

    getStyleAndType() {
        // console.log(this.componentsInfoModule,)
        // const modulesComponents = componentsInfo.modules.find(item => (item.name === this.moduleName));
        const modulesComponents = this.componentsInfoModule.components;
        const componentsDir = modulesComponents.map(item => resolve(`src/components/${item}`));
        const typsDir = modulesComponents.map(item => resolve(`types/components/${item}`));
        const stylesDir = modulesComponents.map(item => resolve(`src/styles/components/${item}`));
        const testsDir = modulesComponents.map(item => resolve(`tests/unit/spec/components/${item}`));
        return {
            componentsDir,
            typsDir,
            stylesDir,
            testsDir
        };
    }

    /**
     * 模块删除
     */
    destroy() {
        const contents = this.getStyleAndType();
        exec(`rm -rf ${contents.componentsDir.join(' ')} ${contents.stylesDir.join(' ')} \
        ${contents.stylesDir.join(' ')} ${contents.testsDir.join(' ')} \
        ${this.moduleDocDir} ${this.moduleExampleDir}`);


        // eslint-disable-next-line max-len
        // exec(`rm -rf ${this.moduleSrcDir} ${this.moduleStyleSrcDir} ${this.moduleDocDir} ${this.moduleTestDir} ${this.moduleExampleDir} ${this.moduleTypesDir}`);

        this.componentNavModule = null;
        this.componentsInfoModule = null;

        const nav = componentNav.find(item => item.name === 'components');
        const componentNavModuleIndex = nav.modules.findIndex(item => item.name === this.moduleName);
        nav.modules.splice(componentNavModuleIndex, 1);

        const modules = componentsInfo.modules;
        const componentsInfoModuleIndex = modules.findIndex(item => item.name === this.moduleName);
        modules.splice(componentsInfoModuleIndex, 1);

        setNavAndInfo();
        this.setRootEntry();
    }

    /**
     * 根据components.json设置 根、模块的入口文件
     */
    setEntry() {
        // const components = this.componentsInfoModule.components;
        // const importList = [];
        // const componentList = [];
        // components.forEach((item) => {
        //     importList.push(`import ${title(namespace)}${title(item)} from './${item}/index.vue';`);
        //     componentList.push(`    ${title(namespace)}${title(item)}`);
        // });
        // 模块入口文件
        // render.renderModuleIndexEntry(this.moduleSrcIndexEntry, {
        //     importList: importList.join('\n'),
        //     componentList: componentList.join(',\n')
        // });

        this.setRootEntry();
    }

    /**
     * 根据components.json设置 根入口文件
     */
    setRootEntry() {
        const rootImportList = [];
        const rootComponentList = [];
        const rootImportDeclaresList = [];
        const rootComponentDeclares = [];
        for (const moduleItem of componentsInfo.modules) {
            const { name: moduleName, components } = moduleItem;
            for (const componentName of components) {
                const componentTitleName = title(componentName);
                const nameSpace = title(namespace);
                // todo保持导出名称和声明一致
                // // rootImportList.push(`import ${nameSpace}${componentTitleName} from './components/${moduleName}/${componentName}';`);
                // rootImportList.push(`import ${nameSpace}${componentTitleName} from './components/${componentName}';`);
                // rootComponentList.push(`    ${nameSpace}${componentTitleName}`);
                // // rootImportDeclaresList.push(`import ${componentTitleName} from './components/${moduleName}/${componentName}';`);
                // rootImportDeclaresList.push(`import ${componentTitleName} from './components/${componentName}';`);
                // rootComponentDeclares.push(`    ${componentTitleName}`);
                rootImportList.push(`import ${componentTitleName} from './components/${componentName}';`);
                rootComponentList.push(`    ${componentTitleName}`);
            }
        }

        render.renderModuleIndexEntry(rootIndexPath, {
            importList: rootImportList.join('\n'),
            componentList: rootComponentList.join(',\n')
        });

        render.renderTypesIndexEntry(rootTypeIndexPath, {
            // importList: rootImportDeclaresList.join('\n'),
            // componentList: rootComponentDeclares.join(',\n')
            importList: rootImportList.join('\n'),
            componentList: rootComponentList.join(',\n')
        });
    }

    /**
     * 渲染组件模板
     * @param {String} path 路径 `${this.moduleSrcDir}/${componentName}`
     * @param {Object} data { componentName, componentTitleName, componentChineseName }
     */
    renderComponentSrcDir(path, data) {
        mkDir(path);
        const nameSpace = title(namespace);
        const componentSrcVue = resolve(`${path}/${data.componentName}.vue`);
        const componentSrcImport = resolve(`${path}/index.ts`);
        Object.assign(data, {
            componentTitleName: `${nameSpace}${data.componentTitleName}`,
            moduleName: this.moduleName
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
        mkDir(`${this.moduleStyleSrcDir}/${data.componentName}`);
        const componentStylesImport = resolve(`${this.moduleStyleSrcDir}/${data.componentName}/var.less`);
        render.renderComponentStyle(
            componentStylesImport,
            data
        );
    }
    /**
     * 渲染组件模板
     * @param {String} path 路径 `${this.moduleSrcDir}/${componentName}`
     * @param {Object} data { componentName, componentTitleName, componentChineseName }
     */
    renderComponentTypeDir(data) {
        mkDir(`${this.moduleTypesDir}/${data.componentName}`);
        const componentTypesImport = resolve(`${this.moduleTypesDir}/${data.componentName}/index.d.ts`);
        data.componentName = title(data.componentName);
        render.renderComponentType(
            componentTypesImport,
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
            this.componentNavModule.children.push({
                name: componentName,
                alias: componentChineseName,
                path: `/components/${this.moduleName}/${componentName}`
            });
            this.componentsInfoModule.components.push(componentName);
            setNavAndInfo();
            // 使用文件夹代替文件
            this.renderComponentSrcDir(componentSrcIndex, {
                componentName,
                componentTitleName,
                componentChineseName
            });
            this.renderComponentTypeDir({
                componentName,
                componentTitleName,
                componentChineseName
            });
            render.renderComponentTest(componentTest, {
                moduleName: this.moduleName,
                componentName,
                componentTitleName,
                componentChineseName
            });
            render.renderComponentDoc(componentDoc, {
                moduleName: this.moduleName,
                componentName,
                componentTitleName: `${nameSpace}${componentTitleName}`,
                componentChineseName
            });
            render.renderComponentExample(componentExample, {
                componentName,
                moduleName: this.moduleName
            });

            this.renderComponentStyleDir({
                componentName,
                moduleName: this.moduleName
            });

            // 根入口文件
            this.setEntry();

        } catch (e) {
            console.log(e);
            this.removeComponent(componentName, componentChineseName);
        }

        return true;
    }

    /**
     * 删除组件
     * @param {String} componentName 组件名
     */
    removeComponent(componentName) {
        const isExistComponent = this.isExistComponent(componentName);
        if (!isExistComponent) return false;
        const {
            componentSrcIndex,
            componentDoc,
            componentTest,
            componentExample,
            componentTypes,
            componentStyles
        } = this.getComponentSources(componentName);

        exec(`rm -f ${componentDoc} ${componentTest} ${componentExample}`);
        exec(`rm -rf ${componentSrcIndex} ${componentStyles} ${componentTypes}`);
        const componentInNavIndex = this.componentNavModule.children.findIndex(item => item.name === componentName);
        if (componentInNavIndex > -1) {
            this.componentNavModule.children.splice(componentInNavIndex, 1);
        }
        const componentInInfoIndex = this.componentsInfoModule.components.findIndex(item => item === componentName);
        if (componentInInfoIndex > -1) {
            this.componentsInfoModule.components.splice(componentInInfoIndex, 1);
        }
        setNavAndInfo();
        this.setEntry();
    }
}

module.exports = Module;
