<style lang="less">
.pg-changelog {
    .changelog-item {
        @item-title-height: 23px;
        margin: 32px auto 64px 32px;
        position: relative;
        &:before {
            content: '';
            .absolute(5px, 0, 0, -29px);
            .size(9px);
            border: 2px solid #3eaf7c;
            border-radius: 50%;
        }
        &:after {
            content: '';
            .absolute(18px, 0, -71px, -23px);
            width: 1px;
            background: #eee;
        }
        &:last-child:after {
            display: none;
        }
        .item-title {
            height: @item-title-height;
        }
        .markdown-wrapper {
            margin: 16px 0;
            color: rgba(0,0,0,.65);
            font-size: 14px;
            h1, h2, h3, h4, h5 {
                margin: 0;
            }
            .content,
            textarea {
                min-height: 200px !important;
            }
            p, li, code {
                line-height: 2;
            }
            ol li {
                list-style-type: decimal;
            }
            li {
                list-style-type: disc;
                margin-left: 26px;
                li {
                    list-style-type: circle;
                }
            }
            pre, code {
                background: #f6f8fa;
                color: #777;
            }
            pre {
                padding: 12px;
                border-radius: 3px;
            }
            code {
                padding: 3px;
            }
        }
    }
}
</style>

<template>
    <div class="pg-changelog">
        <h2>更新日志</h2>
        <section class="changelog-item"
            v-for="item in changeLogs"
            :key="item.version">
            <div class="item-title flex flex-align-end">
                <span class="fs20 mr8">{{item.tag}}</span>
                <i class="fs14">by {{item.operator}}</i>
            </div>
            <div v-html="item.changeLogHtml" class="markdown-wrapper"></div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            changeLogs: []
        };
    },
    created() {
        this.$api.robben.getChangeLog({
            groupName: 'test-jwj',
            projectName: 'som-ui-next'
        }).then((res) => {
            this.changeLogs = res;
        });
    }
};
</script>
