export default {
    methods: {
        scrollbarUpdate(scrollbar) {
            if (!scrollbar) return false;
            scrollbar.$el.scrollTop = 0;
            scrollbar.update();
        }
    }
};
