export function title(str) {
    return str.split('-').map(item => item.replace(/^\S/, s => s.toUpperCase())).join('');
}

export default {
    title
};
