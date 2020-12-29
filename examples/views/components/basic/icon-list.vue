<style lang="less">
// .co-header {
//     display: none;
// }
.pg-component-icon-list {
    overflow-y: scroll;
    .text-blod {
        font-weight: 600;
    }
    .icon-item {
        width: 100px;
        height: 105px;
        text-align: center;
        display: inline-block;
        border-radius: 4px;
        position: relative;
        z-index: 1;
        cursor: pointer;
        transition: all .3s ease-in-out;
        .icon-img {
            width: 36px;
            height: 36px;
            img {
                width: 100%;
            }
        }
        &:hover {
            background: #1890ff;
            opacity: .8;
            color: #fff;
            transform: scale(1.2);
        }
        &.icon-activited {
            &::after {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                border-radius: 4px;
                content: "Copied!";
                text-align: center;
                line-height: 110px;
                color: #fff;
                background: rgba(24, 144, 255, .4);
                transition: all .3s cubic-bezier(.18,.89,.32,1.28);
                opacity: 1;
                z-index: 10;
            }
        }
        .action-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            color: #fff;
            font-size: 32px;
            .action-icon-item {
                height: 32px;
                line-height: 32px;
                color: #fff;
                cursor: pointer;
            }
        }
    }
}

</style>
<template>
    <div class="pg-component-icon-list">
        <h2 class="mt20">图标列表</h2>
        <div class="flex flex-align-center flex-justify-start">
            <p class="mt20 mb20 mr20 fs14 text-blod">选择图标主题</p>
            <a-select
                v-model:value="department"
                style="width: 120px"
                ref="select"
                class="ml20"
                @change="departmentChange"
                >
                <a-select-option :value="item.code" v-for="item in departmentList" :key="item.code">
                    {{item.name}}
                </a-select-option>
            </a-select>
        </div>
        <div class="icon-list">
            <div v-for="(itemList, index) in iconList" :key="index">
                <h4 class="fs16 text-blod mt20">{{itemList.iconTypeName}}</h4>
                <div class="icon-item mt20 ml20" :class="{'icon-activited': showAction && index === current}"
                    v-for="(item, index) in itemList.list"
                    :key="index"
                    @click="copy(item, index)"
                    @mouseleave="leave()">
                    <div class="icon-img mt20 mb14 ml32">
                        <img :src="item.url" alt="">
                    </div>
                    <div class="icon-name ellipsis">{{item.name.split('.')[0]}}</div>
                    <div class="action-icon" v-if="showAction && index === current">
                    </div>
                </div>
            </div>
        </div>
        <div class="mt40">
            <h3>SomIcon参数说明</h3>
            <a-table :columns="columns" :data-source="data" :pagination="false" :bordered="false"></a-table>
        </div>
    </div>
</template>
<script>
import httpRequest from '@souche-f2e/http-request';
import { message } from 'ant-design-vue';

// const baseUrl = {
//     development: 'http://gcudgel.dev.dasouche-inc.net',
//     prepub: 'http://gcudgel.prepub.souche-inc.com',
//     production: 'https://gcudgel.souche-inc.com'
// }[process.env.NODE_ENV];
const baseUrl = 'https://gcudgel.prepub.souche-inc.com';

export default {
    data() {
        return {
            department: 'base',
            iconList: [],
            showAction: false,
            current: null,
            departmentList: [],
            iconTypeList: [],
            iconTypeEum: {},
            columns: [
                {
                    title: '参数',
                    dataIndex: 'params',
                    key: 'params'
                },
                {
                    title: '说明',
                    dataIndex: 'desc',
                    key: 'desc'
                },
                {
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type'
                },
                {
                    title: '可选值',
                    dataIndex: 'range',
                    key: 'range'
                },
                {
                    title: '默认值',
                    dataIndex: 'default',
                    key: 'default'
                }
            ],
            data: [
                {
                    key: '1',
                    params: 'department',
                    desc: '平台类型',
                    type: 'string',
                    range: 'base/...(参考页面顶部平台类型)',
                    default: 'base'
                },
                {
                    key: '2',
                    params: 'type',
                    desc: 'icon名称',
                    type: 'string',
                    range: '--',
                    default: '--'
                },
                {
                    key: '3',
                    params: 'color',
                    desc: 'icon颜色',
                    type: 'string',
                    range: '--',
                    default: '--'
                },
                {
                    key: '4',
                    params: 'size',
                    desc: 'icon大小',
                    type: 'number/string',
                    range: '--',
                    default: '24'
                }
            ]
        };
    },
    mounted() {
        this.getDepartment();
        this.getIconType();
        this.getIconList();

    },
    methods: {
        getDepartment() {
            httpRequest.get(`${baseUrl}/api/somicon/departments.json`).then((res) => {
                this.departmentList = res;
            });
        },
        getIconType() {
            httpRequest.get(`${baseUrl}/api/somicon/types/${this.department}.json`).then((res) => {
                this.iconTypeList = res;
                for (let i = 0; i < res.length; i += 1) {
                    this.iconTypeEum[res[i].code] = res[i].name;
                }
            });
        },
        getIconList(iconName = '') {
            this.iconList = [];
            httpRequest.get(`${baseUrl}/api/somicon/${this.department}.json?name=${iconName}`)
                .then((res) => {
                    // eslint-disable-next-line guard-for-in
                    for (const key in res) {
                        this.iconList.push({
                            iconType: key,
                            iconTypeName: this.iconTypeEum[key],
                            list: res[key]
                        });
                    }
                });
        },
        changeIconStyle() {
            // 切换icon风格时切换iconlist
            this.getIconList();
        },
        departmentChange() {
            // 切换平台时切换iconlist
            this.getIconType();
        },

        /**
            * 复制文案
         */
        copyToClipboard (text) {
            const input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('value', text);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                document.body.removeChild(input);
                return Promise.resolve();
            } else {
                document.body.removeChild(input);
                return Promise.reject();
            }
        },
        copy(item, index) {
            this.current = index;
            this.showAction = true;
            const iconName = item.name.split('.')[0];
            const copyText = `<som-icon department="${this.department}" type="${iconName}"></som-icon>`;
            this.copyToClipboard(copyText);
            message.success(copyText);
        },
        leave() {
            // todo
            this.current = null;
            this.showAction = false;
        }
    }
};
</script>

