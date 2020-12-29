import { createRouter, createWebHashHistory } from 'vue-router';

import Index from 'examples/views/index';
import ComponentIndex from 'examples/views/components/index';

import componentNav from 'doc/map/component-nav.json';

const componentsInfo = componentNav.find(item => item.name === 'components');
const packagesInfo = componentNav.find(item => item.name === 'packages');
const modules = componentsInfo.modules;
const packagesModules = packagesInfo.modules;
const components = [].concat(...modules.map(item => item.children));

const componentRoutes = components.map(component => ({
    path: component.name,
    name: component.name,
    meta: {
        name: component.alias
    },
    component: () => import(`examples/views${component.path}.vue`)
}));

const packageRoutes = packagesModules.map(component => ({
    path: `${component.name}`,
    name: component.name,
    component: () => import(`examples/views${component.path}.vue`)
}));

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        children: [
            {
                path: 'components',
                component: ComponentIndex,
                children: componentRoutes
            },
            {
                path: 'packages',
                component: ComponentIndex,
                children: packageRoutes
            },
            {
                path: 'icon-list',
                name: 'icon-list',
                component: () => import('examples/views/components/basic/icon-list.vue')
            }
        ]
    },
    {
        path: '/*',
        redirect: '/'
    }
];


export const routerMode = createWebHashHistory();

const router = createRouter({
    history: routerMode,
    routes
});

export default router;
