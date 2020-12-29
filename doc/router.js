import { createRouter, createWebHashHistory } from 'vue-router';

import map from 'doc/map';

const templates = {
    side: () => import('views/templates/side'),
    main: () => import('views/templates/main')
};

const generateRoutes = (navConfig) => {
    const {
        pageName,
        path,
        template,
        nav,
        redirect
    } = navConfig;

    // 没有指定模板
    const targetTpl = templates[template];
    if (!template || !targetTpl) return false;

    const parentRoute = {
        path: `/${pageName}`,
        component: targetTpl,
        children: []
    };

    if (redirect) {
        parentRoute.redirect = redirect;
    }

    const getRoutersFormNav = (navData) => {
        const isArray = val => Object.prototype.toString.call(val) === '[object Array]';
        const dataNav = isArray(navData) ? navData : [navData];
        let routers = [];
        dataNav.forEach((navItem) => {
            // 有扩展路由页面
            if (navItem.extendsRouter) {
                routers = routers.concat(getRoutersFormNav(navItem.extendsRouter));
            }
            let { children } = navItem;
            const { modules, name: navItemName } = navItem;
            if (navItemName === 'packages') {
                children = modules ?
                    [].concat(modules) : children;
            } else {
                children = modules ?
                    [].concat(...modules.map(group => group.children || group.children)) :
                    children;
            }

            if (!children) return false;

            children.forEach((item) => {
                const { path: itemPath, name: itemName } = item;
                if (!itemPath) return false;
                routers.push({
                    path: itemName,
                    name: `${navItemName}-${itemName}`,
                    component: () => import(`doc/views${itemPath}.md`).catch(() => import(`doc/views${itemPath}.vue`))
                });
            });
        });
        return routers;
    };

    // 没有子路由
    if (!nav) {
        parentRoute.children.push({
            path: '',
            name: pageName,
            component: () => import(`doc/views${path}.md`).catch(() => import(`doc/views${path}.vue`))
        });
        return parentRoute;
    } else {
        parentRoute.children = parentRoute.children.concat(getRoutersFormNav(nav));
    }

    return parentRoute;
};

const routes = map.map(generateRoutes).filter(route => route.path);
routes.push({
    path: '/',
    redirect: '/components/install'
});

export const routerHistory = createWebHashHistory();

const router = createRouter({
    history: routerHistory,
    routes
});

export default router;
