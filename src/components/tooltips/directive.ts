import { ObjectDirective } from 'vue';

const Directive: ObjectDirective = {
    beforeMount(el, { value }) {
        const onClickOutside = value;
        el.handler = function(e: Event) {
            if (el && !el.contains(e.target)) {
                onClickOutside(e);
            }
        };
        document.addEventListener('touchstart', el.handler, true);
    },
    unmounted: function(el) {
        document.removeEventListener('touchstart', el.handler, true);
        el.handler = null;
    },
};

export default Directive;
