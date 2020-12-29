/**
 * @description 帮助step拿到具体渲染的icon
 * @parmas
 * @return
 */
import { ComponentInternalInstance, createVNode, Slots, VNode } from 'vue';
import { isNumber } from '@souche-vue3/souche-util-vue';
import { IStepProps, IStepsProps, StatusType } from 'types/components/steps';
import { SomIcon } from '../icon';

// TODO unused
// 获取icon插槽
export const getIconSlot = (
    currentStatus: StatusType,
    instance: ComponentInternalInstance | null | undefined,
    parantInstance: ComponentInternalInstance | null | undefined,
    circleStyle = {
        borderColor: '#F01D24',
        color: '#F01D24',
    },
): VNode[] | VNode | undefined => {
    const props: IStepProps = instance?.props || {};
    const slots: Slots = instance?.slots || {};
    const parentProps: IStepsProps = parantInstance?.props || {};
    const parentSlots: Slots = parantInstance?.slots || {};

    const iconName =
        {
            wait: 'inActiveIcon',
            active: 'activeIcon',
            done: 'doneIcon',
        }[currentStatus] || 'inActiveIcon';

    if (slots[iconName]) {
        // 使用子step插槽
        return slots[iconName]?.();
    } else if (props[iconName]) {
        // 使用子step props
        return createVNode(SomIcon, {
            name: props[iconName],
            style: circleStyle,
        });
    } else if (parentSlots?.[iconName]) {
        // 使用父step插槽
        return parentSlots[iconName]?.();
    } else if (parentProps?.[iconName]?.value) {
        // 使用父step props
        return createVNode(SomIcon, {
            name: parentProps[iconName],
            style: circleStyle,
        });
    } else if (currentStatus === 'done') {
        return createVNode(
            'svg',
            {
                viewBox: '0 0 1024 1024',
                width: '64',
                height: '64',
                class: 'done',
            },
            [
                createVNode('path', {
                    fill: 'currentColor',
                    d: 'M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m236.32 294.144L408.896 633.536 259.84 484.544 192 552.416l216.896 216.928 407.296-407.296-67.872-67.904z',
                }),
            ],
        );
        // return (
        //     <svg viewBox="0 0 1024 1024" version="1.1" p-id="2844" width="64" height="64">
        //         <path fill="currentColor" d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m236.32 294.144L408.896 633.536 259.84 484.544 192 552.416l216.896 216.928 407.296-407.296-67.872-67.904z" p-id="2845"></path>
        //     </svg>
        // );
    } else if (currentStatus === 'active') {
        return createVNode(
            'svg',
            {
                viewBox: '0 0 40 40',
                width: '40px',
                height: '40px',
                class: 'active',
            },
            [
                createVNode('circle', {
                    'stroke-width': '8',
                    'cx': '20',
                    'cy': '20',
                    'r': '16',
                    'stroke': 'currentColor',
                    'fill': 'transparent',
                }),
            ],
        );

        // return (
        //     <svg width="40px" height="40px" viewBox="0 0 40 40">
        //         <circle id="Oval-Copy" stroke-width="8" cx="20" cy="20" r="16" stroke="currentColor" fill="transparent"></circle>
        //     </svg>
        // );
    } else {
        return createVNode(
            'svg',
            {
                viewBox: '0 0 40 40',
                width: '40px',
                height: '40px',
                class: 'wait',
            },
            [
                createVNode('circle', {
                    'stroke-width': '8',
                    'cx': '20',
                    'cy': '20',
                    'r': '12',
                    'stroke': 'transparent',
                    'fill': 'currentColor',
                }),
            ],
        );
        // return (
        //     <svg width= "40px" height = "40px" viewBox = "0 0 40 40" >
        //         <circle id="Oval-Copy" stroke-width="8" cx = "20" cy = "20" r = "12" fill = "currentColor" stroke = "transparent" > </circle>
        //             < /svg>
        // );
    }
};

/**
 * @description 获取步骤条状态
 * @param status
 * @param index
 * @param currentActive
 */

export const stepStatus = (status?: StatusType, index?: number, currentActive?: number) => {
    const stausByIndex = () => {
        if (isNumber(index) && isNumber(currentActive)) {
            if (currentActive < index) {
                return 'wait';
            } else if (currentActive === index) {
                return 'active';
            } else {
                return 'done';
            }
        } else {
            return 'wait';
        }
    };
    if (status) {
        // 自己的 status 优先
        return status;
    } else {
        // 使用父节点的index进行判断
        return stausByIndex();
    }
};
