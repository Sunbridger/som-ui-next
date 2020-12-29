import mod from '~entry';

if (!mod.install) {
    mod.install = function(Vue) {
        Vue.component(mod.name, mod);
    };
}

export default mod;
export * from '~entry';
