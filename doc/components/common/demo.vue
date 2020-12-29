<template>
    <div class="docs-demo" :class="{'docs-demo--expand': isExpand}">
        <!-- <div class="docs-demo__code">
            <slot name="source"></slot>
        </div> -->
        <div class="docs-demo__meta">
            <div class="docs-demo__meta__title">
                <slot name="title"></slot>
            </div>
            <slot name="desc"></slot>
            <span class="docs-trans docs-demo__triangle" @click="toggle">
                <i class="incon"></i>
            </span>
        </div>
        <div class="highlight-wrapper">
            <slot name="source"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isExpand: false
        };
    },
    methods: {
        toggle() {
            this.isExpand = !this.isExpand;
            if (!this.isExpand) {
                let parent = this.$parent;
                while (parent) {
                    if (parent.update) {
                        this.$nextTick(parent.update);
                        break;
                    }
                    parent = parent.$parent;
                }
            }
        }
    }
};
</script>

<style lang="less">
.incon {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 4px solid #000;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: 4px solid transparent;
}
.docs-demo {
    width: 100%;
    min-height: 60px;
    border: 1px solid #eee;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    margin: 20px 0;
}

.docs-demo__code,
.highlight-wrapper,
.docs-demo__meta {
    padding: 20px;
}

.docs-demo__code {
    border-bottom: 1px solid #eee;
}

.docs-demo__meta {
    position: relative;
    font-size: 12px;
    color: #777;

    > div:nth-child(2) {
        line-height: 2;
    }
}

.docs-demo__meta__title {
    position: absolute;
    top: -10px;
    background: #fff;
    color: rgba(0, 0, 0, 0.65);
    padding: 0 6px;
    margin-left: -6px;
    font-weight: 500;
    font-size: 13px;
}

.docs-demo.docs-demo--expand .docs-demo__meta {
    border-bottom: 1px dashed #e9e9e9;
}

.docs-demo__triangle {
    border: 1px solid #999;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    position: absolute;
    right: 14px;
    bottom: 18px;

    i {
        triangle: 4px bottom #999;
    }
}

.docs-demo.docs-demo--expand .docs-demo__triangle {
    transform: rotate(180deg);
}

.highlight-wrapper {
    display: none;
    p,
    pre {
        margin: 0;
    }
    code {
        padding: 0;
    }
}

.docs-demo.docs-demo--expand .highlight-wrapper {
    display: block;
}
</style>
